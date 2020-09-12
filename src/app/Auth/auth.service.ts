import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/CreateUserDto';
import { SigninUserDto } from './dto/SigninUserDto';
import { UserNotFound } from '../../core/exceptions/UserNotFound';
import { HttpException } from '../../core/exceptions/HttpException';
import { Unauthenticated } from '../../core/exceptions/UnAuthenticated';
import { verify } from 'jsonwebtoken';
export class AuthService {

    public async signup(createUserDto: CreateUserDto) {
        const found = await User.findOne({ email: createUserDto.email });
        if (found) {
            throw new HttpException({ message: "User already exists", status: 400, type: "UserExists" })
        }
        const user = new User();
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.password = await hash(createUserDto.password, 10)

        try {
            await user.save()
        } catch (e) {
            throw e
        }
    }
    public async signin(signinUserDto: SigninUserDto) {
        const user = await User.findOne({ email: signinUserDto.email })

        if (!user) {
            throw new UserNotFound(signinUserDto.email)
        }

        if (!this.validatePassword(signinUserDto.password, user.password)) {
            throw new UserNotFound(signinUserDto.email)
        }

        const accessToken = this.generateAccessToken(user.id, user.email);
        const refreshToken = this.generateRefreshToken(user.id, user.tokenVersion);

        return { accessToken, refreshToken }
    }

    public async getNewAccessToken(token: string) {
        if (!token) {
            throw new Unauthenticated()
        }
        const payload: any = verify(token, process.env.REFRESH_TOKEN_SECRET!);

        const user = await User.findOne(payload.UserId)

        if (!user) {
            throw new UserNotFound()
        }

        if (!user.tokenVersion === payload.tokenVersion) {
            throw new Unauthenticated()
        }


        const acccessToken = this.generateAccessToken(user.id, user.email);

        return acccessToken
    }

    public async validatePassword(password: string, hashedPassword: string) {
        const result = await compare(password, hashedPassword)
        return result;
    }

    public generateAccessToken(userId: number, email: string) {
        return sign({ userId, email }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '5m' })
    }

    public generateRefreshToken(userId: number, tokenVersion: number) {
        return sign({ userId, tokenVersion }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '10d' })
    }
}

export default () => new AuthService()
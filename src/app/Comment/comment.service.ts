import { Comment } from "./comment.entity";
import { CreateCommentDto } from "./dto/CreateCommentDto";
import { HttpException } from "../../core/exceptions/HttpException";

export class CommentService {
    public async create(createCommentDto: CreateCommentDto) {
        const comment = new Comment();
        comment.name = createCommentDto.name;
        comment.email = createCommentDto.email;
        comment.text = createCommentDto.text;
        comment.postId = createCommentDto.postId;

        try {
            return await comment.save();
        } catch (e) {
            throw new HttpException({ message: 'Something Went Wrong', status: 500, data: e })
        }
    }
}

export default () => new CommentService()
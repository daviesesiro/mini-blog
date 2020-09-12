import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
// import { User } from "./User";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string

    @Column('blob')
    image: string;

    @Column()
    bio: string;

    @Column()
    password: string;

    @Column({ default: 0 })
    tokenVersion: number;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;
}

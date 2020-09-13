import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Post } from "../Post/post.entity";

@Entity('comments')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Post, post => post.comments)
    post: Post;

    @Column()
    postId: number

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    text: string

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date
}

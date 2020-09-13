import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Comment } from "../Comment/comment.entity";
import { User } from "../Auth/user.entity";

@Entity("posts")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('blob')
  image?: string;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.posts)
  user: User

  @Column()
  userId: number

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[]

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}

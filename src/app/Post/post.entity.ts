import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
// import { User } from "./User";

@Entity("posts")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  content: string;

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

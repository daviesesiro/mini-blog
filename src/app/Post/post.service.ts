import { Post } from "./post.entity";
import { CreatePostDto } from "./dtos/CreatePostDto";
import { NotFoundException } from "../../core/exceptions/NotFoundException";
import { PaginateDto } from "./dtos/paginateDto";
export class PostService {
  /**
   * Get all the posts
   */
  public async getPosts(paginateDto: PaginateDto) {
    let { take, skip } = paginateDto;
    take = take ? take : 10;
    const [posts, totalCount] = await Post.findAndCount({ take, skip });
    return this.createPaginationData(totalCount, take, skip, posts);
  }

  public async getPostById(id: number) {
    const post = await Post.findOne(id);

    if (!post) {
      throw new NotFoundException(id, 'post')
    }

    return post;
  }

  public async createPost(createPostDto: CreatePostDto) {
    const post = new Post();
    post.title = createPostDto.title;
    post.content = createPostDto.content;

    return await post.save();
  }

  public async deletePost(id: number): Promise<void> {
    const result = await Post.delete(id);
    if (!result.affected) {
      throw new NotFoundException(id, "post");
    }
  }

  private createPaginationData = (totalCount: number, take: number, skip: number = 0, posts: Post[]) => {
    return {
      totalCount,
      take,
      skip,
      posts
    }
  }
}

export default () => new PostService();

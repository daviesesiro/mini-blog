import { Post } from "./post.entity";
import { CreatePostDto } from "./dtos/CreatePostDto";
export class PostService {
  /**
   * Get all the posts
   */
  public async getPost() {
    const posts = await Post.find();
    return posts;
  }

  public async createPost(createPostDto: CreatePostDto) {
    const post = new Post();
    post.title = createPostDto.title;
    post.content = createPostDto.content;

    return await post.save();
  }
}

export default () => new PostService();

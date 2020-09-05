import { Controller } from "../../core/controller";
import { Router, RequestHandler } from "express";
import { PostService } from "./post.service";
import Respond from "../../services/Respond";
import { HttpException } from "../../exceptions/HttpException";
import { createPostValidator } from "./post.validators";
import { validationResult } from "express-validator";
import { CreatePostDto } from "./dtos/CreatePostDto";

export class PostController extends Controller {
  path = "/posts";
  router = Router();

  constructor(private postService: PostService) {
    super();
    this.initialiseRoutes();
  }

  initialiseRoutes(): void {
    this.router.get("/", this.getPosts);
    this.router.post("/", createPostValidator, this.createPost);
  }

  private getPosts: RequestHandler = async (_req, res, next) => {
    try {
      const posts = await this.postService.getPost();
      Respond(res).Success(200, "success", posts);
    } catch (e) {
      return next(
        new HttpException({
          status: 500,
          message: "message",
          data: e,
          type: "ServerError",
        })
      );
    }
  };

  private createPost: RequestHandler = async (req, res, next) => {
    const createPostDto: CreatePostDto = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(
        new HttpException({
          status: 400,
          message: "Post couldnt be created",
          data: result.array(),
          type: "BadRequest",
        })
      );
    }
    const post = await this.postService.createPost(createPostDto);
    Respond(res).Success(202, "Post created", post);
  };
}

export default (postService: PostService) => new PostController(postService);

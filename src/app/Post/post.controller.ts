import { Controller } from "../../core/controller";
import { Router, RequestHandler } from "express";
import { PostService } from "./post.service";
import Respond from "../../services/Respond";

import {
  checkCreatePost,
  checkDeletePost,
} from "./post.validators";

import { upload } from "./uploadimage";
import validateChecks from "../../services/checkvalidator";

export class PostController extends Controller {
  path = "/posts";
  router = Router();

  constructor(private postService: PostService) {
    super();
    this.initialiseRoutes();
  }

  initialiseRoutes(): void {
    this.router.get("/", this.getPosts);
    this.router.get("/:id", this.getPostById);
    this.router.get('/:id/image', this.getPostImage)
    this.router.post("/", upload.single('image'), checkCreatePost, this.createPost);
    this.router.delete("/:id", checkDeletePost, this.deletePost);
  }

  private getPosts: RequestHandler = async (req, res, next) => {
    try {
      const posts = await this.postService.getPosts(req.query);

      Respond(res).Success(200, "success", posts);

    } catch (e) {
      return next(e);
    }
  };

  private getPostById: RequestHandler = async (req, res, next) => {
    try {
      const id: number = parseInt(req.params.id)
      const post = await this.postService.getPostById(id)

      Respond(res).Success(202, 'Found Post', post)
    } catch (e) {
      next(e)
    }
  }

  private getPostImage: RequestHandler = async (req, res, next) => {
    try {
      const image = await this.postService.getPostImage(parseInt(req.params.id))
      res.set('Content-Type', 'image/jpg')
      res.send(image);
    } catch (e) {
      next(e)
    }
  }

  private createPost: RequestHandler = async (req, res, next) => {
    try {
      validateChecks(req, 'post');
      const post = await this.postService.createPost(req.body, req.file);
      Respond(res).Success(202, "Post created", post);

    } catch (e) {
      next(e);
    }
  };

  private deletePost: RequestHandler = async (req, res, next) => {
    try {
      validateChecks(req, 'post');
      const { id } = req.params;

      await this.postService.deletePost(parseInt(id));
      Respond(res).Success(201, "Deleted");
    } catch (e) {
      next(e);
    }
  };
}

export default (postService: PostService) => new PostController(postService);

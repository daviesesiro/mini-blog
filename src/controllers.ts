import { Controller } from "./core/controller";
import PostController from "./app/Post/post.controller";
import PostService from "./app/Post/post.service";

export default [PostController(PostService())] as Controller[];

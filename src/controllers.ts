import PostController from "./app/Post/post.controller";
import PostService from "./app/Post/post.service";
import AuthController from "./app/Auth/auth.controller";
import AuthService from "./app/Auth/auth.service";
import CommentController from "./app/Comment/comment.controller";
import CommentService from "./app/Comment/comment.service";

export default [
    PostController(PostService()),
    AuthController(AuthService()),
    CommentController(CommentService())
];

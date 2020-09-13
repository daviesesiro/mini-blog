import { Router, RequestHandler } from "express";
import { Controller } from "../../core/controller";
import { CommentService } from './comment.service';
import Respond from "../../services/Respond";
import { checkCreateComment } from "./comment.checks";
import validateChecks from "../../services/validateChecks";

export class CommentController implements Controller {
    path = "/comments";
    router = Router();

    constructor(private commentService: CommentService) {
        this.initialiseRoutes();
    }

    initialiseRoutes(): void {
        this.router.post("/", checkCreateComment, this.createComment);
    }

    private createComment: RequestHandler = async (req, res, next) => {
        try {
            validateChecks(req, 'comment')
            const comment = await this.commentService.create(req.body);

            Respond(res).Success(200, 'Created Comment', comment)
        } catch (e) {
            next(e)
        }
    }
}

export default (commentService: CommentService) => new CommentController(commentService);

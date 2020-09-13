import { check } from "express-validator";

export const checkCreateComment = [
    check("name")
        .not()
        .isEmpty({ ignore_whitespace: true }),
    check("email").not().isEmpty().isEmail(),
    check('text').not().isEmpty().isLength({ min: 6 }).withMessage('6 chars minimum'),
    check('postId').not().isEmpty().isNumeric(),
];


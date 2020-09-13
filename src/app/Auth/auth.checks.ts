import { check } from "express-validator";

export const checkSignup = [
    check("name")
        .not()
        .isEmpty({ ignore_whitespace: true }),
    check("email").not().isEmpty().isEmail(),
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('6 chars minimum'),
];
export const checkSignin = [
    check("email").not().isEmpty().isEmail(),
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('6 chars minimum'),
];


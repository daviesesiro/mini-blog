import { check } from "express-validator";

export const createPostValidator = [
  check("title", "Post add a valid title")
    .not()
    .isEmpty({ ignore_whitespace: true }),
  check("content", "Please add content").notEmpty(),
];

import { check } from "express-validator";

export const checkCreatePost = [
  check("title", "Post add a valid title")
    .not()
    .isEmpty({ ignore_whitespace: true }),
  check("content", "Please add content").notEmpty()
];

export const checkDeletePost = [
  check("id", "Post id must be valid")
    .not()
    .isEmpty({ ignore_whitespace: true })
];

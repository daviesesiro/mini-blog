import { PostService } from "../../src/app/Post/post.service";
import { ExpressApp } from "../../src/server";
import { expect } from "chai";
import { Post } from "../../src/app/Post/post.entity";

describe("Test the find posts", () => {
  let postService: PostService;
  before(async () => {
    postService = new PostService();
    const server = new ExpressApp([]);
    await server.inititializeDatabase();
  });

  it("Should return aleast an array", async () => {
    const posts = await postService.getPost();
    expect(posts).length.to.be.least(1);
  });

  let createdPostMock = { content: "hello", title: "hello" };
  it("Should return a post after creating", async () => {
    const post = await postService.createPost({
      content: "hello",
      title: "hello",
    });
    expect(post).an.instanceof(Post);
    expect({
      content: post.content,
      title: post.title,
    }).to.eq(createdPostMock);
  });
});

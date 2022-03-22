import { Post } from "@prisma/client";

export abstract class PostState {}

export class PostError extends PostState {
  error: string;
  constructor(error: string) {
    super();
    this.error = error;
  }
}

export class PostSuccessfull extends PostState {
  post: Post;
  posts: Array<Post> | undefined | null;
  constructor(post: Post, posts: Array<Post> | undefined | null) {
    super();
    this.post = post;
    this.posts = posts;
  }
}

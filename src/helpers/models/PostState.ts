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
  post: Post | Array<Post>;
  constructor(post: Post | Array<Post>) {
    super();
    this.post = post;
  }
}

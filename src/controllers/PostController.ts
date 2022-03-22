import { post } from "../../prisma/prisma";
import {
  PostError,
  PostState,
  PostSuccessfull,
} from "../helpers/models/PostState";

export default class PostController {
  static async fetchPosts(userid: number): Promise<PostState> {
    if (!userid) return new PostError("falta 'userid' estupido");
    const posts = await post.findMany({ where: { authorId: userid } });
    return new PostSuccessfull(posts[0], posts);
  }
  static async createPost({
    userid,
    content,
  }: {
    userid: number;
    content: { title: string; content: string };
  }): Promise<PostState> {
    if (!userid) return new PostError("userid falta estúpido");
    if (!content) return new PostError("falta 'content' anormal");
    const newPost = await post.create({
      data: {
        title: content.title,
        content: content.title,
        authorId: userid,
      },
    });
    return new PostSuccessfull(newPost, undefined);
  }
  static async deletePost(postid: number): Promise<PostState> {
    if (!postid) return new PostError("falta el campo 'postid' anormal");
    const deletedPost = await post.delete({
      where: {
        id: postid,
      },
    });
    return new PostSuccessfull(deletedPost, undefined);
  }
  static async updatePost(
    postid: number,
    content: { title: string | null; content: string | null }
  ): Promise<PostState> {
    if (!postid) return new PostError("anormal te falta el campo 'postid'");
    if (!content.title || !content.content)
      return new PostError(
        "anormal o actualizas título o contenido, pero no lo mandes vacío puto"
      );
    if (!content.content) {
      const ActualizedPost = await post.update({
        where: { id: postid },
        data: { title: content.title },
      });
      return new PostSuccessfull(ActualizedPost, undefined);
    }
    if (!content.title) {
      const ActualizedPost = await post.update({
        where: { id: postid },
        data: { content: content.content },
      });
      return new PostSuccessfull(ActualizedPost, undefined);
    }
    const ActualizedPost = await post.update({
      where: { id: postid },
      data: { title: content.title, content: content.content },
    });
    return new PostSuccessfull(ActualizedPost, undefined);
  }
}

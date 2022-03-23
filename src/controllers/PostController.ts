import { post } from "../../prisma/prisma";
import {
  PostError,
  PostState,
  PostSuccessfull,
} from "../helpers/models/PostState";

export default class PostController {
  static async getPost(postid: number): Promise<PostState> {
    if (!postid) return new PostError("falta 'postid' anormal");
    const a = await post.findUnique({ where: { id: postid } });
    if (!a) return new PostError("esta publicacion ya no existe");
    return new PostSuccessfull(a);
  }
  static async fetchPosts(userid: number): Promise<PostState> {
    if (!userid) return new PostError("falta 'userid' estupido");
    const posts = await post.findMany({
      where: { authorId: userid },
      include: {
        reactions: true,
        author: true,
      },
    });
    return new PostSuccessfull(posts);
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
    return new PostSuccessfull(newPost);
  }
  static async deletePost(postid: number): Promise<PostState> {
    if (!postid) return new PostError("falta el campo 'postid' anormal");
    const deletedPost = await post.delete({
      where: {
        id: postid,
      },
    });
    return new PostSuccessfull(deletedPost);
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
      return new PostSuccessfull(ActualizedPost);
    }
    if (!content.title) {
      const ActualizedPost = await post.update({
        where: { id: postid },
        data: { content: content.content },
      });
      return new PostSuccessfull(ActualizedPost);
    }
    const ActualizedPost = await post.update({
      where: { id: postid },
      data: { title: content.title, content: content.content },
    });
    return new PostSuccessfull(ActualizedPost);
  }
}

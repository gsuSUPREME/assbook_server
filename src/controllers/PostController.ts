import {post} from '../helpers/prisma';
import {
  PostError,
  PostState,
  PostSuccessfull,
} from '../helpers/models/PostState';

// eslint-disable-next-line no-unused-vars
interface IContent {
  title: string,
  content: string
}


/**
 * Controlador de publicaciones
 */
export default class PostController {
  /**
   * Obtener publicación
   * @param {number} postid - Id del post
   * @return {PostState}
   */
  static async getPost(postid: number): Promise<PostState> {
    if (!postid) return new PostError('falta \'postid\' anormal');
    const a = await post.findUnique({where: {id: postid}});
    if (!a) return new PostError('esta publicacion ya no existe');
    return new PostSuccessfull(a);
  }
  /**
   * Obtener Publicaciones
   * @param {number} userid - Id del usuario
   * @return {postState}
   */
  static async fetchPosts(userid: number): Promise<PostState> {
    if (!userid) return new PostError('falta \'userid\' estupido');
    const posts = await post.findMany({
      where: {authorId: userid},
      include: {
        reactions: true,
        author: true,
      },
    });
    return new PostSuccessfull(posts);
  }
  /**
   * Crea una nueva publicación
   * @param {{
   * number, IContent
   * }} {userid, content} - Id del usuario y contenido del post
   * @return {PostState}
   */
  static async createPost({
    userid,
    content,
  }: {
    userid: number;
    content: IContent;
  }): Promise<PostState> {
    if (!userid) return new PostError('userid falta estúpido');
    if (!content) return new PostError('falta \'content\' anormal');
    const newPost = await post.create({
      data: {
        title: content.title,
        content: content.title,
        authorId: userid,
      },
    });
    return new PostSuccessfull(newPost);
  }
  /**
   * Borra una publicación
   * @param {number} postid - Id de la publicación
   * @param {number} userid - Id del usuario
   * @return {PostState}
   */
  static async deletePost(postid: number, userid: number): Promise<PostState> {
    if (!postid) return new PostError('falta el campo \'postid\' anormal');
    if (!userid) return new PostError('falta el campo \'userid\' anormal');
    const postToDelete = await post.findUnique({
      where: {
        id: postid,
      },
    });
    if (!postToDelete) return new PostError('Este post no existe');
    if (postToDelete.authorId != userid) {
      return new PostError('Este post no te pertenece idiota');
    }
    const deletedPost = await post.delete({
      where: {
        id: postid,
      },
    });
    return new PostSuccessfull(deletedPost);
  }

  /**
   * Actualizar publicación
   * @param {number} postid - Id del post
   * @param {number} userid - Id del usuario
   * @param {Object} content - Contenido del post
   * @return {PostState}
   */
  static async updatePost(
      postid: number,
      userid: number,
      content: { title: string | null; content: string | null },
  ): Promise<PostState> {
    if (!userid) return new PostError('anormal te falta el campo \'userid\'');
    if (!postid) return new PostError('anormal te falta el campo \'postid\'');
    if (!content.title || !content.content) {
      return new PostError(
          'anormal o actualizas título o contenido, ' +
          'pero no lo mandes vacío puto',
      );
    }
    const postToUpdate = await post.findUnique({
      where: {
        id: postid,
      },
    });
    if (!postToUpdate) return new PostError('Este post no existe');
    if (postToUpdate?.authorId === userid) {
      return new PostError('Este post no te pertenece');
    };
    if (!content.content) {
      const ActualizedPost = await post.update({
        where: {id: postid},
        data: {title: content.title},
      });
      return new PostSuccessfull(ActualizedPost);
    }
    if (!content.title) {
      const ActualizedPost = await post.update({
        where: {id: postid},
        data: {content: content.content},
      });
      return new PostSuccessfull(ActualizedPost);
    }
    const ActualizedPost = await post.update({
      where: {id: postid},
      data: {title: content.title, content: content.content},
    });
    return new PostSuccessfull(ActualizedPost);
  }
}

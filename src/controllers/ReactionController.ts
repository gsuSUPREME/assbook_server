import {post, reaction} from '../helpers/prisma';
import {
  ReactionError,
  ReactionState,
  ReactionSuccessfull,
} from '../helpers/models/ReactionState';

type ReactionType = 'heart' | 'like' | 'hahaha' | 'xd' | 'sad';
/**
 * Controlador para operaciones con reaciones
 */
export default class ReactionController {
  /**
   * Añade una nueva reacción
   * @param {number} userid - Id del usuario
   * @param {number} postid - Id del post
   * @param {ReactionType} ReactionType - Tipo de reacción
   * @return {ReactionState}
   */
  static async addReaction(
      userid: number,
      postid: number,
      ReactionType: ReactionType,
  ): Promise<ReactionState> {
    if (!postid) return new ReactionError('anormal te falta \'postid\'');
    const a = await post.findUnique({where: {id: postid}});
    if (!a) return new ReactionError('Esta publicacion no existe');
    if (a?.authorId === userid) {
      return new ReactionError(
          'eres retrasado o que? no reacciones a tus publicaciones gf',
      );
    }
    if (!userid) return new ReactionError('anormal te falta \'userid\'');
    if (!ReactionType) {
      return new ReactionError('anormal te falta \'reactionType\'');
    }
    const newReaction = await reaction.create({
      data: {
        postid: postid,
        userid: userid,
        type: ReactionType,
      },
    });
    return new ReactionSuccessfull(newReaction);
  }
  /**
   * Elimina una reacción
   * @param {number} reactionid - Id de la reacción
   * @param {number} userid - Id del usuario
   * @return {ReactionState}
   */
  static async removeReaction(
      reactionid: number,
      userid: number,
  ): Promise<ReactionState> {
    if (!reactionid) return new ReactionError('falta \'reactionid\' gafo');
    if (!userid) return new ReactionError('falta \'userid\' gafo');
    const a = await reaction.findUnique({where: {id: reactionid}});
    const b = await post.findUnique({where: {id: a?.postid}});
    if (!b) return new ReactionError('esta publicacion no existe gf');
    if (a?.userid !== userid || a?.userid !== b?.authorId) {
      return new ReactionError('que crees que haces? pendejo');
    }
    const deletedReaction = await reaction.delete({
      where: {id: reactionid},
    });
    return new ReactionSuccessfull(deletedReaction);
  }
  /**
   * Actualiza una reacción
   * @param {number} reactionid - Id de la reacción
   * @param {number} userid - Id del usuario
   * @param {ReactionType} reactionType - Tipo de reacción
   * @return {ReactionState}
   */
  static async updateReaction(
      reactionid: number,
      userid: number,
      reactionType: ReactionType,
  ): Promise<ReactionState> {
    if (!reactionid) return new ReactionError('falta \'reactionid\' gafo');
    if (!userid) return new ReactionError('falta \'userid\' gafo');
    if (!reactionType) return new ReactionError('falta \'reactionType\' gafo');
    const a = await reaction.findUnique({where: {id: reactionid}});
    if (!a) return new ReactionError('esta reaccion no existe gf');
    const b = await post.findUnique({where: {id: a?.postid}});
    if (!b) return new ReactionError('esta publicacion no existe gf');
    if (a?.userid !== userid) {
      return new ReactionError('que crees que haces? pendejo');
    }
    const updatedReaction = await reaction.update({
      where: {id: reactionid},
      data: {type: reactionType},
    });
    return new ReactionSuccessfull(updatedReaction);
  }
}

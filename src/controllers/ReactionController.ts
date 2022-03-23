import { post, reaction } from "../prisma/prisma";
import {
  ReactionError,
  ReactionState,
  ReactionSuccessfull,
} from "../helpers/models/ReactionState";

type ReactionType = "heart" | "like" | "hahaha" | "xd" | "sad";

export default class ReactionController {
  static async addReaction(
    userid: number,
    postid: number,
    ReactionType: ReactionType
  ): Promise<ReactionState> {
    if (!postid) return new ReactionError("anormal te falta 'postid'");
    const a = await post.findUnique({ where: { id: postid } });
    if (!a) return new ReactionError("Esta publicacion no existe");
    if (a?.authorId === userid)
      return new ReactionError(
        "eres retrasado o que? no reacciones a tus publicaciones gf"
      );
    if (!userid) return new ReactionError("anormal te falta 'userid'");
    if (!ReactionType)
      return new ReactionError("anormal te falta 'reactionType'");
    const newReaction = await reaction.create({
      data: {
        postid: postid,
        userid: userid,
        type: ReactionType,
      },
    });
    return new ReactionSuccessfull(newReaction);
  }
  static async removeReaction(
    reactionid: number,
    userid: number
  ): Promise<ReactionState> {
    if (!reactionid) return new ReactionError("falta 'reactionid' gafo");
    if (!userid) return new ReactionError("falta 'userid' gafo");
    const a = await reaction.findUnique({ where: { id: reactionid } });
    const b = await post.findUnique({ where: { id: a?.postid } });
    if (!b) return new ReactionError("esta publicacion no existe gf");
    if (a?.userid !== userid || a?.userid !== b?.authorId)
      return new ReactionError("que crees que haces? pendejo");
    const deletedReaction = await reaction.delete({
      where: { id: reactionid },
    });
    return new ReactionSuccessfull(deletedReaction);
  }
  static async UpdateReaction(
    reactionid: number,
    userid: number,
    reactionType: ReactionType
  ): Promise<ReactionState> {
    if (!reactionid) return new ReactionError("falta 'reactionid' gafo");
    if (!userid) return new ReactionError("falta 'userid' gafo");
    if (!reactionType) return new ReactionError("falta 'reactionType' gafo");
    const a = await reaction.findUnique({ where: { id: reactionid } });
    if (!a) return new ReactionError("esta reaccion no existe gf");
    const b = await post.findUnique({ where: { id: a?.postid } });
    if (!b) return new ReactionError("esta publicacion no existe gf");
    if (a?.userid !== userid)
      return new ReactionError("que crees que haces? pendejo");
    const updatedReaction = await reaction.update({
      where: { id: reactionid },
      data: { type: reactionType },
    });
    return new ReactionSuccessfull(updatedReaction);
  }
}

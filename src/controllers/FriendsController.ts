import {friend, user} from '../helpers/prisma';
import {FriendError,
  FriendState,
  FriendSuccessfull} from '../helpers/models/FriendState';


/**
* Controlador para operaciones entre solicitudes de amistad y amigos
*/
export default class FriendsController {
  /**
   * Añadir un nuevo amigo
   * @param {{
   * number, number
   * }} {userid, friendid} - Id del usuario que envía la solicitud
   * y el id del usuario que la recibe
   * @return {FriendState}
   */
  static async addFriend({userid, friendid}:
    {userid: number, friendid: number}): Promise<FriendState> {
    if (!userid) {
      return new FriendError('el campo \'userid\' falta imbécil');
    };
    if (!friendid) {
      return new FriendError('el campo \'friendid\' falta imbécil');
    };
    if (userid === friendid) {
      return new FriendError('no puedes agregarte a ti mismo gafo');
    };
    if (!(await user.findUnique({where: {id: friendid}}))) {
      return new FriendError('el usuario no existe');
    };
    const req = await friend.create({
      data: {
        userId: friendid,
        senderId: userid,
        Accepted: false,
      },
    });
    return new FriendSuccessfull(req);
  }
  /**
   * Borrar un amigo
   * @param {{
   * number, number
   * }} {userid, friendid} - Id del usuario que está eliminando la solicitud
   * y el id del amigo
   * @return {FriendState}
   */
  static async deleteFriend({reqid, userid}:
    {reqid: number, userid: number}): Promise<FriendState> {
    if (!userid) return new FriendError('el campo \'userid\' falta imbécil');
    if (!reqid) return new FriendError('el campo \'reqid\' falta imbécil');
    if (userid !== (await friend.findUnique({where: {id: reqid}}))!.senderId ||
     userid !== (await friend.findUnique({where: {id: reqid}}))!.userId) {
      return new FriendError('no puedes eliminar una solicitud ajena gf');
    };
    const x = await friend.delete({where: {id: reqid}});
    return new FriendSuccessfull(x);
  }
  /**
   * Obtener solicitudes de amistad
   * @param {{
   * number
   * }} {userid} - Id del usuario que está obteniendo las solicitudes
   * @return {FriendState}
   */
  static async getFriendsRequest({userid}:
    {userid: number}): Promise<FriendState> {
    if (!userid) return new FriendError('el campo \'userid\' falta imbécil');
    const req = await friend.findMany({
      where: {userId: userid, Accepted: false},
    });
    return new FriendSuccessfull(req);
  }
  /**
   * Obtener amigos
   * @param {{
   * number, number
   * }} {userid} - Id del usuario que esta obteniendo la lista de amigos
   * @return {FriendState}
   */
  static async getFriends({userid}: {userid: number}): Promise<FriendState> {
    if (!userid) return new FriendError('el campo \'userid\' falta imbécil');
    const req = await friend.findMany({
      where: {userId: userid, Accepted: true},
    });
    return new FriendSuccessfull(req);
  }
  /**
   * Aceptar una solicitud de amistad
   * @param {{number, number}} {reqid, userid} - Id de la solicitud
   * y del usuario remitente
   * @return {FriendState}
   */
  static async acceptFriend({reqid, userid}:
    {reqid: number, userid: number}): Promise<FriendState> {
    if (!userid) return new FriendError('el campo \'userid\' falta imbécil');
    if (!reqid) return new FriendError('el campo \'reqid\' falta imbécil');
    if (userid !== (await friend.findUnique({where: {id: reqid}}))!.userId) {
      return new FriendError('no puedes aceptar una solicitud ajena gf');
    };
    const x = await friend.update({
      where: {id: reqid},
      data: {
        Accepted: true,
      },
    });
    return new FriendSuccessfull(x);
  }
}

import {Post} from '@prisma/client';

/**
 * Clase abstracta base
 */
export abstract class PostState {}

/**
 * Clase que indica si hay error en alguna operacion con los posts
 */
export class PostError extends PostState {
  error: string;
  /**
   * @param {string} error - Mensaje de error
   */
  constructor(error: string) {
    super();
    this.error = error;
  }
}

/**
 * Clase que indica si alguna operación con los post fue exitosa
 */
export class PostSuccessfull extends PostState {
  post: Post | Array<Post>;
  /**
   * @param {Post | Post[]} post - Recibe tanto un objeto
   de post como una lista del mismo
   */
  constructor(post: Post | Array<Post>) {
    super();
    this.post = post;
  }
}

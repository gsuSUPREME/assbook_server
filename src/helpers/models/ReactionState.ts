import {Reaction} from '@prisma/client';

/**
 * Clase abstracta base
 */
export abstract class ReactionState {}

/**
 * Clase que indica si hay error en alguna operacion con las reacciones
 */
export class ReactionError extends ReactionState {
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
 * Clase que indica si operación con las reacciones es exitosa
 */
export class ReactionSuccessfull extends ReactionState {
  reaction: Reaction | Array<Reaction>;
  /**
   * @param {Reaction | Reaction[]} reaction - Recibe tanto un objeto
   de reacción como una lista del mismo
   */
  constructor(reaction: Reaction | Array<Reaction>) {
    super();
    this.reaction = reaction;
  }
}

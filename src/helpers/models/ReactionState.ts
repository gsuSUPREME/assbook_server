import { Reaction } from "@prisma/client";
export abstract class ReactionState {}

export class ReactionError extends ReactionState {
  error: string;
  constructor(error: string) {
    super();
    this.error = error;
  }
}
export class ReactionSuccessfull extends ReactionState {
  reaction: Reaction | Array<Reaction>;
  constructor(reaction: Reaction | Array<Reaction>) {
    super();
    this.reaction = reaction;
  }
}

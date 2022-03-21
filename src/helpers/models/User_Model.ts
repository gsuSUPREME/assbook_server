import { User } from "@prisma/client";

export abstract class UserState {}

export class UserError extends UserState {
  error: String;
  constructor(error: string) {
    super();
    this.error = error;
  }
}

export class UserSuccessfull extends UserState {
  user: User;
  constructor(user: User) {
    super();
    this.user = user;
  }
}

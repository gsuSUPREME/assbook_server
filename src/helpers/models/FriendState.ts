import { Friend } from "@prisma/client";

export abstract class FriendState {}

export class FriendError extends FriendState {
    error: string;
    constructor(error: string) {
        super();
        this.error = error;
    }
}

export class FriendSuccessfull extends FriendState {
    request: Friend | Friend[];
    constructor(request: Friend | Friend[]) {
        super();
        this.request = request;
    }
}
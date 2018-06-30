import { Theater } from "../../models/theater.model";

export class SetTheater {
    static readonly type = '[THEATER] Set';

    constructor(public payload: Theater) {}
}

export class RemoveTheater {
    static readonly type = '[THEATER] Remove';
}
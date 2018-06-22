import { Cinema } from "../../models/cinema.model";

export class SetCinema {
    static readonly type = '[CINEMA] Set';

    constructor(public payload: Cinema) {}
}

export class RemoveCinema {
    static readonly type = '[CINEMA] Remove';
}
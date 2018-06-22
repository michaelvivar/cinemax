import { Movie } from "../../models/movie.model";

export class SetMovie {
    static readonly type = '[MOVIE] Set';

    constructor(public payload: Movie) {}
}

export class RemoveMovie {
    static readonly type = '[MOVIE] Remove';
}
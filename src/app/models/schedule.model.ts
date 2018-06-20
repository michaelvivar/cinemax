import { Seat } from "./seat.model";

export interface Schedule {
    movie: any;
    theater: any;
    cinema: any;
    time: { start: Date, end: Date },
    price: number;
    seats?: { [id: string]: Seat };
}
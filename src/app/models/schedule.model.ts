import { Seat } from "./seat.model";

export interface Schedule {
    id?: any;
    movie: any;
    theater: any;
    cinema: any;
    date: Date;
    time: { start: string, end: string },
    price: number;
    seats?: { [id: string]: Seat };
    status: boolean;
}
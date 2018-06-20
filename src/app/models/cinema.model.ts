import { Seat } from "./seat.model";

export interface Cinema {
    id: any;
    name: string;
    row: number;
    column: number;
    status: boolean;
    seats: { [id: number]: Seat }
}
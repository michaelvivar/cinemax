import { Seat } from "../../models/seat.model";

export class DisableSeat {
    static readonly type = '[SEAT] Disabled';

    constructor(public payload: Seat) {}
}

export class EnableSeat {
    static readonly type = '[SEAT] Enabled';

    constructor(public payload: Seat) {}
}

export class SetSeatValue {
    static readonly type = '[SEAT] Set value';

    constructor(public payload: { seat: Seat, value?: number }) {}
}

export class SetSeat {
    static readonly type = '[SEAT] Set';

    constructor(public payload: { [id: string]: Seat }) {}
}

export class AddSeat {
    static readonly type = '[SEAT] Add';

    constructor(public payload: Seat) {}
}
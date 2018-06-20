import { Seat } from "../../models/seat.model";
import { State, Action, StateContext } from "@ngxs/store";
import { SetSeatValue, EnableSeat, DisableSeat, SetSeat, AddSeat } from "../actions/seat.actions";

interface SeatStateModel {
    [id: string]: Seat;
}

@State<SeatStateModel>({
    name: 'seats'
})
export class SeatsState {

    @Action(SetSeatValue)
    setSeatValue(context: StateContext<SeatStateModel>, { payload }: SetSeatValue) {
        const state = context.getState();
        if (payload.value >= 0) {
            payload.seat.value = payload.value;
        }
        state[payload.seat.id] = payload.seat;
        context.setState(state);
    }

    @Action(EnableSeat)
    enableSeat(context: StateContext<SeatStateModel>, { payload }: EnableSeat) {
        const state = context.getState();
        payload.status = true;
        state[payload.id] = payload;
        context.setState(state);
    }

    @Action(DisableSeat)
    disableSeat(context: StateContext<SeatStateModel>, { payload }: DisableSeat) {
        const state = context.getState();
        payload.status = false;
        state[payload.id] = payload;
        context.setState(state);
    }

    @Action(SetSeat)
    setSeat(context: StateContext<SeatStateModel>, { payload }: SetSeat) {
        context.setState(payload);
    }

    @Action(AddSeat)
    addSeat(context: StateContext<SeatStateModel>, { payload }: AddSeat) {
        const state = context.getState();
        state[payload.id] = payload;
        context.setState(state);
    }
}
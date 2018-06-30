import { State, Action, StateContext } from "@ngxs/store";
import { Cinema } from "../../models/cinema.model";
import { SetCinema, RemoveCinema } from "../actions/cinema.actions";


@State<Cinema>({
    name: 'cinema'
})
export class CinemaState {

    @Action(SetCinema)
    setCinema(context: StateContext<Cinema>, { payload }: SetCinema) {
        context.setState(payload);
    }

    @Action(RemoveCinema)
    RemoveCinema(context: StateContext<Cinema>) {
        context.setState(null);
    }
}
import { State, Action, StateContext } from "@ngxs/store";
import { SetPageConfirmExit, RemovePageConfirmExit, SetUser, RemoveUser } from "../actions/app.actions";

function defaults() {
    return {
        page: {
            exit: { confirm: false, message: 'Are you sure you want to leave this page?' },
            loading: false
        },
        user: null
    }
}

class AppStateModel {
    page: {
        exit: {
            confirm: boolean,
            message?: string
        },
        loading: boolean
    }
    user: any
}

@State<AppStateModel>({
    name: 'app',
    defaults: defaults()
})
export class AppState {

    @Action(SetPageConfirmExit)
    setPageExit(context: StateContext<AppStateModel>, { payload }: SetPageConfirmExit) {
        const state = context.getState();
        state.page.exit.message = payload || defaults().page.exit.message;
        state.page.exit.confirm = true;
        context.patchState({ page: state.page });
    }

    @Action(RemovePageConfirmExit)
    removePageExit(context: StateContext<AppStateModel>) {
        const state = context.getState();
        state.page.exit.message = defaults().page.exit.message;
        state.page.exit.confirm = false;
        context.patchState({ page: state.page });
    }

    @Action(SetUser)
    setUser(context: StateContext<AppStateModel>, { payload }: SetUser) {
        context.patchState({ user: payload });
    }

    @Action(RemoveUser)
    removeUser(context: StateContext<AppStateModel>) {
        context.patchState({ user: null });
    }
}
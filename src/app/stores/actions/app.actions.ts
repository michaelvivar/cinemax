export class SetPageConfirmExit {
    static readonly type = '[PAGE CONFIRM EXIT] Set';

    constructor(public payload?: string ) {}
}

export class RemovePageConfirmExit {
    static readonly type = '[PAGE CONFIRM EXIT] Remove';

    constructor() {}
}

export class SetUser {
    static readonly type = '[USER] Set';

    constructor(public payload: any) {}
}

export class RemoveUser {
    static readonly type = '[USER] Remove';
}
export class Alert {
    id: string = '';
    type: AlertType = AlertType.Success;
    message: string = '';
    autoClose: boolean = false;
    background: boolean = true;
    keepAfterRouteChange?: boolean = true;
    fade: boolean = false;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning,
    Dark,
    RegisterResponse,
}
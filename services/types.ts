
export enum Validation {
    Passed, Failed, Unknown
}

export interface MessagePusher {
    (message: string): unknown
}

export interface Rule {
    check(value: any, error: MessagePusher, warn: MessagePusher): boolean
}

export interface Data {
    [key: string] : unknown;
}

export interface Request {
    (data: Data) : void;
}

export interface Form {
    fields: Field[];
    request: Request | null;

    submit(): boolean;
    detach(el: Field): void;
    register(el: Field): void;
}

export function isForm(form: unknown): form is Form {
    return typeof form === 'object' 
        && form !== null
        && 'dirty' in form
        && 'fields' in form 
        && 'submit' in form
        && 'detach' in form
        && 'request' in form
        && 'register' in form
}

export interface Field {
    name: string;

    validate(): Validation;
    compute(): unknown;
    dirty(): boolean;
    focus(): void;
}
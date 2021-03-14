
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
        && 'register' in form
}

export interface Validatable {
    validate(): Validation;
}

export function isValidatable(field: unknown): field is Validatable {
    return typeof field === 'object' 
        && field !== null
        && 'validate' in field;
}

export interface Field {
    name: string;

    validate(): boolean;
    valuable(): boolean;
    compute(): unknown;
    dirty(): boolean;
    focus(): void;
}
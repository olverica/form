
export interface MessagePusher {
    (message: string): unknown
}

export interface Rule {
    check(value: any, error: MessagePusher, warn: MessagePusher): boolean
}

export interface Data {
    [key: string]: unknown;
}

export interface Form {
    dirty(): boolean;
    find(name: string): Field; 

    submit(): void;
    submitField(el: Field): void;

    detach(el: Field): void;
    register(el: Field): void;
}

export function isForm(form: unknown): form is Form {
    return typeof form === 'object' 
        && form !== null
        && 'dirty' in form
        && 'submit' in form
        && 'submitField' in form
        && 'detach' in form
        && 'register' in form
}

export interface Validatable {
    validate(): boolean;
    focus(): void;
}

export function isValidatable(field: unknown): field is Validatable {
    return typeof field === 'object' 
        && field !== null
        && 'focus' in field
        && 'validate' in field;
}

export interface Field {
    name: string;

    valuable(): boolean;
    compute(): unknown;
    dirty(): boolean;
}
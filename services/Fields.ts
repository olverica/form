import {Rule} from '~/services/Rules'

export interface Field {
    name: string;

    compute(): any
}

export abstract class TextField implements Field {
    
    public name = 'text-field' 

    private rules: Rule[] = [];

    private _entry: string = '';

    constructor(rules: Rule[] = []) {
        this.rules = rules;
    }

    get entry(): string {
        return this._entry;
    }

    set entry(value: string)  {
        this.validate(value);
        this._entry = value;
    }

    validate(value: string) {
        let errors = [];

        for(let rule of this.rules)
            console.log(rule)
    }

    compute() {
        this._entry;
    }
}
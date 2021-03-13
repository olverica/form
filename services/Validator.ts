import {Rule, Validation} from '@/services/types'

export class Validator 
{
    public rules: Rule[] = [];

    public errors: string[] = [];

    public warnings: string[] = []

    public state: Validation = Validation.Unknown;

    public check(value: any): Validation {
        this.warnings = [];
        this.errors = [];

        // traversing rules
        let pushError =  this.errors.push.bind(this.errors);
        let pushWarning = this.warnings.push.bind(this.warnings);
        
        for (let rule of this.rules)
            rule.check(value, pushError, pushWarning);
        
        this.state = this.errors.length ?
            Validation.Failed : Validation.Passed;

        return this.state;
    }

    clear() {
        this.warnings = [];
        this.errors = [];

        this.state = Validation.Unknown;
    }
}
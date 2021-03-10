import {Rule, Validation} from '@/services/types'

export class Validator 
{
    public rules: Rule[] = [];

    public check(value: any, errors: string[], warnings: string[] = []): Validation {
        // traversing rules
        for (let rule of this.rules)
            rule.check(value, errors.push.bind(errors), warnings.push.bind(warnings));
        
        if (errors.length)
            return Validation.Failed;

        return Validation.Passed
    }
}
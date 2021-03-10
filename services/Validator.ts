import {Rule} from '@/services/types'

export class Validator 
{
    public rules: Rule[] = [];

    public check(value: any, errors: string[], warnings: string[] = []): boolean {
        // traversing rules
        for (let rule of this.rules)
            rule.check(value, errors.push.bind(errors), warnings.push.bind(warnings));
        
        return !!!errors.length
    }
}
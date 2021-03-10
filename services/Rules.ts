import {Rule, MessagePusher} from '@/services/types'

export class Required implements Rule 
{
    public check(entry: string, error: MessagePusher): boolean {
        if(entry.length)
            return true;
        
        error('This field is required');
        return false;
    }
}

export class Max implements Rule 
{
    public readonly value: number;

    constructor(value: number) {
        this.value = value;
    }

    public check(entry: string, error: MessagePusher): boolean {
        if (entry.length <= this.value)
            return true;

        error('Max size exceeeeded')
        return false
    }
}

export class Min implements Rule 
{
    public readonly value : number;

    constructor(value: number) {
        this.value = value;
    }

    public check(entry: string, error: MessagePusher): boolean {
        if (entry.length >= this.value)
            return true;

        error('Too few');
        return false;
    }
}
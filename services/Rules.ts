import {Rule} from '@/services/types'

export class Required implements Rule {
    check(entry: string): string|null {
        return entry.length ? 
            'This field is required' : null;
    }
}

export class Max implements Rule {
    public readonly value: number;

    constructor(value: number) {
        this.value = value;
    }

    check(entry: string): string|null {
        return entry.length < this.value ? 
            null : 'Max size exceeeeded'
    }
}

export class Min implements Rule {
    public readonly value : number;

    constructor(value: number) {
        this.value = value;
    }

    check(entry: string): string|null {
        return entry.length > this.value ? 
            null : 'Too few characters'
    }
}
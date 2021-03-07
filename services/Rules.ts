export interface Rule {
    name: string,
    check: (entry: string) => boolean
}

export class Required implements Rule {
    public readonly name = 'required';

    check(entry: string): boolean {
        return entry.length > 0;
    }
}

export class Size implements Rule { 
    private max: null | number = null;
    private min: null | number = null;

    public readonly name = 'size';

    constructor(min = null, max = null) {
        this.max = max;
        this.min = min;
    }

    check(entry: string): boolean {
        if (this.min !== null && entry.length < this.min)
            return false;
        
        if (this.max !== null && entry.length > this.max)
            return false;

        return true;
    }
}
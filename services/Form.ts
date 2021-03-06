import {Field} from '~/services/Fields'

export interface Data {
    [key: string] : any
}

export interface Request {
    (data: Data) : void
}

export class Form 
{
    public request: Request | null;

    public fields: Field[] = [];

    constructor(request: Request | null = null) {
        this.request = request;
    }

	contains(target: Field): boolean {
		for (let field of this.fields) {
			if (field.name === target.name)
				return true;
		}

		return false;
	}

    register(field: Field): void {
		if (this.contains(field))
			throw Error(`Field with name ${field.name} has been already registered`)

	    this.fields.push(field);
    }

    detach(field: Field): void {
		let index = this.fields.indexOf(field);
		if (index !== -1)
			throw Error(`Cant find field while detaching`)

		this.fields.splice(index, 1);
    }

	validate(): boolean {
		return false;
	}

	submit() {
		return;
	}
}
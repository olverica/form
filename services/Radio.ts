import {Field} from '~/services/types'

export interface Radio {
  compute() : unknown;
  disable() : void;
  select() : void;
}

export class RadioGroup implements Field {
  
    public readonly name: string;
  
    private radios: Radio[] = [];
    
    private active: Radio|null = null;

    
    constructor(name: string) {
      this.name = name;
    }
  
    public select(radio: Radio): void {
      this.active?.disable();
      this.active = radio;
      this.active.select();
    }
  
    private contains(radio: Radio): boolean {
      return this.radios.indexOf(radio) !== -1;
    }
  
    public append(radio: Radio): void {
      if (this.contains(radio))
        throw Error(`Cant append same radio several times`);
  
      this.radios.push(radio);
  
      if (this.radios.length === 1)
        this.select(radio);
    }
  
    public detach(radio: Radio): void {
      if (!!!this.contains)
        throw Error(`Radio isn't attached`)
  
      let index = this.radios.indexOf(radio); 
      this.radios.splice(index, 1);
    }

    public dirty() {
      return Boolean(this.active);
    }

    public valuable(): boolean {
      return Boolean(this.active);
    }

    public compute(): unknown {
      return this.active?.compute();
    }
  }
  
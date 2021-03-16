import {Rule, Field, Form, isForm, Validatable} from '~/services/types'
import {Component, Inject, Prop} from 'vue-property-decorator'
import {Validator, Validation} from '~/services/Validator'
import Vue from 'vue'

@Component
export default class TextField extends Vue implements Field, Validatable{
    @Inject()
    readonly $form!: Form|null;
  
    @Prop({type: Number, default: null})
    readonly maxlength!: number|null;
  
    @Prop({type: Array, default: () => []})
    readonly rules!: Rule[];
  
    @Prop({type: String, default: ''})
    readonly placeholder!: string;
    
    @Prop({type: String, default: ''})
    readonly default!: string;
  
    @Prop({type: String, default: 'Title'})
    readonly title!: string;
  
    @Prop({type: String, default: 'field'})
    readonly name!: string;

    @Prop({type: Boolean, default: false})
    readonly optional!: string;

    protected validator = new Validator();
    
    protected focused = false;
  
    protected entry = '';
  
    get form(): Form|null {
      let form = this.$form;
      return isForm(form) ? form : null;
    }
  
    get active(): boolean {
      return this.focused || Boolean(this.entry.length);
    }
  
    get failed(): boolean {
      return this.validator.state === Validation.Failed;
    }
  
    get passed(): boolean {
      return this.validator.state === Validation.Passed;
    }
  
    get errors(): string[] {
      return this.validator.errors;
    }
  
    get warnings(): string[] {
      return this.validator.warnings;
    }
  
    mounted() {
      this.entry = this.default;
  
      this.restrict();
      this.register();
    }

    focus(): void {
      this.focused = true;
    }
  
    restrict() {
      this.validator.rules = this.rules;
    }
  
    register() {
      this.form?.register(this);
    }
  
    valuable(): boolean {
      if (this.optional && !!!this.entry.length)
        return false;

      return true
    }
  
    compute(): string {
      return this.entry
    }
  
    dirty(): boolean {
      return this.default !== this.entry;
    }
  
    validate(): boolean {
      if (this.optional && !!!this.entry.length)
        return true;

      return this.validator.check(this.entry) === Validation.Passed ? 
        true : false
    }
  
    check() {
      return this.entry.length ? 
        this.validate(): this.validator.clear();
    }
}
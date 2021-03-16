import {Component, Inject, Prop} from 'vue-property-decorator'
import {Field, Form, isForm} from '~/services/types'
import Vue from 'vue'

@Component
export default class Checkbox extends Vue implements Field{
  
  @Inject() 
  readonly $form!: Form|null;

  @Prop({type: Boolean, default: false})
  readonly default!: boolean; 

  @Prop({type: String, default: 'press me!'})
  readonly title!: string; 

  @Prop({type: String, default: 'control'})
  readonly name!: string; 

  protected active: boolean = false;

  get form(): Form|null {
    let form = this.$form;
    return isForm(form) ? form : null;
  }

  mounted() {
    this.active = this.default;

    this.register();
  }

  register() {
    this.form?.register(this);
  }

  valuable(): boolean {
    return true;
  }

  compute(): unknown {
    return this.active;
  }

  dirty(): boolean {
    return this.default !== this.active;
  }

  toggle() {
    this.active = !!!this.active;
  }
}
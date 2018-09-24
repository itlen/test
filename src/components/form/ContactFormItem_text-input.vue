<template>
  <div class="contact-form__form__input-wrapper" :class="{ fullwidth: fullwidth }">
    <input class="contact-form__form__input-wrapper__input-element"
      :class="{ invalid: invalid }"
      :type="type"
      :name="name"
      :value="value"
      :id="id"
      :required=required
      :aria-label="label"
      @focus="onFocus"
      @blur="onChange"
      @change="onChange"
      @keydown="onKeydown">
    <label class="contact-form__form__input-wrapper__label" :class="{ active: active, required: required, invalid: invalid }" v-bind:for="id">{{this.label}}</label>
  </div>
</template>

<script>
export default {
  name: 'contactFormItemTextInput',
  props: {
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: 'name'
    },
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'label'
    },
    required: {
      type: Boolean,
      Default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    fullwidth: {
      type: Boolean,
      default: false
    },
    invalid: {
      type: Boolean,
      default: false
    }
  },



  mounted () {
    this.$nextTick(function () {
      if (this.active) this.$el.querySelector('.contact-form__form__input-wrapper__input-element').focus()
    })
  },



  methods: {

    onFocus () {
      this.$el.querySelector('.contact-form__form__input-wrapper__label').classList.add('active')  
    },

    onChange (event) {
      let input = this.$el.querySelector('.contact-form__form__input-wrapper__input-element')
      let label = this.$el.querySelector('.contact-form__form__input-wrapper__label')

      if (input.value.length > 0) {
        this.active = true
        label.classList.add('active')
      }
      else {
        this.active = false
        label.classList.remove('active')
      }

      if ( input.value.length > 0 && !this._validate(input.value) ) this.invalid = true
    },
    
    onKeydown: function(event) {

      let input = this.$el.querySelector('.contact-form__form__input-wrapper__input-element')
      let validKeys = [8,9,37,39,46,189,16,18] //left, right, del, backspace, tab, - , shift, alt

      if ( (this.type == 'text' && !this._validate(event.key)) ) {

        if ( !validKeys.includes(event.which) ) {
          event.preventDefault()

          input.style.borderColor = 'crimson'
          input.style.color = 'crimson'

          setTimeout(()=>{
            input.style.borderColor = 'black'
            input.style.color = 'black'
          }, 300)

          return false

        }
      }
    },
    
    _validate: function(value) {

      let regExp = this.validateTemplates[this.type] ? this.validateTemplates[this.type] : ''
      return regExp.test(value);
    }
  },


  data: function () {
    return {
      validateTemplates: {
        email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        text: /^[а-яА-Я ]+$/,
        number: '',
        url: '',
        tel: '',
        phone: ''
      }
    }
  },
}
</script>

<style>

</style>

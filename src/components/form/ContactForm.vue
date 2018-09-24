<template>
  <section class="contact-form">
    <form action="#" method="post" class="contact-form__form" @submit.prevent="onSubmit">
      <contactFormItemTextInput v-for="item in items_text" v-bind:key="item.id" v-bind="item"></contactFormItemTextInput>
      <contactFormItemTextArea v-for="item in items_area" v-bind:key="item.id" v-bind="item"></contactFormItemTextArea>
      <button type="submit" class="contact-form__form__button-submit">Go</button>
    </form>
  </section>
</template>

<script>

import contactFormItemTextInput from '@/components/form/ContactFormItem_text-input.vue'
import contactFormItemTextArea from '@/components/form/ContactFormItem_textarea.vue'

export default {

  name: 'contactform',

  components: {
    contactFormItemTextInput,
    contactFormItemTextArea
  },

  methods: {
    onSubmit: function () {

    }
  },

  data: function () {
    return {
      items_text: [
        { id: 'text_name', type: 'text', value: '', name: 'name', label: 'Имя', active: true },
        { id: 'email_email', type: 'email', name: 'email', label: 'Почта', required: true }
      ],
      items_area: [
        { id: 'area_message', name: 'message', label: 'Сообщение', required: true, fullwidth: true }
      ]
    }
  }

}

</script>

<style>

  .contact-form {
    max-width: 480px;
    margin: 0 auto;
    padding: 0;
  }

  .contact-form__form {
    padding: 8px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .contact-form__form__button-submit {
    margin: auto;
    padding: 16px;
    background-color: crimson;
    border: none;
    color:white;
    font-size: 1.3em;
    flex: 0 0 51%;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    transition: all .4s cubic-bezier(0.215, 0.61, 0.355, 1);
    box-shadow: 0 8px 17px 2px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2);
  }

  .contact-form__form__button-submit:hover {
    box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -7px rgba(0,0,0,0.2);
  }

  .contact-form__form__button-submit::before {
    content: "";
    position: absolute;
    top:0;
    left: 0;
    width: 0;
    height: 100%;
    background: rgba(255, 255, 255, .3);
    transition: all .2s cubic-bezier(0.215, 0.61, 0.355, 1);
    outline: none;
  }

  .contact-form__form__button-submit:hover:before {
    width: 33%;
  }
  .contact-form__form__button-submit:active:before {
    width: 100%;
  }

  .contact-form__form__input-wrapper {
    position: relative;
    display: flex;
    padding: 8px 0;
    margin: 8px 0;
    flex: 1 0 40%;
  }

  .contact-form__form__input-wrapper__label {
    position: absolute;
    top: 16px;
    left: 24px;
    pointer-events: none;
    transition: all cubic-bezier(0.215, 0.61, 0.355, 1);
    transition-duration: 0;
  }

  .contact-form__form__input-wrapper__label.active {
    top: -12px;
    left: 16px;
    transition-duration: .4s;
    transform: scale(.9,.9);
  }

  .contact-form__form__input-wrapper__label.invalid {
    color: crimson;
  }

  .contact-form__form__input-wrapper__input-element {
    padding: 8px;
    margin: 0 16px;
    border-radius: 3px;
    border: 1px solid black;
    background: transparent;
    outline: none;
    flex: 1 0 51%;
    resize: none;
  }

  .contact-form__form__input-wrapper__input-element.invalid {
    color: crimson;
    border-color: crimson;
  }

/*  .contact-form__form__input-wrapper__input-element:valid {
    border-color: #42b983;
    color: #42b983;
  }

  .contact-form__form__input-wrapper__input-element:invalid(:not):focus; {
    border-color: crimson;
    color: crimson;
  }*/

  .fullwidth {
    flex:1 0 100%;
  }

  .required::after {
    content: "(обязательно)";
    font-size: .7em;
  }

</style>

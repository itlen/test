<template>
  <div class="contact-form__form__input-wrapper" :class="{ fullwidth: fullwidth }">
    <textarea class="contact-form__form__input-wrapper__input-element"
      :type="type"
      :name="name"
      :val="val"
      :id="id"
      :required=required
      @focus="onFocus"
      @blur="onChange"
      @change="onChange">
    </textarea>
    <label class="contact-form__form__input-wrapper__label"
      :aria-label="label"
      :class="{ active: active }"
      v-bind:for="id">{{this.label}}
    </label>

  </div>
</template>

<script>
export default {
  name: 'contactFormItemTextArea',
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
    val: {
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
    }
  },
  mounted () {
    this.$nextTick(function () {
      if (this.active) this.$el.querySelector('.contact-form__form__input-wrapper__input-element').focus()
    })
  },
  methods: {

    onFocus () {
      let input = this.$el.querySelector('.contact-form__form__input-wrapper__input-element')
      let label = this.$el.querySelector('.contact-form__form__input-wrapper__label')
      label.classList.add('active')
    },

    onChange () {
      let input = this.$el.querySelector('.contact-form__form__input-wrapper__input-element')
      let label = this.$el.querySelector('.contact-form__form__input-wrapper__label')

      if (input.value.length > 0) {
        this.active = true
        label.classList.add('active')
      } else {
        this.active = false
        label.classList.remove('active')
      }
    }

  },
  data: function () {
    return {
      activeLocal: this.active
    }
  }
}
</script>

<style scoped>

  .contact-form__form__input-wrapper__input-element {
    min-height: 80px;
  }

</style>

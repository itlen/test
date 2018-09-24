<template>
  <div class="contacts">
    <h1>Contacts</h1>
    <contactform></contactform>
  </div>
</template>

<script>
import contactform from '@/components/form/ContactForm.vue'
export default {
  name: 'contacts',
  components: {
    contactform
  },
  metaInfo: {
    title: 'Контакты: Softext test task',
    meta: [
      { vmid: 'description', property: 'description', content: 'Description for home page' },
      { vmid: 'og:title', property: 'og:title', content: 'Vue App' },
      { vmid: 'og:description', property: 'og:description', content: 'Description for home page' },
    ],
  }
}
</script>

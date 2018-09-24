<template>
  <section class="weather">
    <weatherpage></weatherpage>
  </section>
</template>

<script>
import weatherpage from '@/components/weather/Weather.vue'
export default {
  name: 'view_weatherpage',
  components: {
    weatherpage
  }
}
</script>

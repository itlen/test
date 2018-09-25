<template>
  <div class="weather__weather-wrapper__weather-card__week-day">
    <p>{{ this.date }}-{{ this.day }}-{{ this.tAvr}}&#176;</p>
  </div>
</template>

<script>

export default {

  name: 'weatherweek',
  props: {
    id: {
      type: String,
      default: ''
    },
    day: {
      type: String,
      default: ''
    },
    date: {
      type: Number
    },
    hour: {
      type: Number
    },
    weather: {
      type: String,
      default: ''
    },
    current: {
      type: Boolean,
      default: false
    },
    temperatureInDay: {
      type: Array
    }
  },
  data: function () {
    return {}
  },
  computed: {
    tAvr: function () {
      return Number(this.temperatureInDay.reduce((s, c) => s + c) / this.temperatureInDay.length).toFixed(1)
    }
  },

  methods: {}

}

</script>

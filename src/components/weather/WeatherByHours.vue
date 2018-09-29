<template>
  <div class="weather__weather-wrapper__weather-card__week-day__hour">

      <span><u>{{ this.weatherDescription }}</u>{{ this.time }}</span>
      <span>Облачность: {{ this.clouds }}%</span>
      <img :src="this.weatherIcon" :alt="this.weatherDescription" :title="this.weatherDescription" width="50" height="50"><b>{{ this.temperature }}&#176;</b>

  </div>
</template>

<script>

export default {

  name: 'weatherbyhours',
  props: {
    time: {
      type: String,
      default: ''
    },
    weatherIcon: {
      type: String,
      default: ''
    },
    clouds: {
      type: Number,
      default: 0
    },
    weatherDescription: {
      type: String,
      default: ''
    },
    temperature: {
      type: Number,
      default: 0
    }
  },
  data: function () { return {} },
  computed: {},
  methods: {}

}

</script>

<template>
  <div class="weather__weather-wrapper__weather-card__week-day">
    <p>{{ this.id }} {{ this.tAvr}} {{ this.weather }}</p>
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
      temperature: {
        type: Array,
        default: []
      },
      weather: {
        type: String,
        default: ''
      },
      current: {
        type: Boolean,
        default: false
      }
    },
    data: function() {
      return {}
    },
    computed: {
      tAvr: function() {
        return Math.floor(this.temperature.reduce((sum, current)=>sum+current)/this.temperature.length)
      }
    },

    methods: {}
  
  }

</script>


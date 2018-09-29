<template>
  <div class="weather__weather-wrapper__weather-card__week-day"
    :class="{today:this.today}"
    @click.stop="_setCurrentDay">
    <h3 class="weather__weather-wrapper__weather-card__week-day__header">
      <span class="date">{{ this.month }}</span>
      <span class="day">{{ this.day }}, {{ this.date }}</span>
      <span class="tavr">Средняя t: {{ this.tAvr }}&#176;</span>
    </h3>
    <div class="weather__weather-wrapper__weather-card__week-day__hours" v-if="this.active" :class="{active: this.active}">
      <weatherbyhours v-for="hour in hours" v-bind="hour"></weatherbyhours>
    </div>
  </div>
</template>

<script>
import weatherbyhours from '@/components/weather/WeatherByHours.vue'
export default {
  name: 'weatherbydays',
  components: {
    weatherbyhours
  },
  props: {
    id: {
      type: Number
    },
    day: {
      type: String,
      default: ''
    },
    date: {
      type: Number
    },
    month: {
      type: String,
      default: ''
    },
    clouds: {
      type: Number
    },
    weatherToday: {
      type: Array
    },
    active: {
      type: Boolean,
      default: false
    },
    today: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      hours: this.weatherToday
    }
  },
  computed: {
    active: function () {
      return this.today
    },
    tAvr: function () {
      let temp = 0
      this.weatherToday.forEach((item) => {
        temp = temp + Number(item.temperature)
      })
      return Number(temp / this.weatherToday.length).toFixed(1)
    }
  },

  methods: {
    _setCurrentDay: function () {
      this.today === false ? this.$emit('setCurrentDay', this.day) : this.$emit('resetCurrentDay')
    }
  }

}

</script>

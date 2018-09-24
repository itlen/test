<template>
  <div class="weather__weather-wrapper__weather-card" :class="{current: current, active: active}" @click="_toggleItCurrent">
    <h4 class="weather__weather-wrapper__weather-card__city">{{ this.city }}</h4>
    <button class="weather__weather-wrapper__weather-card__button"  v-if="current" @click.stop="_toggleItActive">{{ this.label }}</button>
    <div class="weather__weather-wrapper__weather-card__week">
      <weatherweek v-for="day in dayses" :key="day.id" v-bind="day"></weatherweek>
    </div>
  </div>
</template>

<script>

import weatherweek from '@/components/weather/WeatherWeek.vue'
import axios from 'axios'

export default {
  name: 'weathercard',
  components: {
    weatherweek
  },
  props: {
    city: {
      type: String,
      default: ''
    },
    current: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    geocoords: {
      type: Array
    }
  },
  data: function () {
    return {
      // days: [
      //   {id: 'Понедельник', temperature: [21, 33, 26, 24], weather: 'sun', current: false},
      //   {id: 'Вторник', temperature: [21, 36, 26, 24], weather: 'sun', current: false},
      //   {id: 'Среда', temperature: [21, 33, 26, 24], weather: 'sun', current: false},
      //   {id: 'Четверг', temperature: [21, 38, 26, 24], weather: 'sun', current: false},
      //   {id: 'Пятница', temperature: [24, 30, 26, 18], weather: 'sun', current: true},
      //   {id: 'Суббота', temperature: [21, 33, 26, 24], weather: 'sun', current: false}
      // ]
    }
  },
  computed: {
    label: function () {
      return this.active ? 'Свернуть' : 'Подробнее'
    }
  },
  methods: {

    _toggleItCurrent: function () {
      return !this.current ? this.$emit('setCurrent', this.city) : this.$emit('resetCurrent')
    },

    _toggleItActive: function () {
      if (!this.active) {
        this._getForecastDataFromYandexWeatherApi()

        this.$emit('setActive')
        this.label = 'Свернуть'
      } else {
        this.$emit('resetActive')
        this.label = 'Подробнее'
      }
    },

    _getForecastDataFromYandexWeatherApi () {
      let url = 'https://api.weather.yandex.ru/v1/forecast?&lat=' + this.geocoords[0] + '&lon=' + this.geocoords[1] + '&lang=ru_RU&limit=7&hours=true&extra=true'

      axios.get(url, {
        headers: {
          'X-Yandex-API-Key': '1b3167ea-52d5-4c7f-bc50-59494434bc3f'
        } })
        .then((response) => {
          return response.data
        }).catch()
    }
  }

}

</script>

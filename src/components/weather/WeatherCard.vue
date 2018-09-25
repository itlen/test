<template>
  <div class="weather__weather-wrapper__weather-card" :class="{current: current, active: active}" @click="_toggleItCurrent">
    <h4 class="weather__weather-wrapper__weather-card__city">{{ this.city }}</h4>
    <button class="weather__weather-wrapper__weather-card__button"  v-if="current" @click.stop="_toggleItActive">{{ this.label }}</button>
    <div class="weather__weather-wrapper__weather-card__week">
      <weatherweek v-for="day in days" :key="day.dt" v-bind="day"></weatherweek>
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
    id: {
      type: Number
    },
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
    }
  },
  data: function () {
    return {
      days: [
        // {"dt":1537887600,"main":{"temp":282.1,"temp_min":281.891,"temp_max":282.1,"pressure":1026.11,"sea_level":1028.65,"grnd_level":1026.11,"humidity":90,"temp_kf":0.21},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02d"}],"clouds":{"all":8},"wind":{"speed":7.16,"deg":325.003},"sys":{"pod":"d"},"dt_txt":"2018-09-25 15:00:00"},

        // {"dt":1537898400,"main":{"temp":281.4,"temp_min":281.241,"temp_max":281.4,"pressure":1027.62,"sea_level":1030.16,"grnd_level":1027.62,"humidity":92,"temp_kf":0.16},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":5.68,"deg":317.501},"sys":{"pod":"n"},"dt_txt":"2018-09-25 18:00:00"},

        // {"dt":1537909200,"main":{"temp":281.9,"temp_min":281.79,"temp_max":281.9,"pressure":1027.76,"sea_level":1030.48,"grnd_level":1027.76,"humidity":96,"temp_kf":0.11},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":12},"wind":{"speed":5.47,"deg":304},"sys":{"pod":"n"},"dt_txt":"2018-09-25 21:00:00"}
      ]
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
      let url = 'https://api.openweathermap.org/data/2.5/forecast?id=' + this.id + '&cnt=70&APPID=f38105de7433463d32b25c8b566c7ab1'

      axios.get(url)
        .then((response) => {
          let result = response.data.list
          let week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
          let currentDate = []
          let tempDate = new Date()

          for (var i = 0; i < result.length; i++) {
            let timestamp = result[i].dt * 1000
            tempDate.setTime(timestamp)

            let weekDay = week[tempDate.getDay()]

            result[i].id = timestamp
            result[i].date = tempDate.getDate()
            result[i].hour = tempDate.getHours()
            result[i].day = weekDay
            result[i].clouds = result[i].clouds.all
            result[i].temper = Number(Number(result[i].main.temp) - 273.3).toFixed(1)

            currentDate[result[i].date] = {
              date: result[i].date,
              day: result[i].day
            }

            delete (result[i].dt)
            delete (result[i].wind)
            delete (result[i].sys)
            delete (result[i].rain)
            delete (result[i].main)
          }

          let dateArray = []
          let j = 0

          currentDate.forEach((item) => {
            let tInDay = []
            result.forEach(function (i) {
              if (i.date === item.date) tInDay.push(Number(i.temper))
              // console.dir(buf)
            })

            item.temperatureInDay = tInDay
            dateArray[j++] = item
          })

          console.dir(dateArray)

          this.days = dateArray
        }).catch()
    }
  }

}

</script>

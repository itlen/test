<template>
  <div class="weather__weather-wrapper__weather-card" :class="{current: current, active: active, cached: cached}">
    <h2 class="weather__weather-wrapper__weather-card__city">{{ this.city }}</h2>
    <button class="weather__weather-wrapper__weather-card__button" v-if="current" @click.stop="_toggleItActive">{{ this.label }}</button>
    <div class="weather__weather-wrapper__weather-card__week" v-if="this.active">
      <weatherbydays v-for="day in days" :key="day.dt" v-bind="day" @setCurrentDay="_setCurrentDay(day.day)"></weatherbydays>
    </div>
  </div>
</template>

<script>

import weatherbydays from '@/components/weather/WeatherByDays.vue'

export default {
  
  name: 'weatherbycities',
  
  components: {
    weatherbydays
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
    },
    cacheOn: {
      type: Boolean,
      default: true
    },
    cached: {
      type: Boolean,
      default: false      
    }
  },

  data: function () {
    return {
      days: []
    }
  },

  created () {
    console.log('created',this.city)
    if (this.cacheOn && !this.cached) return this._getForecastData()
  },  

  updated() {
    console.log('updated',this.city)
    if (this.cacheOn && !this.cached) return this._getForecastData()
  },

  computed: {
    label: function () {
      return this.active ? 'Свернуть' : 'Подробнее'
    }
  },

  methods: {

    _setCurrentDay: function (day) {
      this.days.map(function (i) { i.day === day ? i.today = true : i.today = i.active = false })
    },

    _toggleItCurrent: function () {
      return !this.current ? this.$emit('setCurrent', this.city) : this.$emit('resetCurrent')
    },

    _toggleItActive: function () {
      if (!this.active) {
        this._getForecastData()
        this.$emit('setActive')
        this.label = 'Свернуть'
      } else {
        this.$emit('resetActive')
        this.label = 'Подробнее'
      }
    },

    _getForecastData () {
      
      console.clear()

      let url = 'https://api.openweathermap.org/data/2.5/forecast?id=' + this.id + '&cnt=70&APPID=f38105de7433463d32b25c8b566c7ab1'

      var request = new Request(url)

      if ('caches' in window.self) {
        console.log('go 2 cache')
        window.caches.open('myWeather').then(cache => {
          cache.match(request).then(response => {
            if (response.status === 200) {
              response.json().then(data => {
                console.log('status 200, отдали из кэша')
                return this._renderData(data)
              }).catch(err => {
                return false
              })
            }
          }).catch(() => {
            console.log('no in cache')
            this._tryFromNet(request)
          })
        }).catch(() => { this._tryFromNet(request) })
      } else this._tryFromNet(request)
    },

    _tryFromNet (request) {
      console.log('go 2 net')
      window.fetch(request)
        .then((response) => {
          if (response.status === 200) {
            console.log('status 200, отдали из сети')
            this._putInCache(request, response.clone())
            response.json().then(data => {
              return this._renderData(data)
            })
          }
          return false
        })
        .catch((e) => {
          console.log(e)
          return false
        })
    },

    _putInCache (request, resClone) {
      try {
        if ('caches' in window.self) {
          window.caches.open('myWeather').then(cache => {
            cache.put(request, resClone).then(e => {
              console.log('Положили в кэш')
              this.cached = true
              return this.cached
            }).catch((err) => { return err })
          })
        }
      } catch (err) {
        return err
      }
    },

    _renderData (data) {
      console.log('рендерим полученные данные для', this.city)
      let result = data.list
      if (result.length < 1) return this.days = []

      let uniqueDates = []
      let arrayDates = []
      let week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
      let monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
      let tempDate = new Date()

      for (var i = 0; i < result.length; i++) {
        let timestamp = result[i].dt * 1000
        tempDate.setTime(timestamp)

        let weekDay = week[tempDate.getDay()]
        let month = monthNames[tempDate.getMonth()]
        let date = tempDate.getDate()
        let clouds = result[i].clouds.all
        let today = i === 0
        result[i].date = date

        if (!uniqueDates.includes(date)) {
          uniqueDates.push(date)
          arrayDates.push({
            id: timestamp,
            date: date,
            day: weekDay,
            month: month,
            clouds: clouds,
            today: today
          })
        }
      }

      arrayDates.forEach((item) => {
        let temp = result.filter(i => i.date === item.date)
        temp.forEach((i) => {
          i.clouds = i.clouds.all

          let timestamp = i.dt * 1000
          tempDate.setTime(timestamp)

          i.time = tempDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          i.temperature = Number(i.main.temp - 273.15).toFixed(1)
          i.tMin = Number(Number(i.main.temp_min) - 273.15).toFixed(1)
          i.tMax = Number(Number(i.main.temp_max) - 273.15).toFixed(1)
          i.weatherIcon = '//openweathermap.org/img/w/' + i.weather[0].icon + '.png'
          i.weatherDescription = i.weather[0].description
          i.wind = i.wind.speed
          delete (i.dt_txt)
          delete (i.dt)
          delete (i.weather)
          delete (i.sys)
          delete (i.wind)
          delete (i.rain)
          delete (i.main)
        })

        item.weatherToday = temp
      })

      this.days = arrayDates
      return true
    }

  }
}
</script>

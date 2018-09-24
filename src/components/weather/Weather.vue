<template>
  <div class="weather__weather-wrapper">
    <div class="weather__weather-header">
      <h1 v-if="current_city">Погода в горде {{ this.current_city }} на <span  v-if="this.weekly" id="global-timer"></span><span v-else>неделю</span></h1>

      <h1 v-else>Погода на <span  v-if="this.weekly" id="global-timer"></span><span v-else>неделю</span></h1>

      <button class="weather__weather-header__button"
        v-for="item in items"
        :key="item.id"
        :aria-label="item.city"
        :class="{current: item.current}"
        @click="_setCurrent(item.id)">{{ item.city }}</button>
    </div>
    <weathercard
      v-for="item in items"
      :key="item.id"
      v-bind="item"
      @resetCurrent="_resetCurrent"
      @setActive="_setActive"
      @resetActive="_resetActive"
      @setCurrent="_setCurrent(item.id)"></weathercard>
  </div>
</template>

<script>
import weathercard from '@/components/weather/WeatherCard.vue'

export default {
  name: 'weatherpage',
  components: {
    weathercard
  },
  props: {
    weekly: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      items: [
        { id: 1, city: 'Москва', current: false, active: false, geocoords: ['55.4507', '37.3659'] },
        { id: 2, city: 'Санкт-Петербург', current: true, active: false, geocoords: ['56.50', '60.35'] },
        { id: 3, city: 'Екатеренбург', current: false, active: false, geocoords: ['59.5439', '30.1751'] }
      ]
    }
  },
  computed: {
    current_city: {
      get: function () {
        let c = this.items.filter(c => c.current === true)
        return c.length > 0 ? c[0].city : false
      }
    }
  },
  methods: {

    _setCurrent: function (idOrCity) {
      this.items.map(i => i.id == (idOrCity || i.city == idOrCity) ? i.current = true : i.current = i.active = false)
    },

    _setActive: function () {
      this.items.map(i => i.current ? i.active = true : '')
    },

    _resetActive: function () {
      this.items.forEach(i => { i.active = false })
      return this
    },

    _resetCurrent: function () {
      this.items.forEach(i => { i.current = i.active = false })
      return this
    }
  }
}

let getTime = function () {
  let wrapper = document.querySelector('#global-timer')
  if (wrapper) {
    let date = new Date()
    let time = date.toLocaleTimeString()
    wrapper.innerHTML = time
  }
}

window.setInterval(getTime, 1000)

</script>

<style>

  .weather {
    max-width: 960px;
    margin: 0 auto;
  }

  .weather__weather-header {
    flex: 1 0 100%;
  }

  #global-timer {
    font-size: .6em;
  }

  .weather__weather-header__button {
    border: none;
    background-color: #ddd;
    padding: 8px;
    margin: 8px;
    min-width: 128px;
    border-radius: 3px;
    cursor:pointer;
    position: relative;
  }

  .weather__weather-header__button.current {
    color: #0c75be;
  }

  .weather__weather-header__button::before {
    content: "";
    position: absolute;
    top:0;
    left: 0;
    width: 0;
    height: 100%;
    background: rgba(255, 255, 255, .3);
    transition: all .2s cubic-bezier(0.215, 0.61, 0.355, 1);
    outline: none;
  }

  .weather__weather-header__button:hover:before {
    width: 33%;
  }

  .weather__weather-header__button:active:before {
    width: 100%;
  }

  .weather__weather-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-around;
  }

  .weather__weather-wrapper__weather-card {
    margin: 16px 0;
    padding: 8px;
    flex: 0 0 280px;
    border-radius: 3px;
    order: 1;
    opacity: .8;
    background-color: white;
    box-shadow: 0 0 2px 0 rgba(0,0,0,.1), 0 2px 6px 0 rgba(0,0,0,.1);
    /*transition: all .4s cubic-bezier(0.215, 0.61, 0.355, 1);*/
    animation: jump_off .8s cubic-bezier(0.785, 0.135, 0.15, 0.86) forwards;
  }

  .weather__weather-wrapper__weather-card.active {
    transition: all .4s cubic-bezier(0.215, 0.61, 0.355, 1);
    order: 0;
    flex: 1 0 100%;
    max-width: 90%;
  }

  .weather__weather-wrapper__weather-card.current {
    color: #0c75be;
    transition: none;
    animation: jump_on .5s cubic-bezier(0.785, 0.135, 0.15, 0.86) forwards;
    box-shadow: 0 0 6px 0 rgba(0,0,0,.1), 0 6px 18px 0 rgba(0,0,0,.1);
  }

   @keyframes jump_on {
      0% {transform: scale(1,1) translateY(0);color: transparent;opacity: .8;}
      20% {transform: scale(1.1,0.9) translateY(0);}
      50% {transform: scale(0.95,1.05) translateY(-24px);}
      70% {transform: scale(1.1,0.9) translateY(0);color: transparent;}
      100% {transform: scale(1,1) translateY(0);color: #0c75be;opacity: 1;}
  }

  .weather__weather-wrapper__weather-card__week {
    display: none;
  }

  .weather__weather-wrapper__weather-card.active .weather__weather-wrapper__weather-card__week {
    display: block;
  }

</style>

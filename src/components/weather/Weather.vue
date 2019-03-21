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
    <weatherbycities
      v-for="item in items"
      :key="item.id"
      v-bind="item"
      @resetCurrent="_resetCurrent"
      @setActive="_setActive"
      @resetActive="_resetActive"
      @setCurrent="_setCurrent(item.id)"></weatherbycities>
  </div>
</template>

<script>
import weatherbycities from '@/components/weather/WeatherByCities.vue'

export default {
  name: 'weatherpage',
  components: {
    weatherbycities
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
        { id: 524901, city: 'Москва', current: false, active: false },
        { id: 498817, city: 'Санкт-Петербург', current: false, active: false },
        { id: 1486209, city: 'Екатеренбург', current: false, active: false }
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
      this.items.map(function (i) { i.id === (idOrCity || i.city === idOrCity) ? i.current = true : i.current = i.active = false })
    },

    _setActive: function () {
      this.items.map(function (i) { i.current === true ? i.active = true : i.active = false })
    },

    _resetActive: function () {
      this.items.forEach(function (i) { i.active = false })
      return this
    },

    _resetCurrent: function () {
      this.items.forEach(function (i) { i.current = i.active = false })
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
    position: relative;
    background-color: white;

    box-shadow: 0 0 2px 0 rgba(0,0,0,.1), 0 2px 6px 0 rgba(0,0,0,.1);
    /*transition: all .4s cubic-bezier(0.215, 0.61, 0.355, 1);*/
    animation: jump_off .8s cubic-bezier(0.785, 0.135, 0.15, 0.86) forwards;
  }

  .weather__weather-wrapper__weather-card.active {
    transition: all .4s cubic-bezier(0.215, 0.61, 0.355, 1);
    order: 0;
    padding: 2em;
    flex: 1 0 100%;
    max-width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
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

  .weather__weather-wrapper__weather-card.cached::before {
    content: 'offline availible';
    font-size: 12px;
    position: absolute;
    top: 4px;
    left: 4px;
  }

  .weather__weather-wrapper__weather-card.active
  .weather__weather-wrapper__weather-card__city {
    margin: 0;
  }

  .weather__weather-wrapper__weather-card__week {
    flex: 1 0 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
  }

  .weather__weather-wrapper__weather-card__week-day:not(.today) {
    order:1;
    flex: 0 0 120px;
    background-color: #fbfbfb;
    border: 1px solid #d6d5d5;
    padding: 4px;
    box-sizing: border-box;
    border-radius: 3px;
    cursor: pointer;
    box-shadow: 0 0 2px 0 rgba(0,0,0,.1), 0 2px 6px 0 rgba(0,0,0,.1);
  }

  .weather__weather-wrapper__weather-card__week-day.today {
    flex: 1 0 100%;
    order:0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid #d4d4d4;
  }

  .weather__weather-wrapper__weather-card__week-day__hours.active {
    flex: 1 0 60%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
  }

  .weather__weather-wrapper__weather-card__week-day__header {
    font-size: 1em;
    line-height: 1em;
    font-weight: 100;
    margin: 0;
  }

  .weather__weather-wrapper__weather-card__week-day__header span {
    font-size: .8em;
    line-height: 1em;
    font-weight: 100;
    display: block;
    text-align: left;
    padding: 0 0 .2em 0;
  }

  .weather__weather-wrapper__weather-card__week-day.today
  .weather__weather-wrapper__weather-card__week-day__header {
    flex: 1 0 40%;
    padding: 0;
    border: none;
    box-shadow: none;
    margin: 14px 0;
    line-height: 1em;
  }

  .weather__weather-wrapper__weather-card__week-day.today
  .weather__weather-wrapper__weather-card__week-day__header span {
    display: block;
    font-size: 14px;
    text-align: left;
    padding: 0 0 .2em 0;
    font-weight: 100;
  }

  .weather__weather-wrapper__weather-card__week-day__hour {
    flex: 1 0 25%;
    text-align: left;
    font-size: .8em;
    padding: 8px;
    margin: 8px 0 8px 16px;
    background-color: #fbfbfb;
    border: 1px solid #d6d5d5;
    border-radius: 3px;
    box-shadow: 0 0 2px 0 rgba(0,0,0,.1), 0 2px 6px 0 rgba(0,0,0,.1);
  }

  .weather__weather-wrapper__weather-card__week-day__hour span {
    margin: 0 0 2px 0;
    display: flex;
    justify-content: space-between;
  }

  .weather__weather-wrapper__weather-card__week-day__hour img {
    float:left;
  }

  .weather__weather-wrapper__weather-card__week-day__hour b {
    display: block;
    padding: 14px 0;
    font-size: 18px;
    font-weight: 100;
    float: right;
  }

  .weather__weather-wrapper__weather-card__week-day__hour b::before {
    /*content:"t=";*/
    margin-right: 2px;
  }

</style>

<template>
  <div class="home">
    <carousel :navigationEnabled=true :paginationActiveColor="'#782402'" :paginationColor="'#e1af34'" :autoplay=true :autoplayHoverPause=true :perPage=1 :perPageCustom="[[520, 1], [640, 2], [768, 3], [1024, 6]]">
      <Slide>1<img src="http://cdn8.s.kolorado.ru/products/4/47/479/47975/111_1_6_design.png" alt="Alt fo picture" /></Slide>
      <Slide>2<img src="http://cdn8.s.kolorado.ru/products/4/47/479/47975/111_1_6_design.png" alt="Alt fo picture" /></Slide>
      <Slide>3<img src="http://cdn8.s.kolorado.ru/products/4/47/479/47975/111_1_6_design.png" alt="Alt fo picture" /></Slide>
      <Slide>4<img src="http://cdn8.s.kolorado.ru/products/4/47/479/47975/111_1_6_design.png" alt="Alt fo picture" /></Slide>
      <Slide>5<img src="http://cdn8.s.kolorado.ru/products/4/47/479/47975/111_1_6_design.png" alt="Alt fo picture" /></Slide>
      <Slide>6<img src="http://cdn8.s.kolorado.ru/products/4/47/479/47975/111_1_6_design.png" alt="Alt fo picture" /></Slide>
      <Slide>7<img src="http://cdn8.s.kolorado.ru/products/4/47/479/47975/111_1_6_design.png" alt="Alt fo picture" /></Slide>
      <Slide>8<img src="http://cdn8.s.kolorado.ru/products/4/47/479/47975/111_1_6_design.png" alt="Alt fo picture" /></Slide>
      <Slide>9<img src="http://cdn8.s.kolorado.ru/products/4/47/479/47975/111_1_6_design.png" alt="Alt fo picture" /></Slide>
      <Slide>10<img src="http://cdn8.s.kolorado.ru/products/4/47/479/47975/111_1_6_design.png" alt="Alt fo picture" /></Slide>
      <Slide>11<img src="http://cdn8.s.kolorado.ru/products/4/47/479/47975/111_1_6_design.png" alt="Alt fo picture" /></Slide>
      <Slide>12<img src="http://cdn8.s.kolorado.ru/products/4/47/479/47975/111_1_6_design.png" alt="Alt fo picture" /></Slide>
      <Slide>13<img src="http://cdn8.s.kolorado.ru/products/4/47/479/47975/111_1_6_design.png" alt="Alt fo picture" /></Slide>
      <Slide>14<img src="http://cdn8.s.kolorado.ru/products/4/47/479/47975/111_1_6_design.png" alt="Alt fo picture" /></Slide>
      <Slide>15<img src="http://cdn8.s.kolorado.ru/products/4/47/479/47975/111_1_6_design.png" alt="Alt fo picture" /></Slide>
    </carousel>
  </div>
</template>

<script>

import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'home',
  components: {
    Carousel,
    Slide
  },
  metaInfo: {
    title: 'Softext test task',
    meta: [
      { vmid: 'description', property: 'description', content: 'Description for home page' },
      { vmid: 'og:title', property: 'og:title', content: 'Vue App' },
      { vmid: 'og:description', property: 'og:description', content: 'Description for home page' }
    ]
  }
}
</script>

<style>
  .VueCarousel-slide {
    max-width: 220px;
  }

  .VueCarousel-slide img {
    max-width: 100%;
  }

</style>

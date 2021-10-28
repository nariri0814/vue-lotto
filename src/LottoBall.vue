<template>
<!-- 로또볼 표시 -->
  <div class="ball" :style="background">{{number}}</div>
</template>

<script>
  export default {
    props: {
      number: Number
    },
    // props 로 받은 것은 바꿀 수 없음
    // 줄여서 props: ['number'],
    computed: {
      background() {
        let background;
        if(this.number <= 10) {
          background = '#f0c633';
        } else if(this.number <= 20) {
          background = '#87c7f0'
        } else if(this.number <= 30) {
          background = '#ea7a75'
        } else if(this.number <= 40) {
          background = '#abacac'
        } else {
          background = '#bad852'
        }
        return {
          background,
        }
      }
    },
  }
</script>

<style>
  .ball {
    width: 40px;
    height: 40px;
    display: inline-block;
    /* border: 1px solid #000; */
    border-radius: 50%;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
    margin-right: 20px;
    margin-bottom: 10px;
  }
</style>
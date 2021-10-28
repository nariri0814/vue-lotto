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
          background = '#f5bb32';
        } else if(this.number <= 20) {
          background = '#8cc6e7'
        } else if(this.number <= 30) {
          background = '#f18d80'
        } else if(this.number <= 40) {
          background = '#a7a2de'
        } else {
          background = '#6bce9e'
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
    width: 60px;
    height: 60px;
    display: inline-block;
    border-radius: 50%;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
    margin-right: 20px;
    margin-bottom: 10px;
  }
  .ball:last-child {
    margin: 0;
  }
</style>
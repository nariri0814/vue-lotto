<template>
<!-- 로또볼 생성 -->
<div v-if="!show" class="init-wrap">
  <img src=""/>
  <button @click="[onClickBtn(), onClkickRedo()]" class="btn">로또 추첨하기</button>
</div>
<div v-show="show" class="show-wrap">
  <div class="ball-wrap">
    <div>당첨 숫자</div>
    <div id="computer">
      <lotto-ball v-for="ball in winBalls" :key="ball" :number="ball"></lotto-ball>
    </div>
  </div>
  <div class="bonus-wrap">
    <div class="bonus-txt">보너스</div>
    <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
  </div>
  <button v-if="redo" @click="onClickRedo" class="btn-again">AGAIN</button>
</div>
</template>

<script> 
  import LottoBall from './LottoBall.vue';

  function getWinNumbers() {
    const candidate = Array(45).fill().map((v,i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0,6).sort((p,c) => p - c);
    return [...winNumbers, bonusNumber];
  }

  const timeouts = [];
  export default {
    components: {
      'lotto-ball':LottoBall, //LottoBall 줄일 수 있음 vue가 자동으로 케밥케이스로 바꿔줌
    },
    data() {
      return {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false,
        show: false
      };
    },
    methods: {
      onClickBtn() {
        this.show = true;
      },
      onClickRedo() {
        this.winNumbers = getWinNumbers();
        this.winBalls = [];
        this.bonus = null;
        this.redo = false;
        this.showBalls();
      },
      showBalls() {
        for(let i = 0; i < this.winNumbers.length - 1; i++) {
          timeouts[i] = setTimeout(() => {
            this.winBalls.push(this.winNumbers[i])
          },(i + 1) * 1000)
        }
        timeouts[6] = setTimeout(() => {
          this.bonus = this.winNumbers[6];
          this.redo = true;
        }, 7000)
      },
    }, 
    mounted() {
      this.showBalls();
    },
    beforeUnmount() {
      timeouts.forEach((t) => {
        clearTimeout(t)
      })
    }
  }
</script>

<style scoped>
  @font-face {
      font-family: 'HSSaemaul-Regular';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/HSSaemaul-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }
  * {
    font-family: 'HSSaemaul-Regular';
  }
  #computer {
    background-position: 0 0;
    padding: 20px;
  }
  .init-wrap {
    width: 100%;
    text-align: center;
  }
  .show-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 30px;
  }
  .btn {
    display: block;
    margin: 0 auto;
    width: 230px;
    padding: 17px;
    outline: none;
    border: none;
    background: darkslateblue;
    color: #fff;
    border-radius: 20px;
    box-shadow: rgb(0 0 0 / 12%) 0px 3px 6px -4px, rgb(0 0 0 / 8%) 0px 6px 16px, rgb(0 0 0 / 5%) 0px 9px 28px 8px;
    font-size: 23px;
    font-weight: 500;
  }

  /* .ball-wrap {
    height: 100px;
  } */

  .bonus-txt {
    margin-bottom: 20px;
  }

  .btn-again {
    padding: 10px 17px;
    margin-top: 20px;
    background: slategray;
    border: none;
    border-radius: 8px;
    color: #fff;
    font-weight: 900;
  }
</style>
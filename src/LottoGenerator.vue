<template>
<!-- 로또볼 생성 -->
<div>
  <div>당첨 숫자</div>
  <div id="결과창">
    <lotto-ball v-for="ball in winBalls" :key="ball" :number="ball"></lotto-ball>
  </div>
  <div>보너스</div>
  <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
  <button v-if="redo" @click="onClickRedo">AGAIN</button>
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
      };
    },
    computed: {
      
    },
    methods: {
      onClickRedo() {
        // 초기화
        this.winNumbers = getWinNumbers();
        this.winBalls = [];
        this.bonus = null;
        this.redo = false;
        this.showBalls();
      },
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
    beforeCreate() {
      
    },
    created() {
      
    },
    beforeMount() {
      
    },
    mounted() {
      this.showBalls();
    },
    beforeUpdate() {
      
    },
    updated() {
      
    },
    beforeUnmount() {
      timeouts.forEach((t) => {
        clearTimeout(t)
      })
    },
    watch: {
      
    }
    
  };
</script>

<style scoped>
  #computer {
    width: 142px;
    height: 200px;
    background-position: 0 0;
  }
</style>
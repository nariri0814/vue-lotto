// import Vue from 'vue';
import LottoGenerator from './LottoGenerator';
import { createApp } from 'vue'

// vue2문법
// new Vue({
//   render: createElement => createElement(LottoGenerator)
// }).$mount('#root');

createApp(LottoGenerator).mount('#app')
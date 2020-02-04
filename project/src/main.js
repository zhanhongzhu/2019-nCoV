// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';
import '../static/common.css';
NutUI.install(Vue);

Vue.config.productionTip = false

import axios from 'axios';
Vue.prototype.$axios = axios;
import QS from 'qs'; //用来解决vue中post请求（详情）
Vue.prototype.qs = QS;

axios.defaults.timeout = 5000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
axios.defaults.baseURL = ''; //配置接口地址


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})

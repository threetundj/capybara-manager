import Vue from 'vue'
import App from './App'
import components from './components/'

Vue.config.productionTip = false
App.mpType = 'app'

// Object.keys(components).forEach(function(name) {
//   Vue.component(name, components[name]);
// });

const app = new Vue(App)
app.$mount()

/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)


// axios
import axios from "./axios.js"
import infoJson from '../info.json'
Vue.prototype.$http = axios
Vue.prototype.$infoJson = infoJson
Vue.prototype.$version = process.env.VUE_APP_VERSION


// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'

import 'vue-multiselect/dist/vue-multiselect.min.css'

// Tailwind
import '@/assets/css/main.css'


// Vue Router
import router from './router'

// i18n
import i18n from './i18n/i18n'


// Vuex Store
import store from './store/store'


// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

// ADDONS Vue-multiselect
import Multiselect from 'vue-multiselect'
import "vue-multiselect/dist/vue-multiselect.min.css";
Vue.component('multiselect', Multiselect)

// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'


// Feather font icon
require('./assets/css/iconfont.css')
import 'vue-select/dist/vue-select.css';

// VeeValidate
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);


// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

// vue cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.$cookies.config('7d','/','',false)

import DataTable from './components/DataTable.vue'
Vue.component("data-table",DataTable)
import CardDataTable from './components/CardDataTable.vue'
Vue.component("card-data-table",CardDataTable)
import DataTableNonVS from './components/DataTableNonVS.vue'
Vue.component("data-table-non-vs",DataTableNonVS)

// vue content placeholder
import VueContentPlaceholders from 'vue-content-placeholders'
Vue.use(VueContentPlaceholders)

import moment from 'moment'
Vue.mixin({
  methods: {
    priceFormat: function (amount) {
      amount = parseFloat(amount).toFixed(2)
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    globalDateFormat: function (date) {
      if (date) {
        // return moment(date).format('DD/MM/YYYY')
        return moment.utc(date).format('DD/MM/YYYY');
      } 
      return ''
    },
    downloadFileAwsS3: function (key) {
			this.$vs.loading();
      this.$http.post("/api/wms/v1/general/download", {
          key : key,
      }).then(resp => {
          if (resp.code == 200) {
            var url = decodeURIComponent(resp.data)
            window.open(url, '_blank').focus();
          } else {
              this.$vs.notify({
                  title: "Error",
                  text: resp.message,
                  color: "danger",
                  position: "top-right",
                  iconPack: "feather",
                  icon: "icon-check"
              });
          }
          this.$vs.loading.close();
      });
		},
  }
  });

 /* eslint-disable */
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')

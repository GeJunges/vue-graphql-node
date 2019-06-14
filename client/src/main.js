import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueApollo);

const defaultClient = new ApolloClient({
  uri: 'http://localhost:5002/graphql',
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App),
}).$mount('#app');

import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
// eslint-disable-next-line import/no-cycle
import store from './store';

Vue.use(VueApollo);

// eslint-disable-next-line import/prefer-default-export
export const defaultClient = new ApolloClient({
  uri: 'http://localhost:5002/graphql',
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  provide: apolloProvider,
  router,
  store,
  render: h => h(App),
}).$mount('#app');

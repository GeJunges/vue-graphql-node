import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import FormAlert from './components/Shared/FormAlert.vue';
// eslint-disable-next-line import/no-cycle
import router from './router';
// eslint-disable-next-line import/no-cycle
import store from './store';

Vue.component('form-alert', FormAlert);
Vue.use(VueApollo);

// eslint-disable-next-line import/prefer-default-export
export const defaultClient = new ApolloClient({
  uri: 'http://localhost:5002/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  request: (operation) => {
    if (!localStorage.token) {
      localStorage.setItem('token', '');
    }
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      // eslint-disable-next-line no-console
      console.log('[networkError]', networkError);
    }
    if (graphQLErrors) {
      // eslint-disable-next-line no-restricted-syntax
      for (const err of graphQLErrors) {
        // eslint-disable-next-line no-console
        console.dir(err);
      }
    }
  },
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  provide: apolloProvider,
  router,
  store,
  created() {
    this.$store.dispatch('getCurrentUser');
  },
  render: h => h(App),
}).$mount('#app');

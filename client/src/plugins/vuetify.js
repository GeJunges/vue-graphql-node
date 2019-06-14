import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify, {
  theme: {
    primary: colors.blueGrey.base,
    secondary: colors.blueGrey.lighten1,
    accent: colors.blueGrey.darken1,
    other: colors.lightBlue.darken1,
    error: colors.red.base,
    warning: colors.yellow.base,
    info: colors.blue.base,
    success: colors.green.base,
  },
});

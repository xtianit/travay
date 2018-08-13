/* eslint-disable react/react-in-jsx-scope */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VueButton from './VueButton.vue';

storiesOf('Button', module)
  .add('with text', () => ({
    components: { VueButton },
    template: '<vue-button @click="action">Hello Button</vue-button>',
    methods: { action: action('clicked') },
  }))
  .add('with some emoji', () => ({
    components: { VueButton },
    template:
      '<my-button @click="action"><span role="img" aria-label="so cool">😀 😎 👍 💯</span></my-button>',
    methods: { action: action('clicked') },
  }));

/* eslint-enable react/react-in-jsx-scope */

/* eslint-disable react/react-in-jsx-scope */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import TravayButton from './TravayButton.vue';

storiesOf('Button', module)
  .add('with text', () => ({
    components: { TravayButton },
    template: '<travay-button @click="action">Hello Button</travay-button>',
    methods: { action: action('clicked') },
  }))
  .add('with JSX', () => ({
    components: { TravayButton },
    render() {
      // return <my-button onClick={this.action}>With JSX</my-button>;
    },
    methods: { action: linkTo('clicked') },
  }))
  .add('with some emoji', () => ({
    components: { TravayButton },
    template:
      '<my-button @click="action"><span role="img" aria-label="so cool">😀 😎 👍 💯</span></my-button>',
    methods: { action: action('clicked') },
  }));

/* eslint-enable react/react-in-jsx-scope */

import { storiesOf }                  from '@storybook/vue';
import { action }                     from '@storybook/addon-actions';
import VueAutocomplete                from './VueAutocomplete.vue';

storiesOf('Autocomplete', module)
  .add('Default', () => ({
    components: { VueAutocomplete },
    template: `<vue-autocomplete
            :options="autocompleteOptions"
            :max-options="3"
            placeholder="Type something (e.g. foo)"
            @request="onRequest($event);request($event)"
            @change="change"/>`,
    methods: { action: action('clicked') },
  }));

<template>
  <div>
    <vue-notification-stack/>
    <sign-in-modal/>
    <vue-nav-bar imageUrl="static/logo.png">
      <ul :class="$style.nav">
        <li>
          <router-link :to="'/'">Home</router-link>
        </li>
        <li>
          <router-link :to="'/jobs'">Jobs</router-link>
        </li>
        <li>
          <router-link :to="'/createJob'">Create Job</router-link>
        </li>
        <li>
          <router-link :to="'/profile'">Profile</router-link>
        </li>
        <li>
          <router-link :to="'/transactions'">Transactions</router-link>
        </li>
        <li>
          <router-link :to="'/userGuide'">User Guide</router-link>
        </li>
        <li>
          <vue-button>Sign In / Sign Out</vue-button>
        </li>
      </ul>

      <!--<ul :class="$style.nav">-->
      <!--<li>-->
      <!--<router-link to="/jobs" @click.native="navBarClose">-->
      <!--<i class="fas fa-book" />-->
      <!--<small>{{ $t('App.nav.jobs' /* Jobs */) }}</small>-->
      <!--</router-link>-->
      <!--</li>-->
      <!--<li v-if="userId">-->
      <!--<router-link to="/profile" @click.native="navBarClose">-->
      <!--<i class="fas fa-user" />-->
      <!--<small>{{ $t('App.nav.profile' /* Profile */) }}</small>-->
      <!--</router-link>-->
      <!--</li>-->
      <!--<li v-if="userId">-->
      <!--<router-link to="/transactions" @click.native="navBarClose">-->
      <!--<i class="far fa-credit-card" />-->
      <!--<small>{{ $t('App.nav.transactions' /* Transactions */) }}</small>-->
      <!--</router-link>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a @click="signInClicked">-->
      <!--<i class="fas fa-user-plus" />-->
      <!--<small>{{ userId ? $t('App.nav.signout') : $t('App.nav.signin' /* Signin */) }}</small>-->
      <!--</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a @click="localeSwitch('ht')">-->
      <!--<i class="fas fa-flag" />-->
      <!--<small>{{ $t('App.nav.kreyol' /* Haitian Creole */) }}</small>-->
      <!--</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a @click="localeSwitch('fr')">-->
      <!--<i class="fas fa-flag" />-->
      <!--<small>{{ $t('App.nav.french' /* French */) }}</small>-->
      <!--</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a @click="localeSwitch('en')">-->
      <!--<i class="fas fa-flag" />-->
      <!--<small>{{ $t('App.nav.english' /* English */) }}</small>-->
      <!--</a>-->
      <!--</li>-->
      <!--</ul>-->
    </vue-nav-bar>
  </div>
</template>

<script>
  import SignInModal from '../services/SignInModal';

  export default {
    name: 'navbar',
    components: {SignInModal},
    computed: {
      // ...mapGetters('signInModal', ['userId'])
    },
    methods: {
      // ...mapActions('app', ['changeLocale']),
      // ...mapActions('signInModal', ['openLoginModal', 'saveUserInStorage']),
      signInClicked () {
        this.navBarClose();
        this.openLoginModal();
      },
      // localeSwitch(locale) {
      //   loadLocaleAsync(locale).catch((error: Error) => console.log(error));
      //
      //   this.changeLocale(locale);
      //   this.navBarClose();
      // },
      navBarClose () {
        EventBus.$emit('navbar.close');
      }
    },
    created () {
      try {
        const userData = localStorage.getItem('userData');
        if (userData) {
          this.saveUserInStorage(JSON.parse(userData));
        }
      } catch (err) {
        console.log('err when trying to get user data from storage', err);
      }
    }
  }
</script>

<style lang="scss" module>
  @import "../theme/reset";
  @import "../theme/typo";
  @import "../theme/global";

  .nav {
    margin: $space-unit 0 0 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;

    li {
      flex: 1;
      margin: $space-unit / 2;
      color: $text-color;
      flex-basis: $space-unit * 10;
      height: $space-unit * 10;
      background: $divider-color;
      cursor: pointer;

      a {
        padding: $space-unit * 2;
        display: block;
        color: $text-color;
        text-align: center;
        text-decoration: none;

        small {
          font-size: 12px;
          display: block;
        }

        i {
          height: 32px;
          width: 32px;
        }
      }
    }

    @include media(tabletLandscape) {
      margin: 0;

      li {
        margin: $space-unit;
        opacity: .8;
        transition: opacity $transition-duration linear;

        &:hover {
          opacity: 1;
        }
      }
    }
  }

  .wrapper {
    padding: 0;
  }
</style>

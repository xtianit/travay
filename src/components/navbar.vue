<template>
    <vue-nav-bar imageUrl="static/logo.png">
      <ul :class="$style.nav">
        <li>
          Home
          <router-link :to="'/'">Home</router-link>
        </li>
        <li>
          Components
          <router-link :to="'/components'">Components</router-link>
        </li>
        <li>
          Jobs
          <router-link :to="'/jobs'">Jobs</router-link>
        </li>
        <li>
          Create Job
          <router-link :to="'/createJob'">Create Job</router-link>
        </li>
        <li>
          Job
          <router-link :to="'/job'">Job</router-link>
        </li>
        <li>
          Profile
          <router-link :to="'/profile'">Profile</router-link>
        </li>
        <li>
          Transactions
          <router-link :to="'/transactions'">Transactions</router-link>
        </li>
        <li>
          User Guide
          <router-link :to="'/userGuide'">User Guide</router-link>
        </li>
      </ul>
    </vue-nav-bar>
</template>

<script>
  export default {
    name: 'navbar'
  }
</script>

<style lang="scss" module>
  @import "../theme/reset";
  @import "../theme/typo";
  @import "../theme/global";

  .nav {
    margin:         $space-unit 0 0 0;
    padding:        0;
    list-style:     none;
    display:        flex;
    flex-direction: row;
    flex-wrap:      wrap;
    width:          100%;

    li {
      flex:       1;
      margin:     $space-unit / 2;
      color:      $text-color;
      flex-basis: $space-unit * 10;
      height:     $space-unit * 10;
      background: $divider-color;
      cursor:     pointer;

      a {
        padding:         $space-unit * 2;
        display:         block;
        color:           $text-color;
        text-align:      center;
        text-decoration: none;

        small {
          font-size: 12px;
          display:   block;
        }

        i {
          height: 32px;
          width:  32px;
        }
      }
    }

    @include media(tabletLandscape) {
      margin: 0;

      li {
        margin:     $space-unit;
        opacity:    .8;
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

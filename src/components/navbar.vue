<template>
  <b-navbar toggleable="md" type="light" variant="success">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand><router-link :to="'/'">Home</router-link></b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item><router-link :to="'/components'">Components</router-link></b-nav-item>
        <b-nav-item><router-link :to="'/jobs'">Jobs</router-link></b-nav-item>

        <b-nav-item><router-link :to="'/createJob'">Create Job</router-link></b-nav-item>
        <b-nav-item><router-link :to="'/job'">Job</router-link></b-nav-item>
        <b-nav-item><router-link :to="'/profile'">Profile</router-link></b-nav-item>
        <b-nav-item><router-link :to="'/transactions'">Transactions</router-link></b-nav-item>
        <b-nav-item><router-link :to="'/userGuide'">User Guide</router-link></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">KR</b-dropdown-item>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">FR</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
  export default {
    name: 'navbar'
  }
</script>

<style scoped>
.wrapper {
  padding: 0;
}
</style>

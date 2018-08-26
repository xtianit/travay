<template>
  <div>
    <vue-grid>
      <vue-grid-row>
        <vue-grid-item fill>
          <h1>Transactions</h1>
        </vue-grid-item>

        <vue-tab-group>
          <vue-tab-item title="Balance" icon="far fa-credit-card">
            <vue-data-table :header="header" :data="data" placeholder="Search" @click="action" />

          </vue-tab-item>
          <vue-tab-item title="Transactions" icon="fas fa-list">
            <vue-data-table :header="header" :data="data" placeholder="Search" @click="action" />
          </vue-tab-item>
        </vue-tab-group>

      </vue-grid-row>
    </vue-grid>
  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: "Transactions in Travay",
      meta: [
        {
          name: "Transactions in Travay",
          content: "Transactions in Travay."
        }
      ]
    },
    name: 'transactions'
  }
</script>

<style scoped>

</style>

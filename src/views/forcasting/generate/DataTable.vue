<template>
  <div>
    <vs-table
      :data="this.data"
      stripe
      border
    >
      <template slot="thead">
        <vs-th>Warehouse</vs-th>
        <vs-th>Item</vs-th>
        <vs-th>Year</vs-th>
        <vs-th>Month</vs-th>
        <vs-th>Actual</vs-th>
        <vs-th>S'</vs-th>
        <vs-th>S''</vs-th>
        <vs-th>S'''</vs-th>
        <vs-th>a</vs-th>
        <vs-th>b</vs-th>
        <vs-th>c</vs-th>
        <vs-th>f</vs-th>
        <vs-th>e</vs-th>
        <vs-th>&Sigma;e</vs-th>
      </template>

      <template slot-scope="{ data }">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].warehouse_code">
            {{ data[indextr].warehouse_code }}
            {{ data[indextr].warehouse_name }}
          </vs-td>
          <vs-td :data="data[indextr].item_code">
            {{ data[indextr].item_code }}
            {{ data[indextr].item_name }}
          </vs-td>
          <vs-td :data="data[indextr].year">
            {{ data[indextr].year }}</vs-td>
          <vs-td :data="data[indextr].month">
            {{ data[indextr].month }}</vs-td>
          <vs-td :data="data[indextr].qty">
            {{ data[indextr].qty }}</vs-td>
          <vs-td :data="data[indextr].s1">
            {{ data[indextr].s1.toFixed(2) }}</vs-td>
          <vs-td :data="data[indextr].s2">
            {{ data[indextr].s2.toFixed(2) }}</vs-td>
          <vs-td :data="data[indextr].s3">
            {{ data[indextr].s3.toFixed(2) }}</vs-td>
          <vs-td :data="data[indextr].a">
            {{ data[indextr].a.toFixed(2) }}</vs-td>
          <vs-td :data="data[indextr].b">
            {{ data[indextr].b.toFixed(2) }}</vs-td>
          <vs-td :data="data[indextr].c">
            {{ data[indextr].c.toFixed(2) }}</vs-td>
          <vs-td :data="data[indextr].f">
            {{ data[indextr].f.toFixed(2) }}</vs-td>
          <vs-td :data="data[indextr].e">
            {{ data[indextr].e.toFixed(2) }}</vs-td>
          <vs-td :data="data[indextr].e_sig">
            {{ data[indextr].e_sig.toFixed(2) }}</vs-td>

        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    dataGenerated: {
      type: Array,
    },
  
  },
  data() {
    return {
      data: [],
    }
   
  },
  methods: {
  },
  mounted() {},
  watch: {
    dataGenerated(){
      this.data = this.dataGenerated
      console.log(this.data)
    }
  },
  computed: {},
};
</script>

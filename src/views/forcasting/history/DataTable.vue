<template>
  <div>
    <vs-table
      :sst="true"
      :data="table.data"
      :max-items="table.length"
      :total="table.total"
    >
      <template slot="thead">
        <vs-th sort-key="warehouse_code">Warehouse</vs-th>
        <vs-th sort-key="item_code">Item</vs-th>
        <vs-th sort-key="year">Period</vs-th>
        <vs-th sort-key="month">Alpha</vs-th>
        <vs-th sort-key="month">Forcast</vs-th>
        <vs-th sort-key="month">MAPE</vs-th>
        <vs-th sort-key="month">Generate At</vs-th>
      </template>

      <template slot-scope="{ data }">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].warehouse_code">
            {{ data[indextr].warehouse_code }}
            {{ data[indextr].warehouse_name }}
          </vs-td>
          <vs-td :data="data[indextr].sales_code">
            {{ data[indextr].sales_code }}
            {{ data[indextr].sales_name }}
          </vs-td>
          <vs-td :data="data[indextr].posting_date">
            {{ data[indextr].posting_date }}
          </vs-td>

          <vs-td :data="data[indextr].customer_code">
            {{ data[indextr].customer_code }}
            {{ data[indextr].customer_name }}
          </vs-td>
          <vs-td :data="data[indextr].item_code">
            {{ data[indextr].item_code }}
            {{ data[indextr].item_name }}
          </vs-td>
          <vs-td :data="data[indextr].quantity">
            {{ data[indextr].quantity }}
            {{ data[indextr].item_unit }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>
<script>
import moment from "moment";
export default {
  components: {},
  props: {
    baseUrl: {
      type: String,
    },
    detail: {
      type: Boolean,
    },
    territoryIDs: {
      type: Array,
    },
    personalIDs: {
      type: Array,
    },
    productTeamIDs: {
      type: Array,
    },
    status: {
      type: String,
    },
    dateNow: {
      type: Date,
    },
  },
  data() {
    return {
      deleteId: null,
      table: this.tableDefaultState(),
      checkedAll: false,
      checked: [],
      selectedRouteAssignments: [],
      selectedRouteAssignmentIDs: [],
      selectedRouteAssignmentCodes: [],
    };
  },
  methods: {
    tableDefaultState() {
      return {
        data: [],
        length: 10,
        page: 1,
        search: "",
        order: "id",
        sort: "desc",
        total: 0,
        totalPage: 1,
        totalSearch: 0,
        limits: [10, 25, 50, 100, "All"],
        start: 1,
        end: 0,
      };
    },

    getData() {
      this.$vs.loading();
      this.$http
        .get("v1/main/history/sales-order", {
          params: {
            length: this.table.length,
            page: this.table.page,
            search: this.table.search,
            order: this.table.order,
            sort: this.table.sort,
            territory_ids: this.territoryIDs,
            personal_ids: this.personalIDs,
            product_team_ids: this.productTeamIDs,
            status: this.status,
            date: moment(this.dateNow).format("YYYY-MM-DD"),
          },
        })
        .then((resp) => {
          if (resp.code == 200) {
            this.checkedAll = false;
            this.checked = [];
            this.selectedRouteAssignments = [];

            this.table.total = resp.data.total_record;
            this.table.totalPage = resp.data.total_page;
            this.table.totalSearch = resp.data.total_record_search;
            this.table.length = resp.data.total_record_per_page;
            this.table.data = resp.data.records;
            this.setStartEnd();
            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
          }
        });
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

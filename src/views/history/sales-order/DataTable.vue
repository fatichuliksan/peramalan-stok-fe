<template>
  <div>
    <vs-table
      search
      stripe
      border
      description
      :sst="true"
      :data="table.data"
      :max-items="table.length"
      :total="table.total"
      @search="handleSearch"
      @change-page="handleChangePage"
      @sort="handleSort"
    >
      <template slot="header">
        <vs-dropdown vs-trigger-click class="cursor-pointer">
          <div
            class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
          >
            <span class="mr-2"
              >{{ this.table.start }} - {{ this.table.end }} of
              {{ this.table.total }}</span
            >
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <vs-dropdown-menu>
            <vs-dropdown-item
              v-for="item in table.limits"
              :key="item"
              @click="handleChangelength(item)"
            >
              <span>{{ item }}</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </template>
      <template slot="thead">
        <vs-th sort-key="warehouse_code">Warehouse</vs-th>
        <vs-th sort-key="sales_code">Sales</vs-th>
        <vs-th sort-key="posting_date">Date</vs-th>
        <vs-th sort-key="customer_code">Customer</vs-th>
        <vs-th sort-key="item_code">SKU</vs-th>
        <vs-th sort-key="detail">Quatiity</vs-th>
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
    <vs-pagination
      style="padding-top: 5px"
      :total="table.totalPage"
      v-model="setPage"
    />
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
    handleSearch(searching) {
      this.table.search = searching;
      this.table.page = 1;
      this.getData();
    },
    handleChangePage(page) {
      this.table.page = page;
      this.getData();
    },
    handleSort(key, active) {
      this.table.order = key;
      this.table.sort = active;
      this.getData();
    },
    handleChangelength(val) {
      this.table.length = val == "All" ? this.table.total : val;
      this.table.page = 1;
      this.getData();
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
  mounted() {
    this.getData();
  },
  watch: {},
  computed: {
    setPage: {
      get() {
        return 1;
      },
      set(val) {
        this.handleChangePage(val);
      },
    },
  },
};
</script>

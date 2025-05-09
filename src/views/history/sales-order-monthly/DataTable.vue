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
        <vs-th sort-key="item_code">SKU</vs-th>
        <vs-th sort-key="year">Year</vs-th>
        <vs-th sort-key="month">Month</vs-th>
        <vs-th sort-key="qty">Quantity</vs-th>
      </template>

      <template slot-scope="{ data }">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].warehouse_code">
            {{ data[indextr].warehouse_code }}
            {{ data[indextr].warehouse_name }} </vs-td
          ><vs-td :data="data[indextr].item_code">
            {{ data[indextr].item_code }}
            {{ data[indextr].item_name }}
          </vs-td>
          <vs-td :data="data[indextr].year">
            {{ data[indextr].year }}
          </vs-td>
          <vs-td :data="data[indextr].month">
            {{ data[indextr].month }}
          </vs-td>
          <vs-td :data="data[indextr].qty">
            {{ data[indextr].qty }}
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
    warehouseCode: {
      type: String,
    },
    itemCode: {
      type: String,
    },
    dateStart: {
      type: Date,
    },
    dateEnd: {
      type: Date,
    },
    draw: {
      type: Number,
    },
  },
  data() {
    return {
      deleteId: null,
      table: this.tableDefaultState(),
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
        .get("v1/history/sales-order-monthly", {
          params: {
            length: this.table.length,
            page: this.table.page,
            search: this.table.search,
            order: this.table.order,
            sort: this.table.sort,
            warehouse_code: this.warehouseCode,
            item_code: this.itemCode,
            date_start: (this.dateStart)?moment(this.dateStart).format("YYYY-MM-DD"):null,
            date_end: (this.dateEnd)?moment(this.dateEnd).endOf('month').format("YYYY-MM-DD"):null,
          },
        })
        .then((resp) => {
          if (resp.code == 200) {
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
    setStartEnd() {
      let valStart =
        this.table.length * this.table.page - this.table.length + 1;

      if (valStart > this.table.total) {
        valStart = 1;
      }
      if (this.table.total == 0) {
        valStart = 0;
      }
      let valEnd = this.table.length * this.table.page;

      if (valEnd > this.table.total) {
        valEnd = this.table.total;
      }

      if (
        this.table.totalSearch < this.table.total &&
        this.table.search != ""
      ) {
        valEnd = this.table.totalSearch;
      }

      this.table.start = valStart;
      this.table.end = valEnd;
    },
  },
  mounted() {},
  watch: {
    draw: function (newVal, oldVal) {
      if (newVal != oldVal) {
        this.getData();
      }
    },
  },
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

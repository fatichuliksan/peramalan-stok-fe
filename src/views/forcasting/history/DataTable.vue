<template>
  <div>
    <vs-table
      :sst="true"
      :data="table.data"
      :max-items="table.length"
      :total="table.total"
      @search="handleSearch"
      @change-page="handleChangePage"
      @sort="handleSort"
    >
      <template slot="thead">
        <vs-th sort-key="warehouse_code">Warehouse</vs-th>
        <vs-th sort-key="item_code">Item</vs-th>
        <vs-th sort-key="date_start">Period</vs-th>
        <vs-th sort-key="alpha">Alpha</vs-th>
        <vs-th sort-key="mape">MAPE</vs-th>
        <vs-th sort-key="mape_criteria">MAPE Criteria</vs-th>
        <vs-th sort-key="created_at">Generate At</vs-th>
        <vs-th >Action</vs-th>
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
          <vs-td :data="data[indextr].date_start">
            {{ data[indextr].date_start }} -
            {{ data[indextr].date_end }}
          </vs-td>
          <vs-td :data="data[indextr].alpha">
            {{ data[indextr].alpha }}
          </vs-td>

          <vs-td :data="data[indextr].mape">
            {{ data[indextr].mape.toFixed(2) }} %
          </vs-td>
          <vs-td :data="data[indextr].mape_criteria">
            {{ data[indextr].mape_criteria }}
          </vs-td>
          <vs-td :data="data[indextr].created_at">
            {{ data[indextr].created_at }}
          </vs-td>
          <vs-td :data="data[indextr].id">
            <vs-button
              @click="$emit('handleDetail', data[indextr])"
              icon="list"
              color="success"
              size="small"
              title="Detail"
            ></vs-button>

            <vs-button
              @click="handleDelete(data[indextr].id)"
              icon="delete"
              color="danger"
              size="small"
              title="Delete"
            ></vs-button>
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
        .get("v1/forcasting/history", {
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
            this.table.data = resp.data.records;
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
    handleDelete(id) {
      this.deleteId = id;
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirm`,
        text: "Please confirm to delete this data",
        accept: this.acceptDelete,
      });
    },
    acceptDelete() {
      this.$vs.loading();
      this.$http
        .delete("v1/forcasting/history", {
          params: {
            id: this.deleteId,
          },
        })
        .then((resp) => {
          this.$vs.loading.close();
          if (resp.code == 200) {
            this.$vs.notify({
              color: "success",
              title: "Success",
              text: resp.message,
              position: "top-right",
              iconPack: "feather",
              icon: "icon-x-circle",
            });
          } else {
            this.$vs.notify({
              color: "danger",
              title: "Error",
              text: resp.message,
              position: "top-right",
              iconPack: "feather",
              icon: "icon-x-circle",
            });
          }
          this.getData();
        })
        .catch((error) => {
          this.$vs.loading.close();
          console.log(error);
        });
    },
  },
  mounted() {},
  watch: {
    draw: function (newVal, oldVal) {
      if (newVal != oldVal) {
        console.log("draw", newVal);
        this.getData();
      }
    },
  },
  computed: {},
};
</script>

<template>
  <vx-card title="Sales Order History">
    <div class="vx-row mb-6" style="width: 50%">
      <div class="vx-col sm:w-1/3 w-full flex items-center">
        <span>Warehouse</span>
      </div>
      <div class="vx-col sm:w-2/3 w-full">
        <v-select
          :filterable="true"
          :options="optionWarehouse"
          v-model="selectedWarehouse"
        />
      </div>
    </div>
    <div class="vx-row mb-6" style="width: 50%">
      <div class="vx-col sm:w-1/3 w-full flex items-center">
        <span>SKU</span>
      </div>
      <div class="vx-col sm:w-2/3 w-full">
        <v-select
          :filterable="true"
          :options="optionItem"
          v-model="selectedItem"
        />
      </div>
    </div>

    <div class="vx-row mb-6" style="width: 50%">
      <div class="vx-col sm:w-1/3 w-full flex items-center">
        <span>Period</span>
      </div>
      <div class="vx-col sm:w-2/3 w-full">
        <date-picker
          v-model="period"
          range
          type="month"
          format="MMM YYYY"
          placeholder="Select month range"
          :lang="lang"
        ></date-picker>
      </div>
    </div>

    <div class="vx-row mb-6" style="width: 50%">
      <div class="vx-col sm:w-1/3 w-full flex items-center"></div>
      <div class="vx-col sm:w-2/3 w-full">
        <vs-button
          class="mt-2"
          color="primary"
          type="border"
          icon-pack="feather"
          @click="() => {
            draw ++;
          }"
          >Show</vs-button
        >
      </div>
    </div>

    <div class="vx-row">
      <div class="vx-col w-full mb-base">
        <data-table
        :warehouseCode="(selectedWarehouse)?selectedWarehouse.warehous_code:''"
        :itemCode="(selectedItem)?selectedItem.item_code:''"
        :dateStart="(period)?period[0]:null"
        :dateEnd="(period)?period[1]:null"
        :draw="draw"
        />
      </div>
    </div>
  </vx-card>
</template>
<script>
import DataTable from "./DataTable.vue";
// import Datepicker from "vuejs-datepicker";

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import _ from "lodash";
import vSelect from "vue-select";
export default {
  components: {
    DatePicker,
    vSelect,
    DataTable,
  },
  data() {
    return {
      detailShow: "core vx-col md:w-1/2 w-full mb-base ",
      detailHide: "core vx-col md:w-1/1 w-full mb-base ",
      detail: false,

      baseUrl: "/sales-order",
      optionWarehouse: [],
      selectedWarehouse: null,
      optionItem: [],
      selectedItem: null,
      period: null,
      lang: {
        // Customize your language here if needed
        days: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        months: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        pickers: [
          "next 7 days",
          "next 30 days",
          "previous 7 days",
          "previous 30 days",
        ],
        placeholder: {
          date: "Select date",
          dateRange: "Select date range",
          dateTime: "Select date time",
          dateTimeRange: "Select date time range",
          time: "Select time",
          timeRange: "Select time range",
          month: "Select month",
          monthRange: "Select month range",
          year: "Select year",
          yearRange: "Select year range",
        },
      },
      draw : 0,
    };
  },
  methods: {
    customLabelTerritory({ code, name }) {
      return `${code} ${name}`;
    },
    handleCreate() {
      this.$router.push({
        name: "route-assignment-create",
        // params: { id: id },
      });
    },
    handleImport() {
      this.$router.push({
        name: "route-assignment-import",
        // params: { id: id },
      });
    },
    handleOpen() {
      this.detail = true;
    },
    getWarehouse() {
      this.$vs.loading();
      this.$http
        .get("/v1/main/warehouses", {
          params: {
            length: 0,
            order: "name",
            sort: "asc",
          },
        })
        .then((resp) => {
          if (resp.code == 200) {
            if (resp.data) {
              resp.data.map(function (x) {
                return (x.label = x.warehouse_code + " " + x.warehouse_name);
              });

              this.optionWarehouse = resp.data;
            } else {
              this.optionWarehouse = [];
              this.selectedWarehouse = null;
            }
            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
          }
        });
    },
    getItem() {
      this.$vs.loading();
      this.$http
        .get("/v1/main/items", {
          params: {
            length: 0,
            order: "name",
            sort: "asc",
          },
        })
        .then((resp) => {
          if (resp.code == 200) {
            if (resp.data) {
              resp.data.map(function (x) {
                return (x.label = x.item_code + " " + x.item_name);
              });

              this.optionItem = resp.data;
              this.selectedItem = null;
            } else {
              this.optionItem = [];
              this.selectedItem = null;
            }
            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
          }
        });
    },
    onSearchPersonal(search, loading) {
      if (search.length) {
        loading(true);
        this.searchPersonal(loading, search, this);
      }
    },
    searchPersonal: _.debounce((loading, search, t) => {
      var territorryIDs = [];

      t.selectedTerritory.forEach((element) => {
        territorryIDs.push(element.id);
      });

      t.$http
        .get(t.baseUrl + "/sales2", {
          params: {
            length: 100,
            search: search.trim(),
            territory_ids: territorryIDs,
          },
        })
        .then((resp) => {
          if (resp.code == 200) {
            if (resp.data.records) {
              t.optionPersonal = resp.data.records;
            } else {
              t.optionPersonal = [];
            }
            loading(false);
          } else {
            t.optionPersonal = [];
            loading(false);
          }
        });
    }, 350),
    onSearchProductTeam(search, loading) {
      if (search.length) {
        loading(true);
        this.searcProductTeam(loading, search, this);
      }
    },
    searcProductTeam: _.debounce((loading, search, t) => {
      t.$http
        .get(t.baseUrl + "/product-team", {
          params: {
            length: 100,
            search: search.trim(),
          },
        })
        .then((resp) => {
          if (resp.code == 200) {
            if (resp.data.records) {
              resp.data.records.map(function (x) {
                return (x.label = x.code + " " + x.name);
              });
              t.optionProductTeam = resp.data.records;
            } else {
              t.optionProductTeam = [];
            }
            loading(false);
          } else {
            t.optionProductTeam = [];
            loading(false);
          }
        });
    }, 350),
  },
  mounted() {
    this.getWarehouse();
    this.getItem();
  },
  watch: {
    selectedWarehouse(val) {
      console.log(val);
    },
    selectedItem(val) {
      console.log(val);
    },
    period(val) {
      console.log(val);
    },
  },
};
</script>

<style scoped>
.core-enter-active {
  transition: all 0.3s ease;
}
.core-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.core-enter, .core-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.core {
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  transition: all 1s ease;
}
.vs-con-table .vs-con-tbody .vs-table--tbody-table {
  font-size: 12px;
}
.vertical-divider {
  border-left: 1px solid #7367f0;
  min-height: 800px;
  padding: 5px;
}
</style>

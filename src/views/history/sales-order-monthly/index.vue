<template>
  <vx-card title="Sales Order Monthly">
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
        <span>Periode</span>
      </div>
      <div class="vx-col sm:w-2/3 w-full">
        <date-picker
          v-model="period"
          range
          type="month"
          format="MMM YYYY"
          placeholder="Pilih periode bulan"
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
          @click="
            () => {
              draw++;
            }
          "
          >Show</vs-button
        >
      </div>
    </div>

    <div class="vx-row">
      <div class="vx-col w-full mb-base">
        <data-table
          :warehouseCode="
            selectedWarehouse ? selectedWarehouse.warehouse_code : ''
          "
          :itemCode="selectedItem ? selectedItem.item_code : ''"
          :dateStart="period ? period[0] : null"
          :dateEnd="period ? period[1] : null"
          :draw="draw"
        />
      </div>
    </div>

    <div class="vx-row">
      <div class="vx-col w-full mb-base">
        <e-charts
          autoresize
          :options="line"
          theme="ovilia-green"
          ref="line"
          auto-resize
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

import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/chart/line";
import theme from "./theme.json";

import moment from "moment";

ECharts.registerTheme("ovilia-green", theme);
export default {
  components: {
    DatePicker,
    vSelect,
    DataTable,
    ECharts,
  },
  data() {
    return {
      detailShow: "core vx-col md:w-1/2 w-full mb-base ",
      detailHide: "core vx-col md:w-1/1 w-full mb-base ",
      detail: false,
      optionWarehouse: [],
      selectedWarehouse: null,
      optionItem: [],
      selectedItem: null,
      period: null,
      draw: 0,
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
      line: {
        // Make gradient line here
        visualMap: [
          {
            show: false,
            type: "continuous",
            seriesIndex: 0,
            min: 0,
            max: 400,
          },
        ],
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          data: [],
        },
        yAxis: {
          splitLine: { show: false },
        },
        series: [],
      },
    };
  },
  methods: {
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
              this.selectedWarehouse = resp.data[0];
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
              this.selectedItem = resp.data[0];
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
    getChartData() {
      this.$vs.loading();
      this.line = {
        // Make gradient line here
        visualMap: [
          {
            show: false,
            type: "continuous",
            seriesIndex: 0,
            min: 0,
            max: 400,
          },
        ],
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          data: [],
        },
        yAxis: {
          splitLine: { show: false },
        },
        series: [],
      };
      this.$http
        .get("/v1/history/sales-order-monthly-chart", {
          params: {
            warehouse_code: this.selectedWarehouse
              ? this.selectedWarehouse.warehouse_code
              : "",
            item_code: this.selectedItem ? this.selectedItem.item_code : "",
            date_start: this.period
              ? moment(this.period[0]).format("YYYY-MM-DD")
              : null,
            date_end: this.period
              ? moment(this.period[1]).endOf("month").format("YYYY-MM-DD")
              : null,
          },
        })
        .then((resp) => {
          if (resp.code == 200) {
            if (resp.data) {
              this.line.xAxis.data = resp.data.labels;
              resp.data.charts.forEach((x) => {
                this.line.series.push(x);
              });
            } else {
              this.line.xAxis.data = [];
              this.line.series = [];
            }
            this.$vs.loading.close();
          } else {
            this.line.xAxis.data = [];
            this.line.series = [];
            this.$vs.loading.close();
          }
        });
    },
  },
  mounted() {
    this.getWarehouse();
    this.getItem();
    // this.getChartData();
  },
  watch: {
    draw(data) {
      console.log("draw", data);
      this.getChartData();
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

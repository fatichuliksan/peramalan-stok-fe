<template>
  <vx-card title="Generate">
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
        <span>Item</span>
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
          class="w-full"
        ></date-picker>
      </div>
    </div>
    <div class="vx-row mb-6" style="width: 50%">
      <div class="vx-col sm:w-1/3 w-full flex items-center">
        <span>Alpha</span>
      </div>
      <div class="vx-col sm:w-2/3 w-full">
        <vs-input
          v-model="alpha"
          type="number"
          min="0"
          max="1"
          step="0.01"
          class="w-full"
        ></vs-input>
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
          @click="postGenerate()"
          >Generate</vs-button
        >
      </div>
    </div>

    <div class="vx-row">
      <div class="vx-col w-full mb-base">
        <data-table :dataGenerated="this.generateLines"></data-table>
      </div>
    </div>

    <div class="vx-row">
      <div class="vx-col w-full mb-base">
        <table class="vs-table" width="100%">
          <tr>
            <td width="15%">MAPE</td>
            <td>:</td>
            <td>
              <vs-chip color="primary" v-if="mapeCriteria == 'Highly Accurate'"
                ><strong
                  >{{ mape.toFixed(2) }}% {{ mapeCriteria }}</strong
                ></vs-chip
              >
              <vs-chip color="success" v-if="mapeCriteria == 'Accurate'"
                ><strong
                  >{{ mape.toFixed(2) }}% {{ mapeCriteria }}</strong
                ></vs-chip
              >
              <vs-chip color="warning" v-if="mapeCriteria == 'Less Accurate'"
                ><strong
                  >{{ mape.toFixed(2) }}% {{ mapeCriteria }}</strong
                ></vs-chip
              >
              <vs-chip color="danger" v-if="mapeCriteria == 'Inaccurate'"
                ><strong
                  >{{ mape.toFixed(2) }}% {{ mapeCriteria }}</strong
                ></vs-chip
              >
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="vx-row">
      <div class="vx-col w-full mb-base">
        <vs-table :data="this.forcastLines" stripe border>
          <template slot="thead">
            <vs-th>Period (t)</vs-th>
            <vs-th>Forcast (f)</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="data[indextr].t">
                {{ data[indextr].t }}
              </vs-td>
              <vs-td :data="data[indextr].f">
                {{ data[indextr].f.toFixed(2) }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </div>

    <div>
      <e-charts
        autoresize
        :options="line"
        theme="ovilia-green"
        ref="line"
        auto-resize
      />
    </div>

    <div class="vx-row">
      <div class="vx-col w-full mb-base text-center">
        <vs-button
          class="mt-2 mr-1"
          color="success"
          type="border"
          icon-pack="feather"
          @click="save()"
          >Save</vs-button
        >
        <vs-button
          class="ml-1 mt-2"
          color="danger"
          type="border"
          icon-pack="refresh-cw"
          @click="reset()"
          >Reset</vs-button
        >
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full mb-base">
        <table width="100%">
          <tr>
            <td>
              <table width="50%">
                <tr>
                  <td width="15%"><strong>Notes :</strong></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td width="15%">Actual</td>
                  <td>:</td>
                  <td>Actual data in month</td>
                </tr>
                <tr>
                  <td width="15%">S' S'' S'''</td>
                  <td>:</td>
                  <td>Single, double, triple smoothing</td>
                </tr>
                <tr>
                  <td width="15%">a</td>
                  <td>:</td>
                  <td>total all smoothing</td>
                </tr>

                <tr>
                  <td width="15%">b c</td>
                  <td>:</td>
                  <td>trend paramter</td>
                </tr>
                <tr>
                  <td width="15%">f</td>
                  <td>:</td>
                  <td>forcast result</td>
                </tr>
                <tr>
                  <td width="15%">e</td>
                  <td>:</td>
                  <td>error value</td>
                </tr>
                <tr>
                  <td width="15%">&Sigma;e</td>
                  <td>:</td>
                  <td>error sum</td>
                </tr>
              </table>
            </td>
            <td>
              <table>
                <tr>
                  <td><strong>MAPE Criteria :</strong></td>
                </tr>
                <tr>
                  <td>Highly Accurate</td>
                  <td>:</td>
                  <td>0% - 10%</td>
                </tr>
                <tr>
                  <td>Accurate</td>
                  <td>:</td>
                  <td>10% - 20%</td>
                </tr>
                <tr>
                  <td>Less Accurate</td>
                  <td>:</td>
                  <td>20% - 50%</td>
                </tr>
                <tr>
                  <td>Inaccurate</td>
                  <td>:</td>
                  <td>> 50%</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </vx-card>
</template>
<script>
import DataTable from "./DataTable.vue";
// import Datepicker from "vuejs-datepicker";

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";

import _ from "lodash";
import vSelect from "vue-select";

import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/chart/line";
import theme from "./theme.json";

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
      alpha: 0.5,
      optionWarehouse: [],
      selectedWarehouse: null,
      optionItem: [],
      selectedItem: null,
      period: null,
      generateLines: [],
      forcastLines: [],
      forcastPeriod: 0,
      mape: 0,
      mapeCriteria: "",
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
        series: [
          {
            type: "line",
            showSymbol: false,
            data: [],
          },
          {
            type: "line",
            showSymbol: false,
            data: [],
          },
        ],
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

    postGenerate() {
      if (!this.selectedWarehouse) {
        this.$vs.notify({
          title: "Error",
          text: "Please select warehouse",
          color: "danger",
          iconPack: "feather",
          icon: "icon-alert-triangle",
        });
        return;
      }
      if (!this.selectedItem) {
        this.$vs.notify({
          title: "Error",
          text: "Please select item",
          color: "danger",
          iconPack: "feather",
          icon: "icon-alert-triangle",
        });
        return;
      }
      if (!this.period) {
        this.$vs.notify({
          title: "Error",
          text: "Please select period",
          color: "danger",
          iconPack: "feather",
          icon: "icon-alert-triangle",
        });
        return;
      }
      if (!this.alpha) {
        this.$vs.notify({
          title: "Error",
          text: "Please input alpha",
          color: "danger",
          iconPack: "feather",
          icon: "icon-alert-triangle",
        });
        return;
      }

      this.$vs.loading();
      this.$http
        .post("/v1/forcasting/generate", {
          warehouse_code: this.selectedWarehouse
            ? this.selectedWarehouse.warehouse_code
            : "",
          item_code: this.selectedItem ? this.selectedItem.item_code : "",
          date_start: this.period
            ? moment(this.period[0]).format("YYYY-MM-DD")
            : null,
          date_end: this.period
            ? moment(this.period[1]).format("YYYY-MM-DD")
            : null,
          alpha: parseFloat(this.alpha),
        })
        .then((resp) => {
          if (resp.code == 200) {
            this.generateLines = resp.data.generate_lines;
            this.forcastLines = resp.data.forcast_lines;
            this.forcastPeriod = resp.data.forcast_period;
            this.mape = resp.data.mape;
            this.mapeCriteria = resp.data.mape_criteria;

            const months = [];

            if (!this.period) {
              this.period = [
                moment(this.period[0]).format("YYYY-MM-DD"),
                moment(this.period[1]).format("YYYY-MM-DD"),
              ];
            }

            const start = moment(this.period[0]).startOf("month");
            const end = moment(this.period[1]).endOf("month");
            while (start.isSameOrBefore(end)) {
              months.push(start.format("YYYY-MM")); // e.g., "2025-05"
              start.add(1, "month");
            }

            var seriesDataActual = [];
            months.forEach((month) => {
              const monthData = this.generateLines.find(
                (line) =>
                  line.year == month.split("-")[0] &&
                  line.month == month.split("-")[1]
              );

              if (monthData) {
                seriesDataActual.push(monthData.qty);
              } else {
                seriesDataActual.push(0); // Default value if not found
              }
            });

            var seriesDataForcast = [];
            months.forEach((month) => {
              const monthData = this.generateLines.find(
                (line) =>
                  line.year == month.split("-")[0] &&
                  line.month == month.split("-")[1]
              );

              if (monthData) {
                seriesDataForcast.push(monthData.f.toFixed(2));
              } else {
                seriesDataForcast.push(0); // Default value if not found
              }
            });

            this.forcastLines.forEach((line) => {
              months.push(start.format("YYYY-MM")); // e.g., "2025-05"
              start.add(1, "month");
              seriesDataForcast.push(line.f.toFixed(2));
            });

            console.log("seriesDataActual", seriesDataActual);
            console.log("seriesDataForcast", seriesDataForcast);
            console.log("months", months);

            this.line.xAxis.data = months;
            this.line.series[0].data = seriesDataActual;
            this.line.series[1].data = seriesDataForcast;

            this.line.series[0].name = "Actual";
            this.line.series[1].name = "Forcast";

            this.line.series[0].type = "line";
            this.line.series[1].type = "line";

            this.line.series[0].smooth = true;
            this.line.series[1].smooth = true;

            this.line.series[0].itemStyle = {
              normal: {
                color: "#7367f0",
              },
            };
            this.line.series[1].itemStyle = {
              normal: {
                color: "#ff9f43",
              },
            };

            this.$vs.loading.close();
            this.$vs.notify({
              title: "Success",
              text: resp.message,
              color: "success",
              iconPack: "feather",
              icon: "icon-check",
            });
          } else {
            this.$vs.loading.close();
            this.$vs.notify({
              title: "Error",
              text: resp.message,
              color: "danger",
              iconPack: "feather",
              icon: "icon-alert-triangle",
            });
          }
        });
    },
    reset() {
      this.data = [];
    },
    save() {
      if (this.generateLines.length == 0) {
        this.$vs.notify({
          title: "Error",
          text: "Please generate data first",
          color: "danger",
          iconPack: "feather",
          icon: "icon-alert-triangle",
        });
        return;
      }

      this.$vs.loading();

      this.$http
        .post("/v1/forcasting/history", {
          warehouse_code: this.selectedWarehouse
            ? this.selectedWarehouse.warehouse_code
            : "",
          warehouse_name: this.selectedWarehouse
            ? this.selectedWarehouse.warehouse_name
            : "",
          item_code: this.selectedItem ? this.selectedItem.item_code : "",
          item_name: this.selectedItem ? this.selectedItem.item_name : "",
          date_start: this.period
            ? moment(this.period[0]).format("YYYY-MM-DD")
            : null,
          date_end: this.period
            ? moment(this.period[1]).endOf("month").format("YYYY-MM-DD")
            : null,
          alpha: parseFloat(this.alpha),
          generate_lines: this.generateLines,
          forcast_lines: this.forcastLines,
          forcast_period: this.forcastPeriod,
          mape: this.mape,
          mape_criteria: this.mapeCriteria,
        })
        .then((resp) => {
          if (resp.code == 200) {
            this.$vs.loading.close();
            this.$vs.notify({
              title: "Success",
              text: resp.message,
              color: "success",
              iconPack: "feather",
              icon: "icon-check",
            });
          } else {
            this.$vs.loading.close();
            this.$vs.notify({
              title: "Error",
              text: resp.message,
              color: "danger",
              iconPack: "feather",
              icon: "icon-alert-triangle",
            });
          }
        });
    },
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

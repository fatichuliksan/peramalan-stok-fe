<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full mb-base">
        <vs-table :data="this.generateLines" stripe border>
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
                {{ data[indextr].year }}</vs-td
              >
              <vs-td :data="data[indextr].month">
                {{ data[indextr].month }}</vs-td
              >
              <vs-td :data="data[indextr].qty"> {{ data[indextr].qty }}</vs-td>
              <vs-td :data="data[indextr].s1">
                {{ data[indextr].s1.toFixed(2) }}</vs-td
              >
              <vs-td :data="data[indextr].s2">
                {{ data[indextr].s2.toFixed(2) }}</vs-td
              >
              <vs-td :data="data[indextr].s3">
                {{ data[indextr].s3.toFixed(2) }}</vs-td
              >
              <vs-td :data="data[indextr].a">
                {{ data[indextr].a.toFixed(2) }}</vs-td
              >
              <vs-td :data="data[indextr].b">
                {{ data[indextr].b.toFixed(2) }}</vs-td
              >
              <vs-td :data="data[indextr].c">
                {{ data[indextr].c.toFixed(2) }}</vs-td
              >
              <vs-td :data="data[indextr].f">
                {{ data[indextr].f.toFixed(2) }}</vs-td
              >
              <vs-td :data="data[indextr].e">
                {{ data[indextr].e.toFixed(2) }}</vs-td
              >
              <vs-td :data="data[indextr].e_sig">
                {{ data[indextr].e_sig.toFixed(2) }}</vs-td
              >
            </vs-tr>
          </template>
        </vs-table>
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
  </div>
</template>
<script>
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/chart/line";
import theme from "./theme.json";

ECharts.registerTheme("ovilia-green", theme);
import moment from "moment";
export default {
  components: {
    ECharts,
  },
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      deleteId: null,
      table: this.tableDefaultState(),
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
      period: null,
      generateLines: [],
      forcastLines: [],
      forcastPeriod: 0,
      mape: 0,
      mapeCriteria: "",
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
  },
  mounted() {
    this.generateLines = this.data.generate_lines;
    this.forcastLines = this.data.forcast_lines;
    this.forcastPeriod = this.data.forcast_period;
    this.mape = this.data.mape;
    this.mapeCriteria = this.data.mape_criteria;

    const months = [];

    if (!this.period) {
      this.period = [moment(this.data.date_start), moment(this.data.date_end)];
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
          line.year == month.split("-")[0] && line.month == month.split("-")[1]
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
          line.year == month.split("-")[0] && line.month == month.split("-")[1]
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
  },
  watch: {
    active() {
     console.log("active", this.active);
    },
  },
  computed: {},
};
</script>

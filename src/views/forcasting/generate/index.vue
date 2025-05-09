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
        <data-table
        :dataGenerated="this.data"></data-table>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full mb-base">
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
            <td></td>
          </tr>
          <tr>
            <td width="15%">a b c</td>
            <td>:</td>
            <td></td>
          </tr>
          <tr>
            <td width="15%">f</td>
            <td>:</td>
            <td></td>
          </tr>
          <tr>
            <td width="15%">e</td>
            <td>:</td>
            <td></td>
          </tr>
          <tr>
            <td width="15%">&Sigma;e</td>
            <td>:</td>
            <td></td>
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
export default {
  components: {
    DatePicker,
    vSelect,
    DataTable,
  },
  data() {
    return {
      alpha: 0.5,
      optionWarehouse: [],
      selectedWarehouse: null,
      optionItem: [],
      selectedItem: null,
      period: null,
      data: [],
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
          alpha: this.alpha,
        })
        .then((resp) => {
          if (resp.code == 200) {
            this.data = resp.data;
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

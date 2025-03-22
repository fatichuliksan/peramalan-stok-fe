<template>
    <date-range-picker style="min-height: 40px" class="w-full" ref="picker" opens="center"
        :locale-data="{ firstDay: 1, format: 'dd Mon yyyy' }" :singleDatePicker="false" :timePicker="false"
        :timePicker24Hour="false" :showWeekNumbers="false" :showDropdowns="false" :autoApply="true" :clear="true"
        v-model="validity" :linkedCalendars="true" :ranges="dateRanges" :maxDate="maxDate">
        <template v-slot:input="picker">
            {{ dateFormat(picker.startDate) }} - {{ dateFormat(picker.endDate) }}
        </template>
    </date-range-picker>
</template>
<script>
import moment from "moment";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";

export default {
    components: {
        DateRangePicker,
    },
    props: {
        value: Object,
    },
    data() {
        return {
            validity: {
                startDate: null,
                endDate: null,
            },
            dateRanges: {
                Today: [new Date(), new Date()],
                Yesterday: [this.getPreviousDay(), this.getPreviousDay()],
                "Last 7 Days": [this.getPreviousWeek(), new Date()],
                "Last 30 Days": [this.getPreviousMonth(), new Date()],
                "Current Month": [this.getMonthStart(), new Date()],
            },
            maxDate: new Date(),
        };
    },
    methods: {
        getPreviousDay() {
            const date = new Date();
            date.setDate(date.getDate() - 1);
            return date;
        },
        getPreviousWeek() {
            const date = new Date();
            date.setDate(date.getDate() - 7);
            return date;
        },
        getPreviousMonth() {
            const date = new Date();
            date.setMonth(date.getMonth() - 1);
            return date;
        },
        getMonthStart() {
            const date = new Date();
            date.setDate(1);
            return date;
        },
        dateFormat(date) {
            let a = null;
            if (date != null) {
                a = moment(date).format("yyyy-MM-DD");
            }
            return a;
        },
    },
    mounted() {
        if (this.value) {
            this.validity = this.value;
        } else {
            const today = new Date();
            this.validity = {
                startDate: today,
                endDate: today,
            };
        }
    },
    watch: {
        validity() {
            let startDate = moment(this.validity.startDate).format("YYYY-MM-DD");
            let endDate = moment(this.validity.endDate).format("YYYY-MM-DD");
            let formatDate = startDate + "," + endDate;
            this.$emit("data", formatDate);
            this.$emit("rangeValue", this.validity);
            this.$emit("selected", this.validity);
        },
    },
};
</script>
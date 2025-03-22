<template>
    <datepicker name="date" :inline="false" v-model="selectedTemp" placeholder="Select Date" :cleared="() => {
        this.selectedTemp = null
    }">
    </datepicker>
</template>
<script>
import Datepicker from "vuejs-datepicker";
import moment from "moment";
export default {
    components: {
        Datepicker,
    },
    props: {
        value: {
            type: Date,
            default: null
        },
        default: {
            type: Boolean,
            default: true
        },
        addDays: {
            type: Number,
            default: 0,
        }
    },
    data() {
        return {
            selected: null,
        };
    },
    methods: {
        getDate(added) {
            var now = moment()
            now.add(added, 'days')
            return now.toDate()
        }

    },
    watch: {
        selected(v) {
            this.$emit("selected", v);
        },
        value(v) {
            if (v) {
                this.selected = v
            }
        }
    },
    computed: {
        selectedTemp: {
            get() {
                return this.selected;
            },
            set(val) {
                this.selected = val
            },
        }
    },

    mounted() {
        if (this.value) {
            this.selected = this.value
        } else {
            if (this.default) {
                this.selected = this.getDate(this.addDays)
            } else {
                this.selected = null
            }
        }
    }
};
</script> 
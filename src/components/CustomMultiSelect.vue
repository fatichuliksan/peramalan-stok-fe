<template>
    <multiselect 
        :multiple="this.multiple" 
        :allowEmpty="this.allowEmpty" 
        @search-change="handleSearch" 
        :label="this.label ? this.label : 'name'"
        :track-by="this.trackBy ? this.trackBy : 'name'"
        :disabled="this.disabled"
        :select-label="''"
        deselect-label=""
        :options="(this.optionsData.length > 0) ? this.optionsData : (this.options != undefined ? this.options : [])"
        v-model="selected" :placeholder="placeholder ? placeholder : `type to search`" />
</template>
<script>

export default {
    components: {
    },
    props: {
        multiple: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String
        },
        label: {
            type: String,
        },
        baseUrl: {
            type: String,
        },
        allowEmpty:{
            type:Boolean,
            default:true,
        },
        trackBy: {
            type: String,
        },
        value: {
        },
        options: {
            required: false
        },
        status: {
            required: false
        },
        selectedItem: {
        }
    },
    data() {
        return {
            typedValue: "",
            timeOuts: null,
            optionsData: [],
            selected: this.value ? this.value : {}
        };
    },
    methods: {
        handleSearch(v) {
            this.typedValue = v;
            if (this.timeOuts) { clearTimeout(this.timeOuts) }
            this.timeOuts = setTimeout(this.get, 400);
        },
        get() {
            console.log('val body', this.selectedItem)
            this.$http
                .get(this.baseUrl, {
                    params: {
                        order: "id",
                        sort: "asc",
                        query: this.typedValue,
                        status: this.status,
                        ids: this.selectedItem,
                    }
                })
                .then(resp => {
                    if (resp.code == 200) {
                        this.optionsData = resp.data.records;
                        if (!this.value && resp.data.default) {
                            this.selected = resp.data.default;
                            this.$emit("selected", resp.data.default);
                        }
                    } else {
                        this.optionsData = [];
                        console.log(resp.data);
                    }
                });
        }

    },
    watch: {
        selected(v) {
            this.selected = v;
            this.$emit("selected", v);
            console.log('value selected', v)
        },
        value(v) {
            if (v) {
                this.selected = v
            }
        },
        selectedItem(v){
            if (v) {
                this.get()
            }
        }
        // body(v) {
        //     this.body = v;
        // },
    },
    mounted() {
        if (this.baseUrl != "" && this.baseUrl != undefined) {
            this.get();
        } else if (this.options.length > 0) {
            this.optionsData = this.options
        }
    }
};
</script>
<style>
.multiselect--above .multiselect__content-wrapper{
    bottom: auto !important;
    top: 100% !important;
}

</style>
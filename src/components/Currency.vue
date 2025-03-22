<template>
    <v-select :multiple="multiple" :filterable="true" :options="options" v-model="selected" :placeholder="placeholder" />
</template>
<script>

import vSelect from "vue-select";
export default {
    components: {
        vSelect,
    },
    props: {
        multiple: {
            type: Boolean,
            default: false,
        },
        draw: {
            type: Number,
        },
        placeholder: {
            type: String
        },
        value: {
            type: String
        }
    },
    data() {
        return {
            baseUrl: "/api/wms/v1/master/currencies",
            options: [],
            selected: (this.multiple) ? [] : null,
            default: null
        };
    },
    methods: {
        get() {
            // this.$vs.loading();
            this.$http
                .get(this.baseUrl, {
                    params: {
                        order: "code",
                        sort: "asc",
                        limit: 99999999
                    }
                })
                .then(resp => {
                    if (resp.code == 200) {
                        var def = resp.data.default.code
                        resp.data.records.map( (x) => {
                            x.label = x.code
                            if (this.value == null && x.code == def){
                                this.selected = x.code
                            }
                            return x;
                        });

                        resp.data.records.forEach(el => {                                
                            this.options.push(el.code)
                        })
                        // this.options = resp.data.records;
                    } else {
                        this.options = []
                        console.log(resp.data);
                    }
                });
        }
    },
    watch: {
        selected(v) {
            this.selected = v;
            this.$emit("selected", v);
        },
        value(v) {
            if (v) {
                this.selected = v
            }
        }
    },
    mounted() {
        this.get();

    }
};
</script>
<template>
    <v-select :multiple="multiple" :filterable="true" :options="options" v-model="selected" :placeholder="placeholder" :disabled="disabled"/>
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
            type: Object
        },
        disabled: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            baseUrl: "/api/wms/v1/master/suppliers",
            options: [],
            selected: (this.multiple) ? [] : null
        };
    },
    methods: {
        get() {
            // this.$vs.loading();
            this.$http
                .get(this.baseUrl, {
                    params: {
                        order: "name",
                        sort: "asc",
                        limit: 99999999
                    }
                })
                .then(resp => {
                    if (resp.code == 200) {
                        resp.data.records.map(function (x) {
                            return (x.label = x.code + " " + x.name);
                        });

                        if (this.multiple) {
                            resp.data.records.unshift({
                                "label": "All",
                                "id": "all"
                            })
                        }

                        this.options = resp.data.records;
                    } else {
                        this.options = []
                        console.log(resp.data);
                    }
                });
        }
    },
    watch: {
        selected(v) {
            console.log("selected supplier ", v)
            this.selected = v;
            let statusAll = false
            if (this.multiple) {
                v.map(function(x) {
                    if (x.id == 'all') {
                        statusAll = true
                    }
                })
            }
            if (statusAll) {
                this.selected = []
                console.log("status all ", statusAll)
                this.$emit("selected", []);
            } else {
                this.$emit("selected", v);
            }
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
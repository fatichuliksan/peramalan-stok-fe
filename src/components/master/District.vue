<template>
  <multiselect
    v-model="selected"
    :options="options"
    placeholder="Type to search"
    label="name"
    track-by="name"
    @search-change="handleSearch"
    :showNoOptions="false"
    :max-height="125"
  >
    <span slot="noResult">Oops! No data found</span>
  </multiselect>
</template>
<script>
export default {
  name: "DistrictComponent",
  props: {
    cityId: {
      type: Number,
    },
    cityName: {
      type: String,
    },
    name: {
      type: String,
    },
    code: {
      type: String,
    },
    id: {
      type: Number,
    },
  },
  data() {
    return {
      selected: null,
      options: [],
      search: "",
      data: {
        id: null,
        cityId: null,
        cityName: null,
        code: "",
        name: "",
      },
      flagInitiate: false,
    };
  },
  methods: {
    handleSearch(query) {
      if (query != "") {
        let q = query.replace(" ", "");
        if (q == "") {
          this.search = q;
        } else {
          this.search = query;
        }
        this.getData();
      }
    },
    getData() {
      let param = {
        length: "all",
        search: this.search,
        city_id: this.data.cityId,
        city_name: this.cityName,
      };

      if (this.flagInitiate && this.data.id) {
        param.district_id = this.data.id;
        this.data.id = null;
      }

      this.$http
        .get("/api/v1/master/district", {
          params: param,
        })
        .then((resp) => {
          this.options = resp.data.records;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setInitiateById() {
      if (this.id) {
        console.log("setInitiateById")
        this.search = "";
        this.flagInitiate = true;
        this.data.id = this.id;
        this.getData();
      }
    },
    setInitiateByName() {
      if (this.name && this.id == null) {
        console.log("setInitiateByName")
        this.flagInitiate = true;
        this.search = this.name;
        this.data.cityName = this.cityName;
        this.getData();
      }
    },
  },
  watch: {
    selected(v) {
      this.options = [];
      if (v) {
        this.options.push(v);
        this.$emit("input", v);
      } else {
        this.$emit("input", {
          id: null,
          city_id: this.cityId,
          code: "",
          name: "",
        });
      }
    },
    options(v) {
      if (this.flagInitiate && v.length > 0) {
        this.selected = v[0];
        this.flagInitiate = false;
      }
    },
    cityId(v) {
      this.data.cityId = v;
      if (this.selected) {
        if (this.selected.city_id != v) {
          this.selected = null;
        }
      }
    },
    id() {
      if (!this.name) {
        this.setInitiateById();
      }      
    },
    name(v) {
      if (v) {
        this.setInitiateByName();
      } else {
        this.selected = null;
      }
    },
  },
  mounted() {},
};
</script>
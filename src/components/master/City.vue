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
  name: "CityComponent",
  props: {
    provinceId: {
      type: Number,
    },
    name: {
      type: String,
    },
    shortName: {
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
      flagInitiate: false,
      data: {
        provinceId: null,
        id: null,
      },
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
        province_id: this.data.provinceId,
      };
      if (this.flagInitiate && this.data.id) {
        param.city_id = this.data.id;
        this.data.id = null;
      }
      this.$http
        .get("/api/v1/master/city", {
          params: param,
        })
        .then((resp) => {
          this.options = resp.data.records;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setInitiateByName() {
      if (this.name && this.id == null) {
        this.flagInitiate = true;
        this.search = this.name;
        this.getData();
      }
    },
    setInitiateById() {
      if (this.id) {
        this.search = "";
        this.flagInitiate = true;
        this.data.id = this.id;
        this.getData();
      }
    },
  },
  watch: {
    selected(v) {
      this.options = [];
      if (v) {
        this.$emit("input", v);
      } else {
        this.$emit("input", {
          id: null,
          province_id: null,
          name: "",
          short_name: "",
        });
      }
    },
    options(v) {
      if (this.flagInitiate && v.length > 0) {
        this.selected = v[0];
        this.flagInitiate = false;
      }
    },
    name(v) {
      if (v) {
        this.setInitiateByName();
      } else {
        this.selected = null;
      }
    },
    provinceId(v) {
      this.data.provinceId = v;
      if (this.selected) {
        if (this.selected.province_id != v) {
          this.selected = null;
        }
      }
    },
    id() {
      this.data.provinceId = null;
      this.setInitiateById();
    },
  },
  mounted() {
    // this.setInitiateByName();
  },
};
</script>
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
  name: "SubdistrictComponent",
  props: {
    cityId: {
      type: Number,
    },
    cityName: {
      type: String,
    },
    districtId: {
      type: Number,
    },
    districtName: {
      type: String,
    },
    name: {
      type: String,
    },
    code: {
      type: String,
    },
    postalCode: {
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
        districtId: null,
        districtName: null,
        code: "",
        name: "",
        postalCode: "",
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
        district_id: this.data.districtId,
        district_name: this.districtName,
        city_id: this.data.cityId,
        city_name: this.cityName,
      };

      if (this.flagInitiate && this.data.id) {
        param.subdistrict_id = this.data.id;
        this.data.id = null;
      }
      this.$http
        .get("/api/v1/master/subdistrict", {
          params: param,
        })
        .then((resp) => {
          this.options = resp.data.records;
          if (this.flagInitiate) {
            if (this.options.length == 0) {
              this.selected = null;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setInitiateByName() {
      if (this.name && this.id == null) {
        this.flagInitiate = true;
        this.search = this.name;
        this.data.cityName = this.cityName;
        this.data.districtName = this.districtName;
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
          district_id: this.districtId,
          code: "",
          name: "",
          postal_code: "",
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
    cityId(v) {
      this.data.cityId = v;
      if (this.selected) {
        if (this.selected.city_id != v) {
          this.selected = null;
        }
      }
    },
    districtId(v) {
      this.data.districtId = v;
      if (this.selected) {
        if (this.selected.district_id != v) {
          this.selected = null;
        }
      }
    },
  },
  mounted() {},
};
</script>
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
  name: "CountryComponent",
  props: {
    name: {
      type: String,
    },
    id: {
      type: Number,
    },
  },
  data() {
    return {
      selected: [],
      options: [],
      search: "",
      data: {
        id: null,
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
      };
      if (this.flagInitiate && this.data.id) {
        param.country_id = this.data.id;
        this.data.id = null;
      }
      this.$http
        .get("/api/v1/master/country", {
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
        this.search = "";
        this.flagInitiate = true;
        this.data.id = this.id;
        this.getData();
      }
    },
    setInitiateByName() {
      if (this.name) {
        this.flagInitiate = true;
        this.search = this.name;
        this.getData();
      }
    },
  },
  watch: {
    options(v) {
      if (this.flagInitiate && v.length > 0) {
        this.selected = v[0];
        this.flagInitiate = false;
      }
    },
    selected(v) {
      this.options = [];
      if (v) {
        this.options.push(v);
        this.$emit("input", v);
      } else {
        this.$emit("input", {
          id: null,
          name: "",
        });
      }
    },
    id(v) {
      if (v) {
        this.setInitiateById();
      } else {
        this.selected = null;
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
  computed: {},
};
</script>
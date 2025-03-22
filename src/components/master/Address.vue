<template>
  <div>
    <div class="vx-row mb-6">
      <div class="vx-col w-full">
        <label class="vs-input--label">Country</label>
        <country-component
          @input="inputCountry"
          :name="country.name"
          :id="country.id"
        ></country-component>
      </div>
    </div>
    <div class="vx-row mb-6">
      <div class="vx-col w-full">
        <label class="vs-input--label">Province</label>
        <province-component
          @input="inputProvince"
          :name="province.name"
          :id="province.id"
          :countryId="country.id"
        ></province-component>
      </div>
    </div>
    <div class="vx-row mb-6">
      <div class="vx-col w-full">
        <label class="vs-input--label">City</label>
        <city-component
          @input="inputCity"
          :id="city.id"
          :name="city.name"
          :shortName="city.shortName"
          :provinceId="province.id"
        ></city-component>
      </div>
    </div>
    <div class="vx-row mb-6">
      <div class="vx-col w-full">
        <label class="vs-input--label">District</label>
        <district-component
          @input="inputDistrict"
          :id="district.id"
          :code="district.code"
          :name="district.name"
          :cityId="city.id"
          :cityName="city.name"
        ></district-component>
      </div>
    </div>
    <div class="vx-row mb-6">
      <div class="vx-col w-full">
        <label class="vs-input--label">Subdistrict</label>
        <subdistrict-component
          @input="inputSubistrict"
          :id="subdistrict.id"
          :name="subdistrict.name"
          :code="subdistrict.code"
          :postalCode="subdistrict.postalCode"
          :cityId="city.id"
          :cityName="city.name"
          :districtId="district.id"
          :districtName="district.name"
        ></subdistrict-component>
      </div>
    </div>
    <div class="vx-row mb-6">
      <div class="vx-col w-full">
        <vs-input
          class="w-full"
          label="Address"
          v-model="mutableData.address"
          v-validate="'required'"
          name="Address"
        />
        <span class="text-danger text-sm" v-show="errors.has('Address')">{{
          errors.first("Address")
        }}</span>
      </div>
    </div>
    <div class="vx-row mb-6">
      <div class="vx-col w-full">
        <vs-input
          class="w-full"
          label="Postal Code"
          v-model="mutableData.postalCode"
          v-validate="'numeric'"
          name="PostalCode"
        />
        <span class="text-danger text-sm" v-show="errors.has('PostalCode')">{{
          errors.first("PostalCode")
        }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import CountryComponent from "@/components/master/Country";
import ProvinceComponent from "@/components/master/Province";
import CityComponent from "@/components/master/City";
import DistrictComponent from "@/components/master/District";
import SubdistrictComponent from "@/components/master/Subdistrict";
export default {
  components: {
    CountryComponent,
    ProvinceComponent,
    CityComponent,
    DistrictComponent,
    SubdistrictComponent,
  },
  props: {
    data: Object,
  },
  data() {
    return {
      mutableData: {
        address: "",
        postalCode: "",
      },
      country: {
        id: null,
        name: "",
      },
      province: {
        id: null,
        countryId: null,
        name: "",
      },
      city: {
        id: null,
        provinceId: null,
        name: "",
        shortName: "",
      },
      district: {
        id: null,
        cityId: null,
        code: "",
        name: "",
      },
      subdistrict: {
        id: null,
        cityId: null,
        districId: null,
        code: "",
        name: "",
        postalCode: "",
      },
    };
  },
  methods: {
    inputCountry(value) {
      this.country.id = value.id;
      this.country.name = value.name;
    },
    inputProvince(value) {
      this.province.id = value.id;
      this.province.countryId = value.country_id;
      this.province.name = value.name;
      if (this.country.id != value.country_id) {
        this.country.id = value.country_id;
      }
    },
    inputCity(value) {
      // console.log(value.name)
      this.city.id = value.id;
      this.city.provinceId = value.province_id;
      this.city.name = value.name;
      this.city.shortName = value.short_name;
      if (this.province.id != value.province_id) {
        this.province.id = value.province_id;
      }
    },
    inputDistrict(value) {
      this.district.id = value.id;
      this.district.cityId = value.city_id;
      this.district.name = value.name;
      this.district.code = value.code;
      if (this.city.id != value.city_id) {
        this.city.id = value.city_id;
      }
    },
    inputSubistrict(value) {
      this.subdistrict.id = value.id;
      this.subdistrict.cityId = value.city_id;
      this.subdistrict.districId = value.district_id;
      this.subdistrict.name = value.name;
      this.subdistrict.code = value.code;
      this.subdistrict.postalCode = value.postal_code;
      this.mutableData.postalCode = value.postal_code;
      // if (this.district.id != value.district_id) {
      //   this.district.id = value.district_id;
      // }
      // if (this.city.id != value.city_id) {
      //   this.city.id = value.city_id;
      // }

      if (value.district_id) {
        this.district.id = value.district_id;
      }
      if (value.city_id) {
        this.city.id = value.city_id;
      }
    },
    setMutableData() {
      this.mutableData.address = this.data.address;
      this.mutableData.postalCode = this.data.postalCode;
      this.country.name = this.data.countryName;
      this.province.name = this.data.provinceName;
      this.city.name = this.data.cityName;
      this.district.name = this.data.districtName;
      this.subdistrict.name = this.data.subdistrictName;
    },
    emitData() {
      this.$emit("data", {
        address: this.mutableData.address,
        postalCode: this.mutableData.postalCode,
        countryName: this.country.name,
        provinceName: this.province.name,
        cityName: this.city.name,
        districtName: this.district.name,
        subdistrictName: this.subdistrict.name,
      });
    },
  },
  mounted() {
    this.setMutableData();
  },
  watch: {
    mutableData: {
      deep: true,
      handler() {
        this.emitData();
      },
    },
    "country.name": {
      deep: true,
      handler() {
        this.emitData();
      },
    },
    "province.name": {
      deep: true,
      handler() {
        this.emitData();
      },
    },
    "city.name": {
      deep: true,
      handler() {
        this.emitData();
      },
    },
    "district.name": {
      deep: true,
      handler() {
        this.emitData();
      },
    },
    "subdistrict.name": {
      deep: true,
      handler() {
        this.emitData();
      },
    },
    data: {
      deep: true,
      handler() {
        this.setMutableData();
      },
    },
  },
};
</script>
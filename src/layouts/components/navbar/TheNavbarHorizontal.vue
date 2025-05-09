<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="relative">
    <div class="vx-navbar-wrapper navbar-full p-0">
      <vs-navbar
        class="navbar-custom navbar-skelton"
        :class="navbarClasses"
        :style="navbarStyle"
        :color="navbarColor"
      >
        <!-- <router-link v-if="navbar!=undefined" :data="navbar" tag="div" to="/" class="vx-logo cursor-pointer flex items-center ">
        <logo class="w-10 mr-4 fill-current text-primary" />
        <img id="logo_company" style="max-width: 40px; max-height: auto" :src="urlLogo">
        <span class="vx-logo-text text">{{ navbar==undefined?'ZestHub':navbar.company_name }}</span>
        <span class="ml-4">{{ navbar==undefined?'ZestHub':navbar.territory }}</span>
      </router-link>
      <router-link v-else  tag="div" to="/" class="vx-logo cursor-pointer flex items-center ">
        <logo class="w-10 mr-4 fill-current text-primary" />
        <img style="max-width: 40px; max-height: auto" :src="urlLogo">
        <span class="vx-logo-text text">{{ navbar==undefined?'ZestHub':navbar.company_name }}</span>
        <span class="ml-4">{{ navbar==undefined?'ZestHub':navbar.territory }}</span>
      </router-link> -->

        <router-link
          tag="div"
          to="/"
          class="vx-logo cursor-pointer flex items-center"
        >
          <!-- <logo class="w-10 mr-4 fill-current text-primary" /> -->
          <img style="max-width: 40px; max-height: auto" :src="urlLogo" />
          <span class="vx-logo-text text">Warehouse Stock Forcast</span>
        </router-link>

        <div class="mx-auto"></div>

        <!-- <bookmarks :navbarColor="navbarColor" v-if="windowWidth >= 992" /> -->

        <!-- <search-bar /> -->

        <!-- <notification-drop-down /> -->

        <!-- <div style="padding-right: 10px">
          <i18n />
        </div>
        <profile-drop-down /> -->
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import Bookmarks from "./components/Bookmarks.vue";
import SearchBar from "./components/SearchBar.vue";
import ProfileDropDown from "./components/ProfileDropDown.vue";
import Logo from "../Logo.vue";
import I18n from "./components/I18n.vue";
export default {
  name: "the-navbar-horizontal",
  props: {
    logo: { type: String },
    navbarType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      navbar: [],
    };
  },
  components: {
    Logo,
    I18n,
    Bookmarks,
    SearchBar,
    ProfileDropDown,
  },
  computed: {
    urlLogo: function () {
      // return this.$userLogin.company_logo;
      return "";
    },
    navbarColor() {
      let color = "#fff";
      if (this.navbarType === "sticky") color = "#f7f7f7";
      else if (this.navbarType === "static") {
        if (this.scrollY < 50) {
          color = "#f7f7f7";
        }
      }

      this.isThemedark === "dark"
        ? color === "#fff"
          ? (color = "#10163a")
          : (color = "#262c49")
        : null;

      return color;
    },
    isThemedark() {
      return this.$store.state.theme;
    },
    navbarStyle() {
      return this.navbarType === "static"
        ? { transition: "all .25s ease-in-out" }
        : {};
    },
    navbarClasses() {
      return this.scrollY > 5 && this.navbarType === "static"
        ? null
        : "d-theme-dark-light-bg shadow-none";
    },
    scrollY() {
      return this.$store.state.scrollY;
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
  },
  mounted() {
    this.navbar = this.$userLogin;
    // this.$http
    // .get("/api/v1/setting/user-personal").then(
    //   resp => {
    //     this.navbar = resp.data
    //   });
  },
};
</script>
<style scoped>
.text {
  font-size: 22px;
  font-weight: 400;
  padding-left: 5px;
}
</style>

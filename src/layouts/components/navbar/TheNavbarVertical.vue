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
    <div class="vx-navbar-wrapper" :class="classObj">
      <vs-navbar
        class="vx-navbar navbar-custom navbar-skelton"
        :color="navbarColorLocal"
        :class="textColor"
      >
        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon
          class="p-2 cursor-pointer sm:inline-flex xl:hidden"
          icon="MenuIcon"
          @click.stop="showSidebar"
        />

        <!-- <bookmarks :navbarColor="navbarColor" v-if="windowWidth >= 992" /> -->

        <vs-spacer />

        <search-bar />

        <!-- <notification-drop-down /> -->

        <profile-drop-down />
      </vs-navbar>
    </div>
  </div>
</template>


<script>
import Bookmarks from "./components/Bookmarks.vue";
import SearchBar from "./components/SearchBar.vue";
import ProfileDropDown from "./components/ProfileDropDown.vue";

export default {
  name: "the-navbar-vertical",
  props: {
    navbarColor: {
      type: String,
      default: "#fff"
    }
  },
  components: {
    Bookmarks,
    SearchBar,
    ProfileDropDown
  },
  computed: {
    navbarColorLocal() {
      return this.$store.state.theme === "dark" && this.navbarColor === "#fff"
        ? "#10163a"
        : this.navbarColor;
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth;
    },
    textColor() {
      return {
        "text-white":
          (this.navbarColor != "#10163a" &&
            this.$store.state.theme === "dark") ||
          (this.navbarColor != "#fff" && this.$store.state.theme !== "dark")
      };
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },

    // NAVBAR STYLE
    classObj() {
      if (this.verticalNavMenuWidth == "default") return "navbar-default";
      else if (this.verticalNavMenuWidth == "reduced") return "navbar-reduced";
      else if (this.verticalNavMenuWidth) return "navbar-full";
      else return "navbar-full";
    }
  },
  methods: {
    showSidebar() {
      this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", true);
    }
  }
};
</script>


<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    class="h-screen w-full bg-img vx-row no-gutter items-center justify-center"
  >
    <div
      class="w-full bg-img vx-row no-gutter items-center justify-center"
      id="page-login"
    >
      <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
        <vx-card>
          <div slot="no-body" class="full-page-bg-color">
            <div class="vx-row no-gutter justify-center items-center">
              <div class="vx-col hidden lg:block lg:w-1/2">
                <img
                  src="@/assets/images/pages/logo-wms-new.png"
                  alt="login"
                  class="mx-auto"
                />
              </div>

              <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
                <div class="p-8 login-tabs-container">
                  <div class="vx-card__title mb-4">
                    <h4 class="mb-4">Login</h4>
                    <p>Welcome back, please login to your account.</p>
                  </div>

                  <div>
                    <!--
                     v-on:keyup.enter="login"
                     ketika melakukan `enter` didalam tag form 
                     maka akan menjalankan fungsi login
                  -->
                    <form v-on:keyup.enter="login()">
                      <!--
                     name: nama text field
                     icon-no-border => mehilangkan border diantara textfield dan icon
                     icon: icon yang akan ditampilkan
                     icon-pack: ["feather"]
                     label-placeholder: placeholder
                     v-model: digunakan untuk menyimpan nilai yg diinputkan oleh user atau inisialisasi awal (data) dan ditampilkan di textfield
                     v-validate: [required|email|min:3'] (berdasarkan name)
                  -->
                      <vs-input
                        name="email"
                        icon-no-border
                        icon="icon icon-user"
                        icon-pack="feather"
                        label-placeholder="Email"
                        v-model="email"
                        class="w-full"
                        v-validate="'required|email|min:3'"
                      />
                      <!--
                    menampilkan pesan error jika v-validate tidak sesuai (berdasarkan name)
                  -->
                      <span class="text-danger text-sm">{{
                        errors.first("email")
                      }}</span>
                      <vs-input
                        type="password"
                        name="password"
                        icon-no-border
                        icon="icon icon-lock"
                        icon-pack="feather"
                        label-placeholder="Password"
                        v-model="password"
                        class="w-full mt-6"
                        v-validate="'required|min:2|max:30'"
                      />
                      <span class="text-danger text-sm">{{
                        errors.first("password")
                      }}</span>
                    </form>
                    <div class="flex flex-wrap justify-between my-5">
                      <vs-button
                        class="float-right"
                        :disabled="!validateForm"
                        @click="login()"
                        >Login</vs-button
                      >
                      <!-- <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox> -->
                      <router-link to="">Forgot Password?</router-link>
                    </div>
                    <!-- <vs-button  type="border">Register</vs-button> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
    </div>
    <footer class="the-footer flex flex-end">
      <p>
        <span>COPYRIGHT &copy;</span>
        <span>{{ new Date().getFullYear() }} </span>
        <a href="#" target="_blank" rel="nofollow">zestHUB Digital Platform</a>
        <span class="hidden sm:inline-block">, All rights Reserved</span>
        |
        <a
          href="https://zesthub.com/privacy-policy"
          target="_blank"
          rel="nofollow"
          >Privacy Policy</a
        >
        &nbsp;&nbsp;
      </p>
      <p>{{ version }} / {{ hostname }}</p>
    </footer>
  </div>
</template>

<script>
import Vue from "vue";
import { uuid } from "vue-uuid";

export default {
  data() {
    return {
      email: "",
      password: "",
      checkbox_remember_me: false,
      version: process.env.VUE_APP_GIT_VERSION,
      hostname: Vue.$cookies.get("hostname-api"),
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.email != "" && this.password != "";
    },
  },
  mounted() {
    if (!this.$cookies.get("device_id")) {
      Vue.$cookies.set("device_id", uuid.v1());
    }
    if (this.$cookies.get("token")) {
      this.$router.push("/");
    }
  },
  methods: {
    login: function () {
      this.$store.dispatch("user/destroyUserPersonal");
      if (!this.validateForm) {
        this.$vs.notify({
          color: "danger",
          title: "Gagal",
          text: "Lengkapi input",
          position: "top-right",
          iconPack: "feather",
          icon: "icon-x-circle",
        });
      } else {
        this.$vs.loading();
        const payload = {
          checkbox_remember_me: this.checkbox_remember_me,
          userDetails: {
            email: this.email,
            password: this.password,
          },
          notify: this.$vs.notify,
          closeAnimation: this.$vs.loading.close,
        };
        this.$store.dispatch("auth/loginAttempt", payload);
      }
    },
  },
};
</script>

<style lang="scss">
#page-login {
  .social-login-buttons {
    .bg-facebook {
      background-color: #1551b1;
    }
    .bg-twitter {
      background-color: #00aaff;
    }
    .bg-google {
      background-color: #4285f4;
    }
    .bg-github {
      background-color: #333;
    }
  }
}
</style>

<template>
  <div class="the-navbar__user-meta flex items-center" v-if="user.user_name">
    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ user.user_name }}</p>
      <small>{{ user.work_group_name }}</small>
    </div>
    <vs-dropdown vs-custom-content class="cursor-pointer">
      <div class="con-img ml-3">
        <img
          v-if="
            this.$userLogin != undefined &&
            this.$userLogin.avatar != 'default.png' &&
            this.$userLogin.avatar != ''
          "
          key="onlineImg"
          :src="urlAvatar"
          alt="user-img"
          width="40"
          height="40"
          class="rounded-full shadow-md cursor-pointer block"
        />
        <vs-avatar
          v-else
          color="success"
          size="large"
          :text="this.avatarDefault"
        >
        </vs-avatar>
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="profile"
          >
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Profile</span>
          </li>

          <!-- <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="MailIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Inbox</span>
          </li>

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Tasks</span>
          </li>

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="MessageSquareIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Chat</span>
          </li>

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="HeartIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Wish List</span>
          </li>-->

          <template v-if="apps.length != 0">
            <vs-divider class="m-1" />

            <li
              v-for="app in apps"
              :key="app.id"
              class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
              @click="switchApp(app)"
            >
              <feather-icon icon="LayoutIcon" svgClasses="w-4 h-4" />
              <span class="ml-2">{{ app.name }}</span>
            </li>
          </template>

          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout"
          >
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      avatarDefault: "",
      apps: [],
    };
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
    urlAvatar: function () {
      return this.$userLogin.avatar;
    },
  },
  mounted() {
    this.apps = this.$store.state.user.apps;
    if (this.$userLogin === undefined) {
      this.user = {
        name: "Zest Hub",
        work_group_name: "Zest",
      };
      this.avatarDefault = this.firstLetter("Zest Hub");
      document.getElementById("favicon").href =
        this.cdn + "company/icon/default.png";
      document.getElementById("titleZest").innerHTML = "ZEST Hub";
    } else {
      this.user = this.$userLogin;
      if (
        this.$userLogin.avatar == "default.png" ||
        this.$userLogin.avatar == null ||
        this.$userLogin.avatar == ""
      ) {
        this.avatarDefault = this.firstLetter(this.$userLogin.user_name);
      }
      document.getElementById("favicon").href = this.$userLogin.favicon;

      document.getElementById("titleZest").innerHTML =
        "ZEST - " + this.$userLogin.company_name;
    }
  },
  methods: {
    logout() {
      // this.$userLogin = {}
      this.$http
        .get("/api/v1/logout/" + this.$cookies.get("log_login_id"))
        .then((resp) => {
          this.$store.dispatch("user/destroyUserPersonal");
          this.$cookies.remove("token");
          this.$cookies.remove("log_login_id");
          this.$router.push("/pages/login").catch(() => {});
        })
        .catch((error) => {
          console.log(error);
        });
    },
    profile() {
      this.$router.push("/profile/profile");
    },
    firstLetter(string) {
      if (string) {
        let new_string = string.replace(/[^,\w\s]/g, "");
        new_string = new_string.split(" ");
        let avatar = "";
        for (var x in new_string) {
          if (new_string[x] != "") {
            avatar = avatar + new_string[x][0];
          }
          if (avatar.length == 2) {
            return avatar.toUpperCase();
          }
        }
        return avatar.toUpperCase();
      } else {
        return this.firstLetter("Zest Hub");
      }
    },

    switchApp(app) {
      window.open(
        app.url +
          "/auth/callback?code=" +
          this.$store.state.user.sessionToken +
          "&source_app_id=" +
          process.env.VUE_APP_ID,
        "_blank"
      );
    },
  },
};
</script>
<style>
.vs-avatar--text {
  font-size: xx-large;
}
</style>

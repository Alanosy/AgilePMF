<template>
  <div class="navbar" >
    <div
      style="width:100%;height:66px;box-shadow: rgb(0 21 41 / 9%) 0px 1px 4px;}"
    >
      <hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />

      <breadcrumb class="breadcrumb-container" />

      <div class="right-menu">
        <div
          class="avatar-wrapper"
          style="display: flex; justify-content: center; align-items: center;margin-right: 10px;padding: 0 10px;"
          @click="drawer = true"
        >

          <el-avatar icon="el-icon-user-solid"  style="margin-top: 5px"  :src="userInfo.avater"></el-avatar>
          <i class="el-icon-caret-bottom" @click="drawer = true" />
        </div>
   
      </div>
    </div>
    <el-drawer
      :visible.sync="drawer"
      title="项目列表"
      size="18%"
    >
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="2"  @click="goToTeam">
          <span slot="title" @click="goToTeam">我到团队</span>
        </el-menu-item>
        <el-menu-item index="3" @click="goToAccount">
          <span slot="title"  @click="goToAccount">我的账号</span>
        </el-menu-item>
        <el-menu-item @click.native="logout">
          <span slot="title">退出登录</span>
        </el-menu-item>

      </el-menu>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { getToken } from "@/utils/auth";
import { parseJwt,getTokenInfo } from "@/utils/jwtUtils";
export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      token:null,
      userInfo:null,
      drawer: false,
      direction: "rtl",
      user: {},
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "tags"]),
  },
  created() {
    this.token = getToken();
    this.userInfo = getTokenInfo();
    console.log(this.userInfo)
    this.decode();
    console.log(this.tags);
  },
  methods: {
      goToAccount() {

       this.$router.push({ name: "account"})
       this.drawer = false;
    },
    goToTeam() {
       this.$router.push({ name: "team"})
       this.drawer = false;
    },
    decode() {
      const token = getToken();
      const user = parseJwt(token);
      this.user = JSON.parse(user.userInfo);
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      this.$store.dispatch("logoutUser");
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tag {
  background-color: #ffffff;
  border-color: #cacaca;
  display: inline-block;
  height: 32px;
  padding: 0 10px;
  line-height: 30px;
  margin-left: 5px;
  font-size: 12px;
  color: #000000;
  border-width: 1.5px;
  border-style: solid;
  border-radius: 3px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
}

.active {
  background-color: #58b289;
  color: rgb(255, 255, 255);
}

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 16%);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

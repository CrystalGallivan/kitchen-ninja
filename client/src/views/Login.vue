<template>
  <div class="login container">
    <!-- Login Model -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div v-if="kitchens.length > 0" class="modal-body">
            <label for="#kitchenSelector">Kitchen</label>
            <select v-model="kitchen" @change="selectKitchen($event)" id="kitchenSelector" class="form-control"
              placeholder="Kitchen" required>
              <option disabled value="">Choose Kitchen</option>
              <option v-for="kitchen in kitchens" :value="kitchen">{{
                kitchen.name
                }}</option>
            </select>
          </div>
          <div v-else-if="user._id && !site._id" class="modal-body">
            <label for="#owned">Owned Sites</label>
            <select v-model="siteId" @change="selectSite($event)" id="owned" class="form-control mySite-input"
              placeholder="Owner" required>
              <option disabled value="">Choose Site</option>
              <option v-for="mySite in mySites" :value="mySite._id">{{
                mySite.name
                }}</option>
            </select>
            <label class="mt-2" for="#member">Team Member</label>
            <select v-model="siteId" id="member" @change="selectSite($event)" class="form-control myMember-input"
              placeholder="Team Member" required>
              <option disabled value="">Choose Site</option>
              <option v-for="memberSite in memberSites" :value="memberSite._id">{{ memberSite.name }}</option>
            </select>
          </div>

          <div v-else class="modal-body">
            <form @submit.prevent="loginUser">
              <div class="modalform-group">
                <label for="loginInputEmail1">Email address</label>
                <input v-model="creds.email" type="email" class="form-control" id="loginInputEmail1"
                  aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div class="modal-form-group mt-2">
                <label for="loginInputPassword1">Password</label>
                <input v-model="creds.password" type="password" class="form-control" id="loginInputPassword1"
                  placeholder="Password" />
              </div>
              <div v-if="wrongCreds == true" class="modal-form-group">
                <small id="wrongCredsError" class="form-text">
                  **Incorrect Email or Password!**
                </small>
              </div>
              <button type="submit" class="btn btn-primary mt-3">Login</button>
            </form>
          </div>

          <div class="modal-footer">

            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <screen-selection />
        <!-- <all-site-selector /> -->
      </div>
    </div>
    <!-- Register New User Form -->
    <div class="row">
      <div class="card d-inline-flex col-4 offset-4" id="registerForm">
        <form @submit.prevent="registerUser">
          <img src="../assets/KitchenNinjaLogoColor.png" alt="Kitchen Ninja" id="kitchen-ninja-logo" />
          <h3 id="title-kitchen-ninja">Kitchen Ninja</h3>
          <div class="form-group mt-2">
            <label for="userNameInput">User Name</label>
            <input v-model="registerForm.name" type="name" class="form-control" id="userNameInput"
              placeholder="User Name" />
          </div>
          <div class="form-group">
            <label for="registerInputEmail1">Email address</label>
            <input v-model="registerForm.email" type="email" class="form-control" id="registerInputEmail1"
              aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="registerInputPassword1">Password</label>
            <input v-model="registerForm.password" type="password" class="form-control" id="registerInputPassword1"
              placeholder="Password" />
            <small id="emailHelp" class="form-text text-muted">Password Must be at least 6 Characters</small>
          </div>

          <button type="submit" class="btn btn-primary mb-1">
            Create Account
          </button>
          <button type="button" class="btn btn-outline-secondary ml-1 mb-1" data-toggle="modal"
            data-target="#exampleModal">
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import ScreenSelection from "@/views/screens/ScreenSelection.vue";
  import SiteSelector from "@/components/SiteSelector.vue";
  // import AllSiteSelector from "@/components/AllSiteSelector.vue";
  import KitchenSelector from "@/components/KitchenSelector.vue";

  export default {
    name: "Login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: "",
        },
        registerForm: {
          name: "",
          email: "",
          password: "",
        },
        siteId: "",
        kitchen: "",
      };
    },
    methods: {
      loginUser() {
        this.$store.dispatch("login", this.creds);
      },
      registerUser() {
        this.$store.dispatch("register", this.registerForm);
      },
      selectKitchen(e) {
        this.$store.dispatch("setActiveKitchen", this.kitchen);
        $("#exampleModal").modal("hide");
        $(".modal-backdrop").remove();
      },
      selectSite(e) {
        let site = e.target.value;
        this.$store.dispatch("selectSite", this.siteId);
      },
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      wrongCreds() {
        return this.$store.state.wrongCreds
      },
      site() {
        return this.$store.state.site;
      },
      mySites() {
        return this.$store.state.userSites.mySites;
      },
      memberSites() {
        return this.$store.state.userSites.memberSites;
      },
      activeSite() {
        return this.$store.state.activeSite;
      },
      kitchens() {
        return this.$store.state.kitchens;
      },
    },
    components: {
      ScreenSelection,
      // AllSiteSelector,
      SiteSelector,
      KitchenSelector,
    },
  };
</script>

<style scoped>
  .modal {
    color: black;
  }

  #kitchen-ninja-logo {
    max-height: 25%;
    max-width: 25%;
  }

  #title-kitchen-ninja {
    font-family: "Courgette", cursive;
  }

  .card {
    padding: 15px;
    margin-bottom: 50px;
    color: black;
  }

  #wrongCredsError {
    margin-top: 12px;
    margin-bottom: 12px;
    font-size: 15px;
    color: red;
    font-weight: bolder;
  }
</style>
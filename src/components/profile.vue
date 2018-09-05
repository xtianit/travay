<template>
  <div>

    <vue-grid>
      <vue-grid-row>
        <vue-grid-item fill>
          <h1>Profile</h1>
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <vue-panel>

            <vue-panel-body
              v-for="user in users"
              :key="user.uid">
              <p>{{ user.name || user.displayName }}</p>
              <!--<p>{{ user.phone || null }}</p>-->
              <!--<p>{{ user.address || null }}</p>-->
              <p>{{ user.country || null }}</p>

              <form @submit.prevent="updateProfile()">
                <vue-grid-row>
                  <vue-grid-item>
                    <vue-input
                      name="mobile"
                      id="mobile"
                      required
                      placeholder="Mobile"
                      validation="required"
                      type="tel"
                      v-model="form.mobile"/>
                  </vue-grid-item>
                </vue-grid-row>

                <vue-button primary
                            :loading="isLoading"
                            @click="updateProfile()">
                  {{ $t('App.profile.updateProfile' /* Update Profile */) }}
                </vue-button>
              </form>
            </vue-panel-body>
          </vue-panel>
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <vue-accordion multiple>
            <vue-accordion-item title="Incomplete Jobs">
              <div
                v-for="(item, index) in incompleteJobs"
                :key="item.taskId + index">
                <p>{{item.task}}</p>
              </div>
            </vue-accordion-item>

            <vue-accordion-item title="Completed Jobs">
              <div
                v-for="(item, index) in completedJobs"
                :key="item.taskId + index">
                <p>{{item.task}}</p>
              </div>
            </vue-accordion-item>

            <vue-accordion-item title="Canceled Jobs">
              <div
                v-for="(item, index) in canceledJobs"
                :key="item.taskId + index">
                <p>{{item.task}}</p>
              </div>
            </vue-accordion-item>

            <vue-accordion-item title="Jobs You're Managing">
              <div
                v-for="(item, index) in managingJobs"
                :key="item.taskId + index">
                <p>{{item.task}}</p>
              </div>
            </vue-accordion-item>

            <vue-accordion-item
              title="Jobs You're Evaluating">
              <div
                v-for="(item, index) in evaluatingJobs"
                :key="item.taskId + index">
                <p>{{item.task}}</p>
              </div>
              <template>

              </template>
            </vue-accordion-item>

            <vue-accordion-item title="Jobs You've Sponsored">
              <div
                v-for="(item, index) in sponsored"
                :key="item.sponsoredId + index">
                <p>{{item.task}}</p>
              </div>
            </vue-accordion-item>

          </vue-accordion>
        </vue-grid-item>
      </vue-grid-row>

    </vue-grid>

  </div>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex';
  import db from "../firebaseinit";
  import * as firebase from 'firebase';
  import 'firebase/firestore';
  import * as types from '../store/types'
  import truffleContract from "truffle-contract";
  import EscrowContract from "../../contracts/build/contracts/Escrow"
  import {store} from '../store';
  import SignInModal from '../services/SignInModal';

  export default {
    metaInfo: {
      title: "Your Profile in Travay",
      meta: [
        {
          name: "Profile",
          content: "Your Profile in Travay"
        }
      ]
    },
    name: "Profile",
    $_veeValidate: {
      validator: 'new'
    },
    data() {
      return {
        isLoading: false,
        sponsored: false,
        isEditing: false,
        job: {},
        jobs: {},
        users: {},
        incompleteJobs: [],
        completedJobs: [],
        evaluatingJobs: [],
        managingJobs: [],
        canceledJobs: [],
        form: {
          mobile: '',
        },
      };
    },
    computed: {
      ...mapGetters({
        userId: types.GET_USER_ID
      }),
      ...mapGetters('jobs', []),
      ...mapGetters({
        userId: types.GET_USER_ID,
        isSignInModalOpen: types.IS_SIGNIN_MODAL_OPEN
      })
    },
    methods: {
      ...mapActions({
        openLoginModal: types.OPEN_LOGIN_MODAL,
        saveUserInStorage: types.SAVE_USER_IN_STORAGE
      }),
      onSubmit() {
        this.isLoading = true;
        console.log(JSON.parse(JSON.stringify(this.form)));
        this.$nextTick(() => {
          setTimeout(() => {
            this.isLoading = false;
            addNotification({
              title: "Data has been saved!",
              text: "Have a look at the console!"
            }, INotification);
          }, 500);
        });
      },
      updateProfile() {
        const form = this.form;
        db
          .collection("users")
          .where("uid", "==", this.userId)
          .get()
          .update({
            "phone": form.mobile
          })
      },
      getJobs() {
        return db
          .collection("jobs")
          .where("role.0", "==", this.userId)
          .get()
          .then(snapshot => {
            const jobs = [];
            const incompleteJobs = [];
            const completedJobs = [];
            const evaluatingJobs = [];
            const managingJobs = [];
            const canceledJobs = [];
            snapshot.forEach(item => {
              const job = item.data();

              if (job.status.state === "completed") {
                completedJobs.push(job);
              } else if (job.status.state === "cancelled") {
                canceledJobs.push(job);
              } else {
                incompleteJobs.push(job);
              }

              if (job.role[0] === this.userId) {
                managingJobs.push(job);
              }

              if (job.role[1] === this.userId) {
                evaluatingJobs.push(job);
              }
            });
            this.incompleteJobs = incompleteJobs;
            this.completedJobs = completedJobs;
            this.evaluatingJobs = evaluatingJobs;
            this.managingJobs = managingJobs;
            this.canceledJobs = canceledJobs;
            Promise.resolve(true);
          });
      },
      getUser() {
        return db
          .collection("users")
          .where("uid", "==", this.userId)
          .get()
          .then(snapshot => {
            const users = [];
            snapshot.forEach(item => {
              users.push(item.data());
            });
            this.users = users;
            Promise.resolve(true);
          });
      },
      getSponsored() {
        return db
          .collection("sponsored")
          .where("userId", "==", this.userId)
          .get()
          .then(snapshot => {
            const sponsored = [];
            snapshot.forEach(item => {
              sponsored.push(item.data());
            });
            this.sponsored = sponsored;
            Promise.resolve(true);
          });
      },
      async prepareData() {
        this.isLoading = true;
        try {
          await Promise.all([
            this.getUser(),
            this.getJobs(),
            this.getSponsored()
          ]);
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false;
        }
      }
    },
    created() {
      this.prepareData();
      try {
        const userData = localStorage.getItem('userData');
        if (userData) {
          this.saveUserInStorage(JSON.parse(userData));
        }
      } catch (err) {
        console.log('err when trying to get user data from storage', err);
      }
    }
  };
</script>

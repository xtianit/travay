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
              <p>{{ user.email || null }}</p>
              <p>{{ user.phone || null }}</p>
              <!--<p>{{ user.address || null }}</p>-->
              <p>{{ user.country || null }}</p>
              <br>

              <p>
                <a @click.prevent.stop="e => {}">
                  <i class="fa edit-icon" :class="isEditingProfile ? 'fa-times' : 'fa-edit'"
                     @click="isEditingProfile = !isEditingProfile"></i>
                  {{ !isEditingProfile ? $t('App.job.notEditingProfileIcon' /* Edit Profile */) :
                  $t('App.job.editProfileIcon' /* Editing Profile */)}}
                </a>
              </p>

              <template v-if="isEditingProfile">
                <form @submit.prevent="updateProfile()">

                  <p>{{ $t('App.profile.updateProfile' /* Update mobile number. */) }}</p>

                  <vue-grid-row>
                    <vue-grid-item>
                      <vue-input type="text" name="country" id="country" placeholder="Country Code" required
                                 v-model="form.country"/>
                    </vue-grid-item>
                    <vue-grid-item>
                      <vue-input type="text" name="area" id="area" placeholder="Area Code" required
                                 v-model="form.area"/>
                    </vue-grid-item>
                    <vue-grid-item>
                      <vue-input type="text" name="prefix" id="prefix" placeholder="Prefix" required
                                 v-model="form.prefix"/>
                    </vue-grid-item>
                    <vue-grid-item>
                      <vue-input type="text" name="line" id="line" placeholder="Line" required
                                 v-model="form.line"/>
                    </vue-grid-item>
                  </vue-grid-row>

                  <vue-grid-row>
                    <vue-grid-item>
                      <vue-checkbox
                        name="optInTexts"
                        id="optInTexts"
                        v-model="form.optInTexts"
                        label=""/>
                      <p>{{ $t('App.profile.optInTexts' /* I want to receive text messages when there are new jobs. */)
                        }}</p>
                    </vue-grid-item>
                  </vue-grid-row>

                  <vue-grid-row>
                    <vue-grid-item>
                      <vue-checkbox
                        name="subscribeToMailingList"
                        id="subscribeToMailingList"
                        v-model="form.subscribeToMailingList"
                        label=""/>
                      <p>{{ $t('App.profile.subscribeToMailingList' /* I want to receive emails when there are
                        new jobs. */)
                        }}</p>
                    </vue-grid-item>
                  </vue-grid-row>

                  <vue-button primary
                              :loading="isLoading">
                    {{ $t('App.profile.updateProfileButton' /* Update Profile */) }}
                  </vue-button>
                </form>
              </template>

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
  import firebase from 'firebase';
  import db from '../firebaseinit';
  import * as types from '../store/types'
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
        isEditingProfile: false,
        job: {},
        jobs: {},
        users: {},
        incompleteJobs: [],
        completedJobs: [],
        evaluatingJobs: [],
        managingJobs: [],
        canceledJobs: [],
        form: {
          country: '509',
          area: '00',
          prefix: '11',
          line: '5555',
          optInTexts: true,
          subscribeToMailingList: true
        },
      };
    },
    computed: {
      ...mapGetters({
        userId: types.GET_USER_ID
      })
    },
    methods: {
      ...mapActions({
        saveUserInStorage: types.SAVE_USER_IN_STORAGE
      }),
      concatenateToE164() {
        const phone = this.form.country + this.form.area + this.form.prefix + this.form.line;
        return `+${phone}`
      },
      async updateProfile() {

        const e164 = this.concatenateToE164();

        const data = {
          optInTexts: this.form.optInTexts,
          subscribeToMailingList: this.form.subscribeToMailingList,
          phone: e164
        };

        const user = await db.collection('users')
          .where("uid", "==", this.userId)
          .get()
          .then(snapshot => {
            snapshot.forEach(function (doc) {
              // console.log(doc.id, " => ", doc.data());
              db.collection("users").doc(doc.id).update(data);
            });
            console.log(snapshot);
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

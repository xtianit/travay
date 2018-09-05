<template>
  <div :class="$style.job">
    <vue-grid v-if="job">

      <vue-grid-row>
        <vue-grid-item fill>
          <h1>{{ $t('App.job.pageHeader' /* Job */) }}</h1>
        </vue-grid-item>
      </vue-grid-row>

      <sponsor-modal
        :job="job"
        :show.sync="showSponsoredModal"
        @sponsorSubmit="amount => sponsorSubmitHandler({
          amount,
          taskId: this.job.taskId,
          task: this.job.task,
          job: this.job
        })"></sponsor-modal>

      <vue-grid-row>
        <vue-grid-item>
          <vue-panel>
            <vue-panel-header>
              <router-link :key="`/job/${job.taskId}`">{{ job.task }}</router-link>
            </vue-panel-header>
            <vue-panel-body>
              <p v-if="'status' in job && job.status.state === 'cancelled'">This job has been cancelled</p>

              <p v-if="job.role && userId && ('status' in job && job.status.state !== 'cancelled')">
                <a v-if="job.role['0'] === userId" @click.prevent.stop="e => {}">
                  <i class="fa edit-icon" :class="isEditingJobDetails ? 'fa-times' : 'fa-edit'"
                     @click="isEditingJobDetails = !isEditingJobDetails"></i>
                  {{ $t('App.job.editJobIcon' /* Edit */) }}
                </a>
              </p>

              <ul>
                <li v-if="job.salary">
                  <h1>{{job.task}}</h1><br>

                  <template v-if="isEditingJobDetails">

                    {{ $t('App.job.jobDescription' /* Description */) }}:<br/>
                    <input
                      id="job-description"
                      type="text"
                      v-model="job.brief"/> <br/>

                    {{ $t('App.job.jobDomain' /* Domain */) }}:<br/>
                    <input
                      id="domain"
                      type="text"
                      v-model="job.domain"/><br>

                    {{ $t('App.job.jobSkill' /* Desired Skill */) }}:<br/>
                    <input
                      id="skill"
                      type="text"
                      v-model="job.skill"/> <br/>

                    {{ $t('App.job.salaryIsEditing' /* Salary cannot be changed after job is posted. */) }}<br>

                    {{ $t('App.job.payFrequencyIsEditing' /* Pay frequency cannot be changed after job is posted. */) }}<br>

                    {{ $t('App.job.termOfEmploymentIsEditing' /* Term of Employment cannot be changed after job is
                    posted. */) }}<br><br>

                    <!-- Pay frequency:
                    <input id="weekly" true-value="weekly" type="checkbox" name="weekly" v-model="job.salary['pay-frequency'].label" :disabled="!isJobManager"/>
                    <label for="weekly">Weekly</label>
                    <input id="bi-weekly" type="checkbox" true-value="bi-weekly" name="bi-weekly" v-model="job.salary['pay-frequency'].label" :disabled="!isJobManager"/>
                    <label for="bi-weekly">Bi-weekly</label>
                    <input id="monthly" true-value="monthly" type="checkbox" name="monthly" v-model="job.salary['pay-frequency'].label" :disabled="!isJobManager"/>
                    <label for="monthly">Monthly</label><br> -->

                    <!-- Term of employment:
                    <input id="sixmonth" type="checkbox" name="sixmonth" v-model="job['terms-of-employment']" true-value="6" :disabled="!isJobManager"/>
                    <label for="sixmonth">6 month</label>
                    <input id="oneyear" type="checkbox" name="oneyear" v-model="job['terms-of-employment']" true-value="12" :disabled="!isJobManager"/>
                    <label for="oneyear">1 year</label> -->

                    <em>{{ $t('App.job.requirementInstructions' /* Please add your requirements in order for the job to
                      be considered as complete. Add one requirement, then click Add Requirement, to add additional
                      requirements. */) }}</em><br/>

                    <vue-grid-item>
                      <vue-input
                        name="deliverable"
                        id="deliverable"
                        placeholder="Requirement for Job to be Complete"
                        validation="required"
                        v-model="requirement"
                        required/>
                      <button accent @click="addRequirement">
                        {{ $t('App.job.addRequirement' /* Add Requirement */) }}
                      </button>
                      <br>
                    </vue-grid-item>
                    <br>
                    <br>
                    <vue-grid-item>
                      <p v-for="(req, i) in job.deliverable" :key="i">
                        <vue-badge accent>{{req}} -</vue-badge>
                        <span @click="removeRequirement(i)">
                          X
                        </span>
                        <br>
                        <br>
                      </p>
                    </vue-grid-item>
                  </template>

                  <template v-else>
                    {{ $t('App.job.jobDescription' /* Description */) }}: {{job.brief}}<br>

                    {{ $t('App.job.jobDomain' /* Domain */) }}: {{job.domain}}<br>

                    {{ $t('App.job.jobSkill' /* Desired Skill */) }}: {{job.skill}}<br>

                    {{ $t('App.job.jobFullTimeRate' /* Full-Time Rate */) }}:
                    ${{job.salary['full-time-rate']}}<br>

                    {{ $t('App.job.jobSponsoredAmount' /* Sponsored Amount */) }}: ${{ job.sponsoredAmount }}<br>

                    {{ $t('App.job.jobPayFrequency' /* Pay Frequency */) }}: {{job.salary['pay-frequency'].label}}<br>

                    {{ $t('App.job.termsOfEmployment' /* Terms of Employment */) }}: {{ job['terms-of-employment']
                    }}<br><br>

                    {{ $t('App.job.requirements' /* Requirements */) }}:<br>
                    <p v-for="(item, index) in job.deliverable" :key="index">
                      + {{item}}
                    </p>
                  </template>
                  <br>
                  {{ $t('App.job.datePosted' /* Date Posted */) }}: {{ job['date-posted'] | moment }}<br>
                </li>
              </ul>
            </vue-panel-body>
            <vue-panel-footer>
              <template v-if="isEditingJobDetails">
                <vue-grid-row>
                  <vue-grid-item>
                    <vue-button primary
                                @click.prevent.stop="e => postEditedJob(job.id)">
                      {{ $t('App.job.postChangesButton' /* Post Changes */) }}
                    </vue-button>
                  </vue-grid-item>

                  <br>
                  <br>
                  <br>

                  <vue-grid-item>
                    <vue-button warn
                                @click="cancelJobHandler">
                      {{ $t('App.job.cancleJob' /* Cancel Job */) }}
                    </vue-button>
                  </vue-grid-item>
                </vue-grid-row>
              </template>
            </vue-panel-footer>
          </vue-panel>
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <vue-panel>
            <vue-panel-body>

              <h3>{{ $t('App.job.claimTitle' /* Claim */) }}</h3>

              <vue-grid-item>
                {{ $t('App.job.claimDescription' /* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. */) }}<br><br>
              </vue-grid-item>

              <template v-if="!claimed && job.role">
                <vue-grid-item>
                  <vue-checkbox v-userRole.signedIn.canClaim="{role: job.role}"
                                name="acceptTerms"
                                id="acceptTerms"
                                v-model="form.acceptTerms"
                                label=""
                                validation="required"/>
                  {{ $t('App.job.claimDisclaimer' /* Claiming this position is to accept the job requirements, Travay
                  Terms, Privacy Policy and Code of Conduct. */) }}
                </vue-grid-item>
                <br>

                <vue-grid-item>
                  <vue-button v-userRole.signedIn.canClaim="{role: job.role}"
                              primary @click.prevent.stop="e => onClaim(job.id)">
                    {{ $t('App.job.claim' /* Claim */) }}
                  </vue-button>
                  <br>
                  <br>
                  <vue-button v-userRole.signedIn.canClaim="{role: job.role}"
                              primary @click.prevent.stop="e => claimPayout(job.id)">
                    {{ $t('App.job.claimPayout' /* Claim Payout */) }}
                  </vue-button>
                </vue-grid-item>
              </template>

            </vue-panel-body>
            <vue-panel-footer>

            </vue-panel-footer>
          </vue-panel>
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <vue-grid-row>
            <vue-grid-item>
              <vue-panel>
                <vue-panel-body>
                  <h3>{{ $t('App.job.sponsorJobButton' /* Sponsor Job */) }}</h3>

                  <vue-grid-item>
                    <p>{{ $t('App.job.sponsorDescription' /* Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed
                      doeiusmod tempor incididunt ut labore et dolore magna aliqua. */) }}</p>
                  </vue-grid-item>

                </vue-panel-body>
                <vue-panel-footer>
                  <vue-button v-if="job.role" v-userRole.canSponsor="{role: job.role}" class="sponsor-btn--container" accent>
                    <a style="color: white !important;" @click.prevent.stop="e => sponsorJobClickedHandler(job.taskId)"
                       id="remove-hyperlink">
                      {{ $t('App.job.sponsorJobButton' /* Sponsor This Job */) }}
                    </a>
                  </vue-button>
                </vue-panel-footer>
              </vue-panel>
            </vue-grid-item>
          </vue-grid-row>
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <vue-grid-row>
            <vue-grid-item>
              <vue-panel>
                <vue-panel-body>

                  <h3>{{ $t('App.job.proofOfWorkTitle' /* Proof of Work */) }}</h3>

                  <vue-grid-item>
                    <p>{{ $t('App.job.proofOfWorkDescription' /* Based on the requirements of a job, the Job Manager may
                      request proof that work was completed. For example, a picture of a planted tree or that trash was
                      deposited in the correct location. */)
                      }}</p><br>
                    <div class="job-images">
                      <div
                        v-for="(img, index) in this.job.images"
                        :key="index"
                        class="job-image-block">
                        <img :src="img.url" :alt="img.name"/>
                      </div>
                    </div>
                  </vue-grid-item>

                  <vue-grid-item v-if="job.role" v-userRole.signedIn.worker="{cb: uploadFile, role: job.role}">

                    <div v-for="(image, index) in images" :key="index">
                      <a @click.prevent="removeImage(index)">X</a>
                      <img :src="image.src"/>
                    </div>

                    <h5>{{ $t('App.job.uploadProofOfWorkTitle' /* Upload Proof of Work */) }}</h5>
                    <span class="input-group-text btn btn-primary btn-file" id="basic-addon2">
                        <input type="file" v-on:change="fileUploaded" accept="image/png, image/jpeg, image/gif"
                               name="input-file-preview" multiple/>
                      </span>
                    <div>
                    </div>

                    <div>
                      <p>{{ loadingText }}</p>
                    </div>
                  </vue-grid-item>

                </vue-panel-body>
                <vue-panel-footer v-if="job.role">
                  <vue-button v-userRole.worker="{cb: uploadFile, role: job.role}" accent>
                    <a @click.prevent="uploadImages" style="color: white;">
                      {{ $t('App.job.uploadFileButton' /* Submit Proof */) }}
                    </a>
                  </vue-button>
                  <br><br>
                  <vue-button v-userRole.worker="{role: job.role}" warn>
                    <a @click="markJobCompleteHandler" style="color: white;">
                      {{ $t('App.job.markJobComplete' /* Job is Done */) }}
                    </a>
                  </vue-button>
                  <br><br>
                  <vue-button v-userRole.evaluator="{role: job.role}" primary>
                    <a @click="evaluateJobAsCompletedSucessfullyHandler" style="color: white;">
                      {{ $t('App.job.evaluateJobAsSuccess' /* Approve Work */) }}
                    </a>
                  </vue-button>
                  <br><br>
                  <vue-button v-userRole.evaluator="{role: job.role}" warn>
                    <a @click="evaluateJobAsCompletedUnsucessfullyHandler" style="color: white;">
                      {{ $t('App.job.evaluateJobAsUnsuccessful' /* Disapprove Work */) }}
                    </a>
                  </vue-button>
                </vue-panel-footer>
              </vue-panel>
            </vue-grid-item>
          </vue-grid-row>
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <vue-grid-row>
            <vue-grid-item>
              <vue-panel>
                <vue-panel-body>
                  <h3>{{ $t('App.job.approveWork' /* Approve Work */) }}</h3>

                  <vue-grid-item>
                    <p>{{ $t('App.job.approveWorkDescription' /* Approval history will be shown here. Once a job is
                      approved, the job is marked complete and the worker receives their salary. This is not reversible.
                      */) }}</p>
                  </vue-grid-item>
                </vue-panel-body>
                <vue-panel-footer>
                  <vue-grid-item v-if="job.role">
                    <vue-button
                      v-if="job.role['0'] === userId"
                      @click.prevent.stop="e => onPayout(job.id)"
                      primary>
                      {{ $t('App.job.payoutJobButton' /* Payout Job */) }}
                    </vue-button>
                  </vue-grid-item>
                </vue-panel-footer>
              </vue-panel>
            </vue-grid-item>
          </vue-grid-row>
        </vue-grid-item>
      </vue-grid-row>

    </vue-grid>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex';
  import axios from "axios";
  import firebase from "firebase";
  import db from "../firebaseinit";
  import SponsorModal from "../services/SponsorModal.vue";
  import {uuid} from "vue-uuid";
  import moment from "moment";
  import {sponsorSubmitMixin} from "../mixins/sponsorSubmitMixin";
  import * as types from '../store/types'
  import {store} from '../store/'

  import truffleContract from "truffle-contract";
  import EscrowContract from "../../contracts/build/contracts/Escrow.json";
  import DAIContract from "../../contracts/build/contracts/DAI.json";

  const firebaseStorage = firebase.storage();

  export default {
    mixins: [sponsorSubmitMixin],
    metaInfo: {
      title: "Job",
      meta: [
        {
          name: "Details of a job",
          content: "Details of a job in Travay."
        }
      ]
    },
    name: 'job',
    $_veeValidate: {
      validator: "new"
    },
    components: {
      SponsorModal
    },
    data() {
      return {
        job: {},
        posted: "",
        taskId: "",
        form: {
          acceptTerms: false,
          newsletter: false
        },
        isLoading: false,
        showSponsoredModal: false,
        isEditingJobDetails: false,
        file: "",
        fileName: "",
        image: "",
        imagePreview: "",
        loadingText: "",
        sponsoredAmount: 0,
        images: [],
        requirement: "",
        requirements: [],
        claimed: false
      };
    },
    created() {
      const taskId = this.$route.params.id;
      db
        .collection("jobs")
        .where("taskId", "==", taskId)
        .get()
        .then(snapshot => {
          const jobs = [];
          const jobsId = [];
          snapshot.forEach(job => {
            let jobData = job.data();
            let jobId = job.id;
            jobs.push(jobData);
            jobsId.push(jobId);
          });
          this.job = jobs[0];
          this.job.id = jobsId[0];
        })
        .catch(error => {
          console.error("Error while trying to get the job", error);
        });
    },
    filters: {
      moment: function (date) {
        return moment(date).format("MMMM Do YYYY");
      }
    },
    computed: {
      ...mapGetters("job", []),
      ...mapGetters({
        userId: types.GET_USER_ID
      }),
      hasErrors() {
        return this.errors && this.errors.items.length > 0;
      },
      hasEmptyFields() {
        let hasEmptyField = false;
        Object.keys(this.form).forEach((key) => {
          if (
            key !== "newsletter" &&
            (this.form[key] === "" || this.form[key] === false)
          ) {
            hasEmptyField = true;
          }
        });
        return hasEmptyField;
      },
      isSubmitDisabled() {
        return this.hasErrors || this.hasEmptyFields;
      }
    },
    methods: {
      //...mapActions("signInModal", ["openLoginModal", "closeLoginModal"]),
      ...mapActions({
        openLoginModal: types.OPEN_LOGIN_MODAL,
        closeLoginModal: types.CLOSE_LOGIN_MODAL
      }),
      removeImage(i) {
        this.images = this.images.filter((img, index) => index !== i);
      },
      addRequirement() {
        if (this.requirement) {
          if (Reflect.has(this.job, "deliverable")) {
            this.job.deliverable.push(this.requirement);
          } else {
            this.job.deliverable = [this.requirement];
          }
        }
        this.requirement = "";
      },
      removeRequirement(index) {
        this.job.deliverable.splice(index, 1);
      },
      async cancelJobHandler() {
        const jobId = this.job.taskId;
        try {
          const job = await db.collection("jobs").doc(jobId);
          const update = await job.update({
            status: {
              state: "cancelled"
            }
          });
          this.job.status.state = "cancelled";
          this.isEditingJobDetails = false;
          this.cancelJobInEscrow();
          addNotification({
            title: this.$t("App.job.jobCanceledNotificationTitle") /* Success! */,
            text: this.$t(
              "App.job.jobCanceledNotificationText"
            ) /* This job has been cancelled. */
          }, INotification);
        } catch (error) {
        }
      },
      async markJobCompleteHandler() {
        const jobId = this.job.taskId;
        try {
          const job = await db.collection("jobs").doc(jobId);
          const update = await job.update({
            status: {
              state: "complete"
            }
          });
          this.job.status.state = "complete";
          this.isEditingJobDetails = false;
          addNotification({
            title: this.$t(
              "App.job.jobCompletedNotificationTitle"
            ) /* Success! */,
            text: this.$t(
              "App.job.jobCompleteNotificationText"
            ) /* This job has been marked completed. Your Job Manager will review the work and send payment after confirmting. */
          }, INotification);
        } catch (error) {
        }
      },
      async evaluateJobAsCompletedSucessfullyHandler() {
        const jobId = this.job.taskId;
        try {
          const job = await db.collection("jobs").doc(jobId);
          const update = await job.update({
            status: {
              successfullyCompleted: "true"
            }
          });
          this.isEditingJobDetails = false;
          this.evaluateJobToEscrow();
          addNotification({
            title: this.$t(
              "App.job.jobCompletedNotificationTitle"
            ) /* Success! */,
            text: this.$t(
              "App.job.jobCompleteNotificationText"
            ) /* This job has been marked completed. Your Job Manager will review the work and send payment after confirmting. */
          }, INotification);
        } catch (error) {
        }
      },
      async evaluateJobAsCompletedUnsucessfullyHandler() {
        const jobId = this.job.taskId;
        try {
          const job = await db.collection("jobs").doc(jobId);
          const update = await job.update({
            status: {
              successfullyCompleted: "false"
            }
          });
          this.isEditingJobDetails = false;
          addNotification({
            title: this.$t(
              "App.job.jobCompletedNotificationTitle"
            ) /* Success! */,
            text: this.$t(
              "App.job.jobCompleteNotificationText"
            ) /* This job has been marked completed. Your Job Manager will review the work and send payment after confirmting. */
          }, INotification);
        } catch (error) {
        }
      },
      async claimPayout() {
        const jobId = this.job.taskId;
        try {
          const job = await db.collection("jobs").doc(jobId);
          const update = await job.update({
            status: {
              payout: "yes"
            }
          });
          this.isEditingJobDetails = false;
          addNotification({
            title: this.$t(
              "App.job.jobCompletedNotificationTitle"
            ) /* Success! */,
            text: this.$t(
              "App.job.jobCompleteNotificationText"
            ) /* This job has been marked completed. Your Job Manager will review the work and send payment after confirmting. */
          }, INotification);
        } catch (error) {
        }
        this.workerClaimPayoutInEscrow();
      },
      async fileUploaded(e) {
        const images = await Promise.all(
          Array.from(e.target.files).map(file => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = e => {
                resolve({src: e.target.result, file, progress: null});
              };
              if (e.target.file) {
                reader.readAsDataURL(e.target.this.file[0]);
              }
            });
          })
        );
        this.images = images;
      },
      sponsorJobClickedHandler(taskId) {
        if (!this.userId) {
          this.openLoginModal();
          return;
        }
        this.selectedJobToSponsorId = taskId;
        this.showSponsoredModal = true;
      },
      getJob() {
        axios.get("/jobs.json").then((response) => {
          const job = response.data.jobs.filter(
            (job) => job.taskId === this.$route.params.taskId
          );
          if (job.length > 0) {
            this.job = job[0];
          }
        });
      },
      onSubmit() {
        this.isLoading = true;
        this.$nextTick(() => {
          setTimeout(() => {
            this.isLoading = false;
            // addNotification({
            //   title: this.$t("App.job.jobSavedNotificationTitle") /* Success */,
            //   text: this.$t(
            //     "App.job.jobSavedNotificationText"
            //   ) /* The job has been saved! */
            // }, INotification);
          }, 500);
        });
      },
      async onClaim(docId) {
        const taskId = this.$route.params.id;
        if (this.hasEmptyFields) {
          // addNotification({
          //   title: this.$t("App.job.jobEmptyFieldNotificationTitle") /* Oops */,
          //   text: this.$t(
          //     "App.job.jobEmptyFieldNotificationText"
          //   ) /* Please complete all fields. */
          // }, INotification);
          return false;
        }
        await db
          .collection("jobs")
          .doc(docId)
          .update({
            "role.2": this.userId
          });
        const result = db
          .collection("users")
          .where("uid", "==", this.userId)
          .get()
          .then(snapshots => {
            const doc = snapshots.docs[0];
            const userData = doc.data();
            const obj = {doc, user: userData, claimedJobs: []};
            if (Reflect.has(userData, "claimedJobs")) {
              obj.claimedJobs = userData.claimedJobs;
            }
            return obj;
          })
          .then(({doc, user, claimedJobs}) => {
            doc.ref.update({
              claimedJobs: [...claimedJobs, this.job.taskId]
            });
          });
        this.claimed = true;
        this.$nextTick(() => {
          setTimeout(() => {
            this.isLoading = false;
            // addNotification({
            //   title: this.$t("App.job.jobClaimedNotificationTitle") /* Yay! */,
            //   text: this.$t(
            //     "App.job.jobClaimedNotificationText"
            //   ) /* Job confirmed successfully! You can start work immediately. */
            // }, INotification);
          }, 700);
        });
        this.claimJobInEscrowContract();
      },
      onPayout(docId) {
        const taskId = this.$route.params.id;
        db
          .collection("jobs")
          .doc(docId)
          .update({});
        this.$nextTick(() => {
          setTimeout(() => {
            this.isLoading = false;
            addNotification({
              title: this.$t(
                "App.job.jobPayoutNotificationTitle" /* Your worker thanks you! */
              ),
              text: this.$t(
                "App.job.jobPayoutNotificationTitleText" /* Payout Complete. Your account is being debited. */
              )
            }, INotification);
          }, 700);
        });
        this.managerApprovesPaymentInEscrow();
      },
      async postEditedJob() {
        const jobData = {
          brief: this.job.brief,
          deliverable: this.job.deliverable,
          skill: this.job.skill,
          domain: this.job.domain
        };
        const jobRef = await db
          .collection("jobs")
          .doc(this.job.taskId)
          .get();
        jobRef.ref
          .update({
            ...jobData
          })
          .then(function () {
            console.log("Document successfully updated!");
          })
          .catch(function (error) {
            console.error("Error updating document: ", error);
          });
        this.$nextTick(() => {
          setTimeout(() => {
            this.isLoading = false;
            addNotification({
              title: this.$t(
                "App.job.jobUpdatedNotificationTitle"
              ) /* Success! */,
              text: this.$t(
                "App.job.jobUpdatedNotificationText"
              ) /* Job updated successfully! */
            }, INotification);
          }, 700);
        });
        this.isEditingJobDetails = false;
      },
      async uploadImages() {
        const self = this;
        const results = this.images.map(async ({file}) => {
          const imageUrl = await this.uploadFile(file, self.job.taskId);
          return {name: file.name, url: imageUrl};
        });
        Promise.all(results).then(async imageUrls => {
          if (!Reflect.has(this.job, "images")) this.job.images = [];
          const images = [...this.job.images, ...imageUrls];
          const result = await db
            .collection("jobs")
            .doc(this.job.taskId)
            .set({images}, {merge: true})
            .then(docRef => {
              console.log("updated!", docRef);
            });
        });
      },
      uploadProofOfWork() {
        this.uploadFile().then(imageUrl => {
          this.data.image = imageUrl;
          db
            .collection("jobs")
            .where("taskId", "==", this.taskId)
            .add(this.data)
            .then(function (docRef) {
              this.self.clearForm();
              this.self.loadingText = this.$t(
                "App.job.uploadedPhotoSuccessfully"
              ) /* Post was created successfully. */;
            })
            .catch(function (error) {
              console.error("Error adding document: ", error);
            });
        });
        this.proofOfWorkToEscrow();
      },
      uploadFile(file, jobId) {
        return new Promise((resolve, reject) => {
          const self = this;
          const storageRef = firebaseStorage
            .ref()
            .child("jobs/" + jobId + "/" + file.name + "-" + uuid.v1());
          let uploadTask = storageRef.put(file);
          uploadTask.on(
            "state_changed",
            function (snapshot) {
              const progress =
                snapshot.bytesTransferred / snapshot.totalBytes * 100;
              self.loadingText =
                this.$t('App.job.uploadedPhotoProgress') /* Upload is */ +
                progress +
                this.$t(
                  'App.job.uploadedPhotoProgress2'
                );
              /* % done. Processing post. */
              this.upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
              console.log(this.upload.progress);
            },
            function (error) {
              // Handle unsuccessful uploads
              reject(error);
            },
            async function () {
              // Handle successful uploads on complete
              const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
              resolve(downloadUrl);
            }
          );
        });
      },
      async claimJobInEscrowContract() {
        const Escrow = truffleContract(EscrowContract);
        const DAI = truffleContract(DAIContract);

        window.Escrow = Escrow;
        Escrow.setProvider(this.$store.state.web3.web3Instance().currentProvider);
        Escrow.defaults({from: this.$store.state.web3.web3Instance().eth.coinbase});
        DAI.setProvider(this.$store.state.web3.web3Instance().currentProvider);

        const EscrowInstance = await Escrow.deployed();
        const DAIInstance = await DAI.deployed();

        window.EscrowInstance = EscrowInstance;
        const pool = EscrowInstance.address;

        DAI.setProvider(this.$store.state.web3.web3Instance().currentProvider);
        DAI.defaults({from: this.$store.state.web3.web3Instance().eth.coinbase});

        web3.eth.getAccounts( async(err, accounts) => {
          const worker = accounts[0];

          const JobID = 0; // you need to get this from UI

          try {
            const result = await EscrowInstance.claimJob(JobID, { from: worker });

          } catch (err) {
            console.log(err)
          }
        })

      },
      async cancelJobInEscrow() {
        const Escrow = truffleContract(EscrowContract);

        Escrow.setProvider(this.$store.state.web3.web3Instance().currentProvider);

        const manager = accounts[0];
        const EscrowInstance = await Escrow.deployed();
        const DAIInstance = await DAI.deployed();

        let balance_manager_before = await DAIInstance.balanceOf(manager);
        balance_manager_before =
          balance_manager_before.toNumber() / decimalConversion;

        const salary = 100 * decimalConversion;

        const twoPecentOfSalary = (salary * (1 / 50)) / decimalConversion;

        await DAIInstance.approve(EscrowInstance.address, salary, {
          from: manager
        });

        await EscrowInstance.createJob(description, salary, 5, {from: manager});

        const JobID = 1;
        const result = await EscrowInstance.cancelJob(JobID, {from: manager});

        let balance_manager_after = await DAIInstance.balanceOf(manager);
        balance_manager_after =
          balance_manager_after.toNumber() / decimalConversion;

        console.log(result)

      },
      async proofOfWorkToEscrow() {
        const Escrow = truffleContract(EscrowContract);

        Escrow.setProvider(this.$store.state.web3.web3Instance().currentProvider);

        const worker = accounts[1];

        const EscrowInstance = await Escrow.deployed();

        const JobID = 0;

        const result = await EscrowInstance.provideProofOfWork(JobID, {
          from: worker
        });

        console.log(result)
      },
      async evaluateJobToEscrow() {
        const Escrow = truffleContract(EscrowContract);

        Escrow.setProvider(this.$store.state.web3.web3Instance().currentProvider);

        const EscrowInstance = await Escrow.deployed();

        const result = await EscrowInstance.confirmProofOfWork(JobID, {
          from: evaluator
        });
      },
      async managerApprovesPaymentInEscrow() {
        const Escrow = truffleContract(EscrowContract);

        Escrow.setProvider(this.$store.state.web3.web3Instance().currentProvider);

        const manager = accounts[0];

        const EscrowInstance = await Escrow.deployed();

        const JobID = 0;
        const salary = 98 * decimalConversion;
        const payment = salary / 5;

        const result = await EscrowInstance.approvePayment(JobID, {
          from: manager
        });

        console.log(result)

      },
      async workerClaimPayoutInEscrow() {
        const Escrow = truffleContract(EscrowContract);

        Escrow.setProvider(this.$store.state.web3.web3Instance().currentProvider);

        const EscrowInstance = await Escrow.deployed();

        const DAIInstance = await DAI.deployed();

        let worker_balance_before = await DAIInstance.balanceOf(worker);
        worker_balance_before = worker_balance_before.toNumber();

        const JobID = 0;

        const Job = await EscrowInstance.getJob(JobID);
        const payment = Job[7].toNumber();

        const result = await EscrowInstance.claimPayment(JobID, {from: worker});

        let worker_balance_after = await DAIInstance.balanceOf(worker);
        worker_balance_after = worker_balance_after.toNumber();

        console.log(result)
      }

      // ended here: https://github.com/electricfeelco/EscrowSmartContract/blob/master/test/Escrow.js#L399
    }
  };
</script>

<style lang="scss" module>

</style>

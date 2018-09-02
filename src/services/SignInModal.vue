<template>
  <div>
    <vue-modal :show="isOpen" @close="closeLoginModal">
      <vue-button warn @click="closeLoginModal">X</vue-button>
      <vue-grid>

        <vue-grid-row>
          <vue-grid-item fill>
            <h1>{{modalHeading}}</h1>
          </vue-grid-item>
        </vue-grid-row>

        <template v-if="!userId" fill>
          <vue-grid-row>
            <vue-grid-item>
              <vue-button @click="signInWithGoogle">
                <i class="fab fa-google"></i> Google
              </vue-button>
            </vue-grid-item>
            <br>
            <br>
            <!--<vue-grid-item>-->
            <!--<vue-button @click="siginInWithUport">-->
            <!--<i class="fab fa-google"></i> uPort-->
            <!--</vue-button>-->
            <!--</vue-grid-item>-->

          </vue-grid-row>
        </template>

        <template v-else fill>
          <vue-grid-row>
            <vue-grid-item>
              <vue-button @click="signOut">
                <i class="fab fa-sign-out"></i> Sign Out
              </vue-button>
            </vue-grid-item>
          </vue-grid-row>
        </template>

      </vue-grid>
    </vue-modal>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex';
  import * as types from '@/store/types'
  import firebase from 'firebase';
  import db from '../firebaseinit';
  import {travaySlackBotMixin} from '../mixins/travaySlackBotMixin';
  import {uuid} from 'vue-uuid';
  import {escrowContract} from '../util/getContract';

  // import {Connect, SimpleSigner} from 'uport-connect';
  // const uport = new Connect('Travay', {
  //   clientId: UPORT_CONFIG.TRAVAY_UPORT_CLIENT_ID,
  //   network: 'rinkeby',
  //   signer: SimpleSigner(UPORT_CONFIG.TRAVAY_UPORT_SIMPLE_SIGNER)
  // });

  export default {
    mixins: [travaySlackBotMixin],
    metaInfo: {
      title: 'SignInModal'
    },
    created() {
      this.updateSignInModalState('passed!')
    },
    methods: {
      /*...mapActions('signInModal', [
        'openLoginModal',
        'closeLoginModal',
        'saveUserInStorage',
        'logoutUser'
      ]),*/
      ...mapActions({
        openLoginModal: types.OPEN_LOGIN_MODAL,
        closeLoginModal: types.CLOSE_LOGIN_MODAL,
        saveUserInStorage: types.SAVE_USER_IN_STORAGE,
        logoutUser: types.LOGOUT_USER
      }),
      ...mapMutations('signInModal', ['SET_USER_DATA']),
      ...mapMutations({
        updateSignInModalState: types.SET_SIGNIN_MODAL_OPEN,

      }),
      // siginInWithUport: function () {
      //   this.closeLoginModal();
      //   uport
      //     .requestCredentials({
      //       requested: ['name', 'phone', 'country'],
      //       notifications: true // Required for UX so users don't have to scan QR per interaction
      //     })
      //     .then((credentials) => {
      //       const uid = uuid.v1();
      //       const uPortUserData = {
      //         name: credentials.name,
      //         country: credentials.country,
      //         phone: credentials.phone,
      //         address: credentials.address,
      //         uid: uuid.v1()
      //       };
      //       db
      //         .collection('users')
      //         .doc(uid)
      //         .set(uPortUserData)
      //         .then(function (docref) {
      //         })
      //         .catch(function (error) {
      //           console.error('Error adding user: ', error);
      //         });
      //       console.log('uport user data', uPortUserData);
      //       this.updateUserData(uPortUserData);
      //     });
      //   this.$router.push('/jobs');
      // },
      signInWithGoogle: function () {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(result => {
            this.closeLoginModal();
            this.updateUserData(result.user);
            this.registerUserToEscrowContract();
          })
          .catch(err => console.log(err));
      },
      signOut: function () {
        firebase
          .auth()
          .signOut()
          .then(res => {
            console.warn('USER SHOULD BE SIGNED OUT!', res);
            this.logoutUser();
          })
          .catch(error => console.log(error));
      },
      async updateUserData(user) {
        const userRef = db.doc(`users/${user.uid}`);
        const data = {
          uid: user.uid,
          email: user.email || null,
          displayName: user.displayName || null,
          name: user.name || null,
          photoURL: user.photoURL || null,
          phone: user.phone || null,
          country: user.country || null,
          address: user.address || null
        };
        try {
          const snapshot = await db
            .collection('users')
            .where('uid', '==', user.uid)
            .get();
          if (snapshot.docs.length === 0) {
            const user = await db.collection('users').add(data);
          }
          this.user = data;
          this.saveUserInStorage(data);
          this.$router.push('/jobs');
        } catch (error) {
          console.error('error while getting user by uid', error);
        }
      },
      registerUserToEscrowContract() {
        const EscrowInstance = Escrow.deployed();

        try {
          const result = EscrowInstance.register({from: accounts[0]});

          assert.equal(
            result.logs[0].args.address_Registered,
            accounts[0],
            `Registered address should be ${accounts[0]}`
          );

          const userExists = EscrowInstance.registeredUsers(accounts[0]);
          assert(userExists, "Address is not registered");
        } catch (err) {
          assert(false, err);
        }
      }
    },
    computed: {
      ...mapGetters({
        userId: types.GET_USER_ID,
        isOpen: types.IS_SIGNIN_MODAL_OPEN
      }),
      modalHeading() {
        return this.userId ? 'Sign Out' : 'Please Sign In';
      }
    }
  };
</script>

<style>
</style>

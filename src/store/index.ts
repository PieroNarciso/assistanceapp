import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import { User, Utils } from "@/interfaces/interfaces"
import router from "@/router/index";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    domain: 'https://assistanceappapi.herokuapp.com',
    user: {
      username: '',
      password: '',
      login: false,
    } as User,

    utils: {
      code: "",
    } as Utils,

    msgErrors: {
      token: {
        msg: '',
        error: false
      },
      login: {
        msg: '',
        error: false
      },
      signup: {
        msg: '',
        error: false
      }
    },

    msgSuccess: {
      token: {
        msg: '',
        success: false
      },
      login: {
        msg: '',
        success: false
      }
    },

    assistances: [],

    intervalValue: 0

  },
  getters: {
    getAssistances: (state) => {
      return state.assistances
    },

    getIntervalValue: (state) => {
      return state.intervalValue
    },

    isLogin: (state) => {
      return state.user.login
    },

    isStaff: (state) => {
      return state.user.is_staff
    },

    getCode: (state) => {
      return state.utils.code
    },

    isErrorToken: (state) => {
      return state.msgErrors.token.error
    },

    msgErrorToken: (state) => {
      return state.msgErrors.token.msg
    },

    isSuccessToken: (state) => {
      return state.msgSuccess.token.success
    },

    msgSuccessToken: (state) => {
      return state.msgSuccess.token.msg
    },

    getMsgErrors: (state) => {
      return state.msgErrors
    },

    getMsgSuccess: (state) => {
      return state.msgSuccess
    }
  },
  mutations: {
    logoutUser: (state) => {
      state.user = {} as User
    },

    validCredentials: (state, credential) => {
      state.user.credentials_valid = credential
    },

    updateUser: (state, data: User) => {
      state.user.login = data.login;
      state.user.user_id = data.user_id;
      state.user.token = data.token;
      state.user.username = data.username;
      state.user.first_name = data.first_name;
      state.user.last_name = data.last_name;
      state.user.is_staff = data.is_staff;
      state.user.password = "";
    },

    addAssistances: (state, data) => {
      state.assistances = data
    },

    resetCode: (state) => {
      state.utils.code = "";
    },

    updateCode: (state, data) => {
      state.utils.code = data.code
    },

    updateErrorLogin: (state, data) => {
      state.msgErrors.login.msg = data.msg;
      state.msgErrors.login.error = data.error;
    },

    resetErrorLogin: (state) => {
      state.msgErrors.login.msg = '';
      state.msgErrors.login.error = false;
    },

    updateSuccesLogin: (state, data) => {
      state.msgSuccess.login.msg = data.msg;
      state.msgSuccess.login.success = data.success;
    },

    resetSuccessLogin: (state) => {
      state.msgSuccess.login.msg = '';
      state.msgSuccess.login.success = false;
    },

    updateErrorToken: (state, data) => {
      state.msgErrors.token.msg = data.msg
      state.msgErrors.token.error = data.error
    },

    resetErrorToken: (state) => {
      state.msgErrors.token.msg = '';
      state.msgErrors.token.error = false
    },

    updateSuccessToken: (state, data) => {
      state.msgSuccess.token.msg = data.msg;
      state.msgSuccess.token.success = data.success;
    },

    resetSuccessToken: (state) => {
      state.msgSuccess.token.msg = '';
      state.msgSuccess.token.success = false;
    },

    setIntervalValue: (state, time: number) => {
      state.intervalValue = time
    }
  },
  actions: {

    login: (context, data: User) => {
      axios
        .post(context.state.domain + "/api/auth/login/", data)
        .then(res => {
          Vue.$cookies.set('token', res.data.token, 'd')
          context.commit("updateUser", res.data);
          context.commit("validCredentials", true);
          context.commit('resetErrorLogin');
          router.push('user');
        })
        .catch(err => {
          context.commit('validCredentials', false);
          context.commit('updateErrorLogin', {
            msg: "Unable to login with provided credentials.",
            error: true
          })
        })
    },

    signup: (context, data: User) => {
      axios
        .post(context.state.domain + "/api/users/", data)
        .then(res => {
          context.dispatch('login', {
            username: data.username,
            password: data.password
          })
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },

    logout: (context) => {
      Vue.$cookies.remove('token')
      context.commit("logoutUser");
      router.push('/')
    },

    getUserData: (context, token) => {
      axios({
        method: "GET",
        url: context.state.domain + "/api/auth/get-user/",
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then(res => {
          context.commit('updateUser', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    createAssistance: (context, data) => {
      axios({
        method: "POST",
        url: context.state.domain + "/api/assistances/",
        headers: {
          Authorization: `Token ${data.token}`
        },
        data: {
          code: data.code
        }
      })
        .then(res => {
          context.commit('resetErrorToken');
          context.commit('updateSuccessToken', {
            msg: 'Assistance registered',
            success: true
          })
        })
        .catch(err => {
          console.log(err.response.data)
          context.commit('resetSuccessToken');
          context.commit('updateErrorToken', {
            msg: err.response.data.msg,
            error: true
          })
        })
    },

    getAssistances: (context, token) => {
      axios({
        method: "GET",
        url: context.state.domain + "/api/assistances/",
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then(res => {
          context.dispatch('addAssistances', res.data)
        })
        .catch(err => {
          console.log(err)
          console.log(err.msg)
        })
    },

    addAssistances: (context, data) => {
      context.commit('addAssistances', data)
    },

    getCode: (context, token) => {
      axios({
        method: "GET",
        url: context.state.domain + '/api/auth/get-code/',
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then(res => {
          context.commit('updateCode', res.data);
        })
        .catch(err => {
          console.log(err)
        })
    },

    createCode: (context, token) => {
      axios({
        method: "POST",
        url: context.state.domain + '/api/codes/',
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then(res => {
          context.commit('updateCode', res.data);
        })
        .catch(err => {
          console.log(err)
        })
    },

    resetCode: (context) => {
      context.commit('resetCode');
    },

    setIntervalValue: (context, time: number) => {
      context.commit('setIntervalValue', time);
    }
  },
  modules: {
  }
})

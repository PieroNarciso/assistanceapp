import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import { User, Utils, Assistance } from "@/interfaces/interfaces"
import router from "@/router/index";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    domain: 'https://assistanceappapi.herokuapp.com',
    // domain: "http://127.0.0.1:8000",
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

    assistances: [] as Assistance[],

    todayAssistances: [] as Assistance[],

    intervalValue: 0,

    showLoaderFormLogin: false,

    showLoaderFormSignup: false,

    rules: {
      usernameRules: [
        (v: string) => v.length >= 3 || 'At least 3 characters long.'
      ],
      passwordRules: [
        (v: string) => v.length >= 8 || 'At least 8 characters long.'
      ],
    }

  },
  getters: {
    getAssistances: (state) => {
      return state.assistances;
    },

    getTodayAssistances: (state) => {
      return state.todayAssistances.sort((a, b) => b.id - a.id);
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
    },

    getShowLoaderFormLogin: (state) => state.showLoaderFormLogin,
    getShowLoaderFormSignup: (state) => state.showLoaderFormSignup,
    getUsernameRules: (state) => state.rules.usernameRules,
    getPasswordRules: (state) => state.rules.passwordRules,
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

    getAssistances: (state, data: Assistance[]) => {
      state.assistances = data
    },

    updateTodayAssistances: (state, data: Assistance[]) => {
      state.todayAssistances = data
    },

    addAssistance: (state, data: Assistance) => {
      state.assistances.splice(0, 0, data);
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
      state.intervalValue = time;
    },

    updateShowLoaderFormLogin: (state, data: boolean) => {
      state.showLoaderFormLogin = data;
    },

    updateShowLoaderFormSignup: (state, data: boolean) => {
      state.showLoaderFormSignup = data;
    }
  },
  actions: {

    login: (context, data: User) => {
      axios
        .post(context.state.domain + "/api/login-token/", data)
        .then(res => {
          context.commit('updateShowLoaderFormLogin', false);
          Vue.$cookies.set('token', res.data.token, 'd')
          context.commit("updateUser", res.data);
          context.commit("validCredentials", true);
          context.commit('resetErrorLogin');
          router.push('user');
        })
        .catch(err => {
          context.commit('updateShowLoaderFormLogin', false)
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
          context.commit('updateShowLoaderFormSignup', false)
          context.dispatch('login', {
            username: data.username,
            password: data.password
          })
        })
        .catch(err => {
          context.commit('updateShowLoaderFormSignup', false)
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
        method: "POST",
        url: context.state.domain + "/api/users/get_user_data/",
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
          });
          context.dispatch('addAssistance', res.data)
        })
        .catch(err => {
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
          context.commit('getAssistances', res.data)
        })
        .catch(err => {
          console.log(err)
          console.log(err.msg)
        })
    },

    downloadAssistances: (context, data) => {
      axios({
        method: 'POST',
        url: context.state.domain + '/api/assistances/download_data/',
        headers: {
          Authorization: `Token ${Vue.$cookies.get('token')}`,
        },
        data: data
      })
        .then(res => {
          const csvfile = new Blob([res.data], { type: 'text/csv' })
          const downloadLink = document.createElement('a');
          downloadLink.download = 'assistances.csv';
          downloadLink.href = window.URL.createObjectURL(csvfile);
          downloadLink.style.display = "none";
          downloadLink.click();
        })
        .catch(err => console.log(err))
    },

    addAssistance: (context, data: Assistance) => {
      context.commit('addAssistance', data)
    },

    getCode: (context, token) => {
      axios({
        method: "GET",
        url: context.state.domain + '/api/codes/get_code/',
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

    getTodayAssistances: (context, token) => {
      axios({
        method: 'GET',
        url: context.state.domain + '/api/assistances/get_today/',
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then(res => {
          context.commit('updateTodayAssistances', res.data)
        })
        .catch(err => console.log(err))
    },

    resetCode: (context) => {
      context.commit('resetCode');
    },

    setIntervalValue: (context, time: number) => {
      context.commit('setIntervalValue', time);
    },

    updateShowLoaderFormLogin: (context, data: boolean) => {
      context.commit('updateShowLoaderFormLogin', data);
    },

    updateShowLoaderFormSignup: (context, data: boolean) => {
      context.commit('updateShowLoaderFormSignup', data);
    }
  },
  modules: {
  }
})

import axios from "axios";
// import router from '../router'
// import store from "../store";
export default () => {
  let headers = {
    "cache-control": "no-cache",
    allow: "PUT, POST, GET, DELETE",
  };
  let accessToken = localStorage.getItem("user-token");

  if (accessToken && accessToken !== "") {
    headers["app-auth-fetch-qualifier"] = accessToken;
  }
  const instance = axios.create({
    baseURL: localStorage.getItem("api_base_url"),
    headers: headers,
  });

  instance.interceptors.request.use(function (config) {
    // const token = store.state.auth ? store.state.auth.token : "";
    config.headers["app-auth-fetch-qualifier"] = token;
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      if (response.status === 401) {
        //add your code
        // alert('You are not authorized')
      }
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        //add your code
        // alert('You are not authorized')
      }
      if (error.response.status === 406) {
        //add your code
        // alert('You are not authorized')
        store.commit("AUTH_LOGOUT");
        // router.push('/login')
      }
      if (error.response && error.response.data) {
        //add your code
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.message);
    }
  );

  return instance;
};

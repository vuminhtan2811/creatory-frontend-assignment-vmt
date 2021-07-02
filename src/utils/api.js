import axios from "axios";
import {
  UNAUTHORIZED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  FORBIDDEN,
} from "../constants/http-status";
import { API_ENDPOINT } from "../constants/endpoint";

const BASE_URL = `http://localhost:8888`;

class ApiService {
  session;

  constructor() {
    this.session = axios.create({
      baseURL: `${BASE_URL}`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });

    this.session.interceptors.response.use(
      (response) => response,
      (error) => {
        const originalRequest = error.config;
        if (!originalRequest?._retry) {
          switch (error.response ? error.response.status : null) {
            case UNAUTHORIZED:
              originalRequest._retry = true;
              window.localStorage.removeItem("accessToken");
              window.location.reload();

              // return originalRequest object with currently session
              // return this.session.post('/auth/token', { "refresh_token": this.refreshToken })
              //   .then(res => {
              //     if (res.status === 201) {
              //       this.resetSession(res.data);
              //       return this.session(originalRequest);
              //     }
              //   });
              break;

            case FORBIDDEN:
              console.log(
                "This is a resource that you're not allowed to access",
                "warning",
                500
              );
              break;

            case BAD_REQUEST:
              console.log("Invalid field values", "warning", 500);
              throw error;

            case INTERNAL_SERVER_ERROR:
              console.log(
                "Internal server error, please try again later!",
                "warning",
                500
              );
              break;

            default:
              if (error.response?.data?.apiError?.message) {
                console.log(
                  error.response.data.apiError.message,
                  "warning",
                  500
                );
              }
              throw error;
          }
        }

        throw error;
      }
    );
  }

  authorization(token) {
    this.session.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  options = (...params) => this.session.options(...params);

  get = (...params) => this.session.get(...params);

  post = (...params) => this.session.post(...params);

  put = (...params) => this.session.put(...params);

  delete = (...params) => this.session.delete(...params);

  patch = (...params) => this.session.patch(...params);

  login(username, password) {
    return this.post(
      API_ENDPOINT.auth.signin,
      new URLSearchParams({ username, password }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Methods": "*",
          Authorization: null,
        },
      }
    );
  }
}

export const API = new ApiService();

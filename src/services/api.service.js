import axios from "axios";
const moment = require('moment')
const baseApi = "http://3.80.122.27:9002/api/";

export default {
    auth(url = baseApi + "auth/") {
        return {
          login: (requestBody) => axios.post(url + "login", requestBody),
          register: (requestBody) => axios.post(url + "register", requestBody),
          active: (requestBody) => axios.put(url + "active", requestBody),
          sendOTP: (requestBody) => axios.post(url + "otp", requestBody),
          resetPassword: (requestBody) => axios.put(url + "reset-password", requestBody),
        };
    },
    user(url = baseApi + "users") {
        return {
            getUserByJWT: () => axios.get(url + "/self", {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `${localStorage.getItem("jwt")}`,
                },
            }),
            editProfileUser: (requestBody) => axios.put(url + "/self", requestBody, {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `${localStorage.getItem("jwt")}`,
                },
            }),
            changeAvatar: (formData) => axios.post(url + "/avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `${localStorage.getItem("jwt")}`,
                },
            }),
            changePassword: (requestBody) => axios.put(url + "/password", requestBody, {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `${localStorage.getItem("jwt")}`,
                },
            }),
        }
    },
    cars(url = baseApi + "cars") {
        return {
            getCars: (param) => 
                axios.get(url, {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                params: {
                    fromDate: moment(param.fromDate).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
                    toDate: moment(param.toDate).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
                    page: param.page,
                    size: param.size,
                },
            }),
        
            getCar: (id) => axios.get(url+"/"+id, {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                }
            }),
        }
    },
    invoices(url = baseApi + "invoices") {
        return {
            createInvoice: (requestBody) => axios.post(url, {
                startTime: moment(requestBody.startTime).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
                endTime: moment(requestBody.endTime).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
                carId: requestBody.carId
            }, {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `${localStorage.getItem("jwt")}`,
                },
            }),
            getSelfInvoices: (param) => 
                axios.get(url+"/self", {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `${localStorage.getItem("jwt")}`,
                },
                params: {
                    
                },
            }),
        }
    }
};

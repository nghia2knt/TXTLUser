import axios from "axios";
const moment = require('moment')
const baseApi = "https://4monce5w19.execute-api.us-east-2.amazonaws.com/api/";
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
                    name: param.name,
                    model: param.model,
                    seats: param.seats,
                    brand: param.brand,
                    transmission: param.transmission,
                    engine: param.engine,
                },
            }),
        
            getCar: (id) => axios.get(url+"/"+id, {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                }
            }),
            createVote: (id,requestBody) =>
            axios.post(url + "/"+ id +"/vote", requestBody, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `${localStorage.getItem("jwt")}`,
                  },
            }),
            getVote: (id) =>
            axios.get(url +"/"+ id +"/vote", {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `${localStorage.getItem("jwt")}`,
                  },
            }),
        }
    },
    brands(url = baseApi + "brands") {
        return {
        brandList: () => axios.get(url),
        };
    },
    message(url = baseApi + "messages/") {
        return {
          getMessages: () =>
            axios.get(url , {
              headers: { Authorization: localStorage.getItem("jwt") },
            }),
        getMessagesSelf: () =>
            axios.get(url+"self" , {
              headers: { Authorization: localStorage.getItem("jwt") },
            }),
          getMessageByUserId: (id) =>
            axios.get(url + id , {
              headers: { Authorization: localStorage.getItem("jwt") },
            }),
          sendMess: (id, requestBody) =>
            axios.post(url + id, requestBody, {
              headers: { Authorization: localStorage.getItem("jwt") },
            }),
        };
      },
    invoices(url = baseApi + "invoices") {
        return {
            updateStatus: (id,requestBody) =>
            axios.put(url +"/refund/"+ id , requestBody, {
              headers: { Authorization: localStorage.getItem("jwt") },
            }),
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
                    size: 999,
                    fromDate: moment(param.fromDate).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
                    toDate: moment(param.toDate).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
                },
            }),
            getSelfInvoiceId: (id) => 
                axios.get(url+"/self/"+id, {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `${localStorage.getItem("jwt")}`,
                },
               
            }),
        }
    },
    issues(url = baseApi + "issues") {
      return {
          getSelfIssueInvoices: (param) => 
              axios.get(url+"/self", {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `${localStorage.getItem("jwt")}`,
              },
              params: {
                  isPaid: param.isPaid
              },
          }),
          getSelfIssueInvoiceId: (id) => 
              axios.get(url+"/self/"+id, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `${localStorage.getItem("jwt")}`,
              },
             
          }),
      }
  },
  template(url = "https://rest.apitemplate.io/v2/create-pdf") {
    return {
      createPDF: (requestBody) => axios.post(url+"?template_id=b7577b2b2e003e52", requestBody, {
        headers: {
          "Content-Type": "application/json",
            Authorization: "Token 76bcNzQ0MTo0NDcwOmlMQ2JOS0Ixa290UnVLT0g" ,
        },
    }),
    createPDFIssue: (requestBody) => axios.post(url+"?template_id=93a77b2b2e041ff6", requestBody, {
      headers: {
        "Content-Type": "application/json",
          Authorization: "Token 76bcNzQ0MTo0NDcwOmlMQ2JOS0Ixa290UnVLT0g" ,
      },
  }),
    };
  },
};

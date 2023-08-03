import axios from "axios";


const authAxios = axios.create({
    baseURL: "http://localhost:4000", //local  
    headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('pwa_token'))}`,
    }
});


authAxios.interceptors.response.use((config) => {

    // console.log("authAxios > config", config)
    return config;

}, (error) => {

    let { response: { data: { status } } } = error

    // unauthrised user
    if (status == 401) {
        localStorage.clear()
    }
    return Promise.reject(error);
});




export default authAxios; 
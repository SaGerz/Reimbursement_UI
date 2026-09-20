import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5279/api",
    withCredentials: true
})

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach((prom) => {
        if(error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
}

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if(
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/Auth/refresh") &&
            !originalRequest.url.includes("/Auth/login") 
            // !originalRequest.url.includes("/Auth/me") 
        ) 
        {
            if (isRefreshing) {
            // kalau lagi ada proses refresh jalan, request ini nunggu di antrian
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then(() => api(originalRequest))
                .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await api.post("/Auth/refresh"); // cookie refreshToken otomatis ikut
                processQueue(null);
                return api(originalRequest); // retry request yang tadi gagal
            } catch (refreshError) {
                processQueue(refreshError);
                // refresh token JUGA invalid/expired -> beneran logout
                // window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);        
    }
);


export default api;
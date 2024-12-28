

export const baseURL=import.meta.env.VITE_API_URL;
//console.log(baseUrl);


const summaryApi={
    register:{
        url:"/api/user/register",
        method:"post"
    },
    login:{
        url:"/api/user/login",
        method:"post"
    }
}

export default summaryApi;
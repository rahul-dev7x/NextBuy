

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
    },
    forgot_password:{
        url:"/api/user/forgot-password",
        method:"put"
    },
    otp_verification:{
        url:"/api/user/verify-forgot-password",
        method:"put"
    },
    reset_password:{
        url:"/api/user/reset-password",
        method:"put"
    },
    logout:{
        url:"/api/user/logout",
        method:"get"
    },
    update_avatar:{
        url:"/api/user/upload-avatar",
        method:"put"
    },
    update_user:{
        url:"/api/user/update-user",
        method:"put"
    }
}

export default summaryApi;
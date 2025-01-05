

export const baseURL = import.meta.env.VITE_API_URL;
//console.log(baseUrl);


const summaryApi = {
    register: {
        url: "/api/user/register",
        method: "post"
    },
    login: {
        url: "/api/user/login",
        method: "post"
    },
    forgot_password: {
        url: "/api/user/forgot-password",
        method: "put"
    },
    otp_verification: {
        url: "/api/user/verify-forgot-password",
        method: "put"
    },
    reset_password: {
        url: "/api/user/reset-password",
        method: "put"
    },
    logout: {
        url: "/api/user/logout",
        method: "get"
    },
    update_avatar: {
        url: "/api/user/upload-avatar",
        method: "put"
    },
    update_user: {
        url: "/api/user/update-user",
        method: "put"
    },
    create_category: {
        url: "/api/category/create-category",
        method: "post"
    },
    get_category: {
        url: "/api/category/get-category",
        method: "get"
    },
    update_category: {
        url: "/api/category/update-category",
        method: "put"
    },
    delete_category: {
        url: "/api/category/delete-category",
        method: "delete"
    },
    create_subcategory: {
        url: "/api/subcategory/create-subcategory",
        method: "post"
    },
    all_subcategory: {
        url: "/api/subcategory/all-subcategory",
        method: "get"
    },
    update_subcategory: {
        url: "/api/subcategory/update-subcategory",
        method: "put"
    },
    delete_subcategory: {
        url: "/api/subcategory/delete-subcategory",
        method: "delete"

    },
    upload_image:{
        url:"/file/upload",
        method:"post"
    }
}

export default summaryApi;
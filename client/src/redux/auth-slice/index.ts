import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {
    id: null,
    name: "",
    email: "",
    avatar: "",
    mobile: "",
    address: [],
    last_login_date: "",
    order_history: [],
    shopping_cart: [],
    role: "",
    status: "",
  },
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const userData = action.payload;
      state.user = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
        mobile: userData.mobile,
        address: userData.address || [],  
        last_login_date: userData.last_login_date,
        order_history: userData.order_history || [],
        shopping_cart: userData.shopping_cart || [],
        role: userData.role,
        status: userData.status,
      };
      state.isAuthenticated = true;
      //console.log("slice_actions", action.payload);
    },
    logout:(state)=>{
      state.user=initialState.user;
      state.isAuthenticated=false
    },
    setAvatar:(state,action)=>{
      state.user.avatar=action.payload;
    },
    setUserDetails: (state, action) => {
      const userData = action.payload;
      //console.log("user_slice",userData)
      state.user = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
        mobile: userData.mobile,
        address: userData.address || [],  
        last_login_date: userData.last_login_date,
        order_history: userData.order_history || [],
        shopping_cart: userData.shopping_cart || [],
        role: userData.role,
        status: userData.status,
      };
    }
    
    
  },
});

export const { setUser ,logout,setAvatar,setUserDetails} = authSlice.actions;

export default authSlice.reducer;

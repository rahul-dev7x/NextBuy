import { createSlice } from "@reduxjs/toolkit";


const initialState={
    subCategory:[]
}


const subCategorySlice=createSlice({
    name:"subcategory",
    initialState,
    reducers:{
        setSubCategory:(state,action)=>{
            state.subCategory=action.payload;
        }

    }
})


export const {setSubCategory}=subCategorySlice.actions;

export default subCategorySlice.reducer;
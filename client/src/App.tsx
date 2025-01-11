import { Outlet } from "react-router-dom"
import Header from "./components/shared/Header"
import Footer from "./components/shared/Footer"
import AxiosError from "./utills/AxiosError";
import { useDispatch } from "react-redux";
import Axios from "./utills/Axios";
import summaryApi from "./common/SummaryApi";
import { setCategory, setLoading } from "./redux/category";
import { setSubCategory } from "./redux/subcategory";
import { useEffect } from "react";


const App = () => {
  const dispatch=useDispatch();

  const fetchCategory = async () => {
    try {
      dispatch(setLoading(true))
      const response = await Axios({ ...summaryApi.get_category });
      if (response.data.success) {
        dispatch(setCategory(response.data.data));
      }
    } catch (error) {
      AxiosError(error);
    }
    finally{
      dispatch(setLoading(false))
    }
  };
  const fetchSubCategory=async()=>{
    try{
      const response=await Axios({...summaryApi.all_subcategory})
      console.log("fetch_all_subc",response);
      if(response.data.success)
      {
        dispatch(setSubCategory(response.data.data))
      }

    }
    catch(error)
    {
      AxiosError(error);
    }
  }
  useEffect(()=>{
fetchCategory();
fetchSubCategory()
  },[])

  return (
    <div>
      <Header/>
      <main className="min-h-[78vh] mt-[89px]">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default App

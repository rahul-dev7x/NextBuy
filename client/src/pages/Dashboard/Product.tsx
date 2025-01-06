import summaryApi from "@/common/SummaryApi"
import ProductCard from "@/components/shared/ProductCard"
import { Button } from "@/components/ui/button"
import Axios from "@/utills/Axios"
import AxiosError from "@/utills/AxiosError"
import { useEffect, useState } from "react"
import {IoSearchOutline} from "react-icons/io5"
const Product = () => {
const [products,setProducts]=useState<any[]>([])
const [page,setPage]=useState(1);
const [totalPageCount,setTotalPageCount] = useState(1);
const [search,setSearch]=useState("")
//console.log(totalPageCount)

//console.log("products",products)
  const getProducts=async()=>{
    try{
      const response=await Axios({...summaryApi.get_product,data:{
        page:page,
        limit:2,
        search
      }
      })
      console.log(response.data)
      if(response.data.success)
      {
        setProducts(response.data.products);
        setTotalPageCount(response.data.totalPages)
      }

    }
    catch(error)
    {
      AxiosError(error)
    }
  }
  useEffect(()=>{
    getProducts()
    },[page])
    const handlePrevChange=()=>{
    if(page>1)
    {
      setPage(prev=>prev-1)
    }
    }
    const handleNextChange=()=>{
      if(page!=totalPageCount)
      {
        setPage(prev=>prev+1)
      }
    }
    //console.log("prev",page)
    //console.log("next",page)
    const handleOnChange=(e)=>{
      const {value}=e.target
      setSearch(value);
      setPage(1);

    }
    useEffect(()=>{
      let flag=true;
      const interval=setTimeout(()=>{
        if(flag)
        {
          getProducts();
          flag=false
        }
      },300)
      return ()=>{
        clearTimeout(interval)
      }

    },[search])

  return (
    <div className="flex flex-col gap-5">
      <div className='p-2  bg-white shadow-md flex items-center justify-between gap-4'>
                <h2 className='font-semibold'>Product</h2>
                <div className='h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded  border focus-within:border-primary-200'>
                  <IoSearchOutline size={25}/>
                  <input
                    type='text'
                    placeholder='Search product here ...' 
                    className='h-full w-full  outline-none bg-transparent'
                    value={search}
                    onChange={handleOnChange}
                  />
                </div>
                </div>
      <div className="min-h-[400px]">
      <div className="grid grid-cols-6 gap-4 ">
      {
        products.map((pr,index)=>{
          return(
            
            <ProductCard data={pr} key={index}/>
          )
        })
      }
      </div>
      </div>
      <div className="flex justify-between items-center">

      <Button onClick={handlePrevChange}>
        Previous
      </Button>
      <p>{page}/{totalPageCount}</p>
      <Button onClick={handleNextChange}>Next</Button>

      </div>
     
     
    </div>

  )
}

export default Product

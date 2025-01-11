import { useSelector } from "react-redux"
import bannerImg from "../../assets/banner.jpg"
import { useNavigate } from "react-router-dom";
import { createReadableUrl } from "@/utills/readableUrl";

const Home = () => {
  const { category } = useSelector(state => state.category);
  const {loading}=useSelector(state=>state.category);
  const {subCategory}=useSelector(state=>state.subcategory);
  //console.log(category)
  const navigate=useNavigate()
  const handleRedirect=(id,name)=>{
    //console.log(id,name)
    const subcategory=subCategory.find(sub=>{
      const filterData=sub.category.some(c=>{
        return c._id===id
      }
      )
      return filterData?true:null
    })
    //console.log(subcategory)
    const url=`${createReadableUrl(name)}-${id}/${createReadableUrl(subcategory.name)}-${subcategory._id}`;
//navigate(url)
console.log(url)
  }
  return (
    <section>
      <div className="container mx-auto my-4  px-4 ">
        <div className={`min-h-48 w-full h-full bg-blue-100 rounded ${!bannerImg && "animate-pulse"}`}>
          <img src={bannerImg} />
        </div>
      </div>
      <div className="container grid grid-cols-8 gap-3 mx-auto p-4">
        {
          loading?(
            new Array(12).fill(null).map((item, index) => {
              return (
                  <div className="bg-white rounded p-4 min-h-36 grid gap-2 shadow-md animate-pulse" key={index}>
                  <div className="min-h-24 bg-blue-100 rounded"></div>
                  <div className="h-8 bg-blue-100 rounded">
                  </div>
                </div>
  
              )
            })
          ):(
            category.map((cat,index)=>{
              return(
                <div key={index} className="w-full h-full" onClick={()=>handleRedirect(cat._id,cat.name)}>
                  <div className="">
                    <img src={cat.image} className="w-full h-full object-scale-down"/>
                  </div>
                </div>

              )
            })
          )

         
        }

      </div>

    </section>
  )
}

export default Home

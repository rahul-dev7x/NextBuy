import { useSelector } from "react-redux"
import bannerImg from "../../assets/banner.jpg"

const Home = () => {
  const { category } = useSelector(state => state.category);
  const {loading}=useSelector(state=>state.category)
  console.log(category)
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
                  <div className="bg-white rounded p-4 min-h-36 grid gap-2 shadow-md animate-pulse">
                  <div className="min-h-24 bg-blue-100 rounded"></div>
                  <div className="h-8 bg-blue-100 rounded">
                  </div>
                </div>
  
              )
            })
          ):(
            category.map((cat,index)=>{
              return(
                <div key={index} className="w-full h-full">
                  <div>
                    <img src={cat.image}/>
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

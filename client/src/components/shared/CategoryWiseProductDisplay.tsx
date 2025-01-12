import summaryApi from "@/common/SummaryApi";
import Axios from "@/utills/Axios";
import AxiosError from "@/utills/AxiosError";
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import CardProduct from "./CardProduct";
import CardLoading from "./CardLoading";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    console.log("data", data)
    const containerRef = useRef()

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...summaryApi.get_product_by_category, data: {
                    id: id
                }
            })
            console.log("response", response)
            if (response.data.success) {
                setData(response.data.data)
            }

        }
        catch (error) {
            AxiosError(error);
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    const leftClick = () => {
        containerRef.current.scrollLeft -= 200
    }
    const rightClick = () => {
        containerRef.current.scrollLeft += 200
    }
    const cardNumbers = new Array(6).fill(null)


    return (
        <div>
            <div className="container mx-auto p-4 flex justify-between items-center gap-4">
                <h3>{name}</h3>
                <Link to="" className="text-green-600 hover:text-green-400">See all</Link>
            </div>
            <div className="flex items-center relative">
                <div className="container gap-8 mx-auto px-6 flex overflow-hidden scroll-smooth" ref={containerRef}>
                    {loading && (
                        cardNumbers.map((item, index) => {
                            return (
                                <CardLoading key={index} />
                            )
                        })
                    )}
                    {
                        data.map((cat, index) => {
                            return (
                                <CardProduct key={index} data={cat} />

                            )
                        })
                    }
                </div>
                <div className="absolute  flex justify-between left-0 right-0 p-12 mx-auto">
                    <button onClick={leftClick} className=" bg-white rounded-full shadow-md p-2"><MdKeyboardArrowLeft size={24} /></button>
                    <button onClick={rightClick} className="bg-white rounded-full shadow-md p-2"><MdKeyboardArrowRight size={24} /></button>
                </div>
            </div>


        </div>
    )
}

export default CategoryWiseProductDisplay

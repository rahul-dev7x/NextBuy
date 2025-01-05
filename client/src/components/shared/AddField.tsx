import { RxCross2 } from "react-icons/rx"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

const AddField=({close,value,onChange,submit})=>{
    return(

<div className="bg-black bg-opacity-50 flex justify-center items-center fixed inset-0 ">
    <div className="bg-white p-6 ">
        <div className="flex justify-between items-center gap-2 w-[400px] mb-4">
<h1 className="font-semibold text-xl">Add More Field</h1>
<RxCross2 size={24} className="cursor-pointer" onClick={close}/>
        </div>

        <div className="space-y-2">
            <Label>Add Field:</Label>
            <Input type="text" value={value} onChange={onChange}/>
            <button
                onClick={submit}
                className='bg-blue-500 text-white  hover:bg-primary-100 px-4 py-2 rounded mx-auto w-fit block'
            >Add Field</button>
        </div>
    </div>
</div>
    )
}

export default AddField
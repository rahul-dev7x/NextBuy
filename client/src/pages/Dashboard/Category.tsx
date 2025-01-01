import summaryApi from '@/common/SummaryApi';
import CreateCategoryModal from '@/components/shared/CreateCategoryModal';
import DeleteCategory from '@/components/shared/DeleteCategory';
import EditCategory from '@/components/shared/EditCategory';
import { Button } from '@/components/ui/button';
import { setCategory } from '@/redux/category';
import Axios from '@/utills/Axios';
import AxiosError from '@/utills/AxiosError';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



const Category = () => {
  const dispatch = useDispatch();
  const { category } = useSelector(
    state=>state.category
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteData,setDeleteData]=useState(null)
  console.log("edit_data",editData);
  console.log("delete_data",deleteData)

  const fetchCategory = async () => {
    try {
      const response = await Axios({ ...summaryApi.get_category });
      if (response.data.success) {
        dispatch(setCategory(response.data.data));
      }
    } catch (error) {
      AxiosError(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div>
      {/* Upper side */}
      <div className="bg-white shadow-md w-full rounded-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl">Category</h1>
          <Button onClick={() => setIsOpenModal(true)}>Create Category</Button>
        </div>
      </div>

      {/* Down Side */}
      <div className="p-4 bg-white shadow-md rounded-sm mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 cursor-pointer">
          {category && category.length > 0 ? (
            category.map((item, index: number) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-md p-2 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover mb-4"
                />
                <p className="text-sm font-medium text-gray-700">{item.name}</p>
                <div className="flex justify-between items-center gap-3 mt-4">
                  <button
                    className="bg-blue-400 px-2 text-white rounded"
                    onClick={() => {
                      setIsEditOpen(true);
                      setEditData(item);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-700 px-2 text-white rounded"
                    onClick={() => {setIsDeleteOpen(true);setDeleteData(item)}}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No Categories Found</p>
          )}
        </div>

        {/* Modals */}
        {isOpenModal && (
          <CreateCategoryModal
            fetchCategory={fetchCategory}
            close={() => setIsOpenModal(false)}
          />
        )}
        {isEditOpen && editData && (
          <EditCategory
            close={() => setIsEditOpen(false)}
            editData={editData}
            fetchCategory={fetchCategory}
          />
        )}
        {isDeleteOpen && (
          <DeleteCategory
            close={() => setIsDeleteOpen(false)}
            deleteData={deleteData}
            fetchCategory={fetchCategory}
          />
        )}
      </div>
    </div>
  );
};

export default Category;

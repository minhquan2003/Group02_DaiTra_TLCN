import {getProductByCategory} from '../../../hooks/Products';
import { useParams } from 'react-router-dom';
import ListProductCard from '../ListProducts/ListProductCard'
import BackButton from '../../../commons/BackButton'

const ProductByCategogy = () => {   
    const { categoryId } = useParams();
    const { products, loading, error } = getProductByCategory(categoryId);
    return(
        <div className="p-5">
            <div className="flex items-center mb-4">
                <BackButton />
                {/* <h1 className="text-2xl font-bold ml-4">Thanh Toán</h1> */}
            </div>
        <div className="w-screen h-auto flex flex-col justify-center items-center bg-main overflow-x-hidden">
            {/* <h1>Danh sách các sản phẩm của: {nameCategogy}</h1> */}
            <ListProductCard data={{ products, loading, error }} />
        </div>
        </div>
    );
}

export default ProductByCategogy;
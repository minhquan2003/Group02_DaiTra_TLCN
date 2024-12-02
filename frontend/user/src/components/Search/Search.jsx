import {getProductByName} from '../../hooks/Products';
import { useParams, useLocation  } from 'react-router-dom';
import ListProductCard from '../Home/ListProducts/ListProductCard'
import BackButton from '../../commons/BackButton'

const ProductByName = () => {   
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const name = query.get('name');
    const { products, loading, error } = getProductByName(name);
    const data = products.data;
    // alert("Hai " + JSON.stringify({products}))
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

export default ProductByName;
import axios from 'axios';

const createOrder = async (info) => {
    try {
        const response = await axios.post(`http://localhost:5555/orders`, info);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm này
    }
};

const updateOrder = async (id, status_order) => {
    try {
        alert(id + "  " + status_order)
        const response = await axios.put(`http://localhost:5555/orders/${id}`, {status_order});
        const data = response.data;
        alert(JSON.stringify(data))
        return data;
    } catch (error) {
        console.error('Error update product:', error);
        throw error;
    }
};

export {createOrder, updateOrder};
import axios from 'axios';

const createOrder = async (info) => {
    try {
        const response = await axios.post(`http://localhost:5555/orders`, info);
        const data = response.data;
        alert( " một " + JSON.stringify(data))
        return data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm này
    }
};

export {createOrder};
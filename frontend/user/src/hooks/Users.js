import axios from 'axios';

const updateProfile = async (id, info) => {
    try {
        const response = await axios.put(`http://localhost:5555/users/${id}`, info);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm này
    }
};

export {updateProfile};
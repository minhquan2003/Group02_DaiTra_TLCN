// backend/controllers/userController.js
import { createUser } from '../services/userService.js';

// Thêm người dùng mới
export const addUser = async (req, res) => {
    try {
        // Kiểm tra các trường bắt buộc
        if (
            !req.body.user_id ||
            !req.body.email ||
            !req.body.username ||
            !req.body.password ||
            !req.body.name ||
            !req.body.address ||
            !req.body.phone ||
            !req.body.avatar_url ||
            !req.body.role ||
            // !req.body.created_at ||
            // !req.body.updated_at ||
            !req.body.status
        ) {
            return res.status(400).send({
                message: 'Send all required fields: user_id, email, username, password, name, address, phone, avatar_url, role, created_at, updated_at, status',
            });
        }

        const user = await createUser(req.body);
        return res.status(201).send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};
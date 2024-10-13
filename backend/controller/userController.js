import {User} from '../models/Users.js';

export const addUser = async (request, response)=>{
    try{
        if(
            !request.body.user_id ||
            !request.body.email ||
            !request.body.username ||
            !request.body.password ||
            !request.body.name ||
            !request.body.address ||
            !request.body.phone ||
            !request.body.avatar_url ||
            !request.body.role ||
            !request.body.created_at ||
            !request.body.updated_at ||
            !request.body.status
        ){
            return response.status(400).send({
                message: 'Send all required fields: user_id, email, username, password, name, address, phone, avatar_url, role, created_at, updated_at, status',
            });
        }
        const newUser = {
            user_id: request.body.user_id,
            email: request.body.email,
            username: request.body.username,
            password: request.body.password,
            name: request.body.name,
            address: request.body.address,
            phone: request.body.phone,
            avatar_url: request.body.avatar_url,
            role: request.body.role,
            created_at: request.body.created_at,
            updated_at: request.body.updated_at,
            status: request.body.status,
        };
        const user = await User.create(newUser);
        return response.status(201).send(user);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
};


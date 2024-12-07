import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {updateProfile} from '../../hooks/Users'

const EditProfile = () => {
    const userInfoString = sessionStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar_url, setAvatar_url] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            setEmail(userInfo.email || '');
            setUsername(userInfo.username || '');
            setName(userInfo.name || '');
            setAddress(userInfo.address || '');
            setPhone(userInfo.phone || '');
            setAvatar_url(userInfo.avatar_url || '');
        }
    }, []);

    const handleEdit = () => {
        if(userInfo){
            setIsEditing(true);
        }else{
            alert("Bạn chưa đăng nhập!")
        }
        
    };

    const handleSave = (e) => {
        e.preventDefault();
        const updatedUserInfo = {
            email,
            username,
            name,
            address,
            phone,
            avatar_url
        };
        updateProfile(userInfo._id, updatedUserInfo);
        alert('Thông tin cá nhân đã được cập nhật!');
        setIsEditing(false); // Đặt lại chế độ chỉnh sửa
        navigate(`/profile/${userInfo._id}`); // Chuyển hướng đến trang profile
    };

    return (
        <div className="max-w-3xl mx-auto p-4 flex">
            {/* Khung hình đại diện */}
            <div className="w-1/3 flex justify-center items-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                    {avatar_url ? (
                        <img
                            src={avatar_url}
                            alt="Avatar"
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        <span className="text-gray-500">No Image</span>
                    )}
                </div>
            </div>

            {/* Thông tin cá nhân */}
            <div className="w-2/3 ml-4">
                <form onSubmit={handleSave}>
                    <div className="flex mb-4">
                        <div className="w-1/2 pr-2">
                            <label className="block text-sm font-medium">Họ tên</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                readOnly={!isEditing}
                                className={`mt-1 block w-full border rounded-md p-2 ${isEditing ? '' : 'bg-gray-200'}`}
                            />
                        </div>
                        <div className="w-1/2 pl-2">
                            <label className="block text-sm font-medium">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                readOnly={!isEditing}
                                className={`mt-1 block w-full border rounded-md p-2 ${isEditing ? '' : 'bg-gray-200'}`}
                            />
                        </div>
                    </div>
                    <div className="flex mb-4">
                        <div className="w-1/2 pr-2">
                            <label className="block text-sm font-medium">Số điện thoại</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                readOnly={!isEditing}
                                className={`mt-1 block w-full border rounded-md p-2 ${isEditing ? '' : 'bg-gray-200'}`}
                            />
                        </div>
                        <div className="w-1/2 pl-2">
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                readOnly={!isEditing}
                                className={`mt-1 block w-full border rounded-md p-2 ${isEditing ? '' : 'bg-gray-200'}`}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Địa chỉ</label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            readOnly={!isEditing}
                            className={`mt-1 block w-full border rounded-md p-2 ${isEditing ? '' : 'bg-gray-200'}`}
                            rows="3"
                        />
                    </div>
                    {/* Nút chỉnh sửa và lưu */}
                    <button type="button" onClick={handleEdit} className="bg-green-500 text-white p-2 rounded-md">Chỉnh sửa</button>
                    <button type="button" className="bg-green-500 text-white p-2 rounded-md">Huỷ</button>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Lưu</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
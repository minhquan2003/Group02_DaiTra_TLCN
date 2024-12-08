import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../hooks/Users';

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
    const [isPartnerRegistration, setIsPartnerRegistration] = useState(false);
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
        if (userInfo) {
            setIsEditing(true);
        } else {
            alert("Bạn chưa đăng nhập!");
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        const updatedUserInfo = { email, username, name, address, phone, avatar_url };
        const aa = updateProfile(userInfo._id, updatedUserInfo);
        // sessionStorage.setItem("userInfo", JSON.stringify(aa.data));
        alert('Thông tin cá nhân đã được cập nhật!');
        setIsEditing(false);
        navigate(`/profile/${userInfo._id}`);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset the form fields to the initial values
        if (userInfo) {
            setEmail(userInfo.email || '');
            setUsername(userInfo.username || '');
            setName(userInfo.name || '');
            setAddress(userInfo.address || '');
            setPhone(userInfo.phone || '');
            setAvatar_url(userInfo.avatar_url || '');
        }
    };

    const handleRegisterAsPartner = () => {
        setIsPartnerRegistration(true);
    };

    const handleConfirmPartnerRegistration = () => {
        alert('Đăng ký đối tác đang chờ xác nhận!');
        const role = 'regisPartner'
        const updatedUserInfo = { email, username, name, address, phone, avatar_url, role };
        updateProfile(userInfo._id, updatedUserInfo);
        setIsPartnerRegistration(false);
        // You may want to update the user state or perform additional actions here
    };

    const handleCancelPartnerRegistration = () => {
        setIsPartnerRegistration(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Chỉnh Sửa Thông Tin Cá Nhân</h2>
            <div className="flex mb-6">
                <div className="w-1/3 flex justify-center items-center">
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {avatar_url ? (
                            <img src={avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-500">No Image</span>
                        )}
                    </div>
                </div>
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
                                    className={`mt-1 block w-full border rounded-md p-2 ${isEditing ? 'border-blue-500' : 'bg-gray-200'}`}
                                />
                            </div>
                            <div className="w-1/2 pl-2">
                                <label className="block text-sm font-medium">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    readOnly={!isEditing}
                                    className={`mt-1 block w-full border rounded-md p-2 ${isEditing ? 'border-blue-500' : 'bg-gray-200'}`}
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
                                    className={`mt-1 block w-full border rounded-md p-2 ${isEditing ? 'border-blue-500' : 'bg-gray-200'}`}
                                />
                            </div>
                            <div className="w-1/2 pl-2">
                                <label className="block text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    readOnly={!isEditing}
                                    className={`mt-1 block w-full border rounded-md p-2 ${isEditing ? 'border-blue-500' : 'bg-gray-200'}`}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Địa chỉ</label>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                readOnly={!isEditing}
                                className={`mt-1 block w-full border rounded-md p-2 ${isEditing ? 'border-blue-500' : 'bg-gray-200'}`}
                                rows="3"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            {!isEditing && (
                                <>
                                    <button type="button" onClick={handleEdit} className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Chỉnh sửa</button>
                                    <button type="button" onClick={handleRegisterAsPartner} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Đăng ký đối tác</button>
                                </>
                            )}
                            {isEditing && (
                                <>
                                    <button type="button" onClick={handleCancel} className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600">Huỷ</button>
                                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Lưu</button>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {isPartnerRegistration && (
                <div className="mt-6 p-4 border border-gray-300 rounded-md">
                    <h3 className="text-lg font-semibold mb-2">Yêu cầu đăng ký đối tác</h3>
                    <ul className="list-disc ml-5">
                        <li>Cập nhật thông tin cá nhân chính xác và minh bạch.</li>
                        <li>Cam kết thực hiện các giao dịch một cách trung thực.</li>
                        <li>Chịu trách nhiệm về các sản phẩm và dịch vụ mà bạn cung cấp.</li>
                        <li>Đảm bảo tuân thủ các quy định của nền tảng.</li>
                    </ul>
                    {userInfo.role === 'user' ? 
                    
                        <div className="flex justify-end mt-4 space-x-2">
                            <button type="button" onClick={handleConfirmPartnerRegistration} className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Xác nhận đăng ký</button>
                            <button type="button" onClick={handleCancelPartnerRegistration} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">Huỷ đăng ký</button>
                        </div>
                        
                    :<button type="button" className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Yêu cầu đăng ký của bạn đang chờ xác nhận</button> }
                    
                </div>
            )}
        </div>
    );
};

export default EditProfile;
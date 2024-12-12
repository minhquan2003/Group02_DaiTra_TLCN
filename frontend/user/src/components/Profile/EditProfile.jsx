import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../hooks/Users';
import BackButton from '../../commons/BackButton';

const EditProfile = () => {
    const userInfoString = sessionStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);
    const [qrImage, setQrImage] = useState(null);
    const [qrUrl, setQrUrl] = useState('');
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
            setQrUrl(userInfo.qrPayment || '');
        }
    }, [userInfo]);

    const handleEdit = () => {
        if (userInfo) {
            setIsEditing(true);
        } else {
            alert("Bạn chưa đăng nhập!");
        }
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setAvatarFile(selectedImage);
    };

    const handleQrChange = (e) => {
        const selectedQrImage = e.target.files[0];
        setQrImage(selectedQrImage);
    };

    const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "images_preset");
        formData.append("cloud_name", "dd6pnq2is");

        const response = await fetch('https://api.cloudinary.com/v1_1/dd6pnq2is/image/upload', {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        return data.secure_url; // Trả về URL của ảnh đã upload
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const updatedUserInfo = { email, username, name, address, phone, qrPayment: qrUrl };

        try {
            // Upload mã QR nếu có
            if (qrImage) {
                const uploadedQrUrl = await uploadImage(qrImage);
                updatedUserInfo.qrPayment = uploadedQrUrl; // Lưu URL mã QR
            }

            // Cập nhật thông tin cá nhân
            await updateProfile(userInfo._id, updatedUserInfo);
            alert('Thông tin cá nhân đã được cập nhật!');
            setIsEditing(false);
            navigate(`/profile/${userInfo._id}`);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Đã có lỗi xảy ra, vui lòng thử lại.');
        }
    };

    const handleAvatarSave = async () => {
        if (avatarFile) {
            try {
                const uploadedAvatarUrl = await uploadImage(avatarFile);
                await updateProfile(userInfo._id, { avatar_url: uploadedAvatarUrl });
                alert('Hình đại diện đã được cập nhật!');
                setAvatarFile(null); // Đặt lại trạng thái sau khi lưu
            } catch (error) {
                console.error('Error updating avatar:', error);
                alert('Đã có lỗi xảy ra khi cập nhật hình đại diện, vui lòng thử lại.');
            }
        } else {
            alert('Vui lòng chọn hình đại diện mới!');
        }
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
            setQrUrl(userInfo.qrPayment || '');
        }
    };

    const handleRegisterAsPartner = () => {
        setIsPartnerRegistration(true);
    };

    const handleConfirmPartnerRegistration = async () => {
        alert('Đăng ký đối tác đang chờ xác nhận!');
        const updatedUserInfo = { email, username, name, address, phone, avatarFile, role: 'regisPartner' };
        await updateProfile(userInfo._id, updatedUserInfo);
        setIsPartnerRegistration(false);
    };

    const handleCancelPartnerRegistration = () => {
        setIsPartnerRegistration(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-4">
                <BackButton />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Chỉnh Sửa Thông Tin Cá Nhân</h2>
            <div className="flex mb-6">
                <div className="w-1/3 justify-center items-center">
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {userInfo.avatar_url ? (
                            <img src={userInfo.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-500">No Image</span>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-2 block w-full border rounded-md p-2"
                    />
                    <button onClick={handleAvatarSave} className="mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                        Thay đổi hình đại diện
                    </button>
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
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Mã QR</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleQrChange}
                                className={`mt-1 block w-full border rounded-md p-2 ${isEditing ? 'border-blue-500' : 'bg-gray-200'}`}
                                disabled={!isEditing}
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
                    : <button type="button" className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Yêu cầu đăng ký của bạn đang chờ xác nhận</button>}
                </div>
            )}
        </div>
    );
};

export default EditProfile;
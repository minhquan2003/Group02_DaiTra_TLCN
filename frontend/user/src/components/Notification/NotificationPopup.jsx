import React from 'react';
import { updateNotification } from '../../hooks/Notifications';

const NotificationPopup = ({ notifications, onClose }) => {

    const handleRead = async (id) => { 
        const readed = true;
        const aa = await updateNotification(id, readed);
    };

    return (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded shadow-lg p-4 z-50">
            <h3 className="font-bold mb-2">Thông Báo</h3>
            {notifications.length > 0 ? (
                <ul>
                    {notifications.map((notification) => (
                        <li
                            onClick={() => handleRead(notification._id)}
                            key={notification._id}
                            className={`border-b-2 border-yellow-300 py-1 cursor-pointer ${!notification.readed ? 'font-bold' : 'font-normal'}`} // Thay đổi kiểu chữ
                        >
                            #{notification._id}<br/>
                            {notification.message}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Không có thông báo nào.</p>
            )}
            <button onClick={onClose} className="mt-2 text-blue-500">
                Đóng
            </button>
        </div>
    );
};

export default NotificationPopup;
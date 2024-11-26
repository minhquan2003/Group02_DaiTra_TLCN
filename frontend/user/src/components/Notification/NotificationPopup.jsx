import React from 'react';

const NotificationPopup = ({ notifications, onClose }) => {
    return (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded shadow-lg p-4 z-50">
            <h3 className="font-bold mb-2">Thông Báo</h3>
            {notifications.length > 0 ? (
                <ul>
                    {notifications.map((notification) => (
                        <li key={notification._id} className="border-b-2 border-yellow-300 py-1">
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
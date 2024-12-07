import React, { useState } from "react";
import PropTypes from "prop-types"; // Import prop-types

const NotificationPost = ({ onAddNotification }) => {
  const [message, setMessage] = useState("");

  const handlePost = () => {
    if (message.trim()) {
      onAddNotification({ message, status: true });
      setMessage("");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Enter your notification message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ padding: "10px", width: "70%", marginRight: "10px" }}
      />
      <button onClick={handlePost} style={{ padding: "10px 20px" }}>
        Post
      </button>
    </div>
  );
};

NotificationPost.propTypes = {
  onAddNotification: PropTypes.func.isRequired, // Xác định kiểu dữ liệu cho prop
};

export default NotificationPost;

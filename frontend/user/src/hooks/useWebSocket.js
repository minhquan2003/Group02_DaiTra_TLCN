import { useEffect, useRef } from 'react';

const useWebSocket = (url) => {
    const websocket = useRef(null);

    useEffect(() => {
        // Tạo kết nối WebSocket
        websocket.current = new WebSocket(url);

        websocket.current.onopen = () => {
            console.log('WebSocket connection established');
        };

        websocket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            // Xử lý thông điệp nhận được
            console.log('Message from server:', message);
        };

        websocket.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        websocket.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Dọn dẹp khi component unmount
        return () => {
            websocket.current.close();
        };
    }, [url]);

    return websocket.current;
};

export default useWebSocket;
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import './FloatingAlert.css'; // We'll create this CSS file next

interface FloatingAlertProps {
    message: React.ReactNode;
    type?: string;
    show: boolean;
    onClose?: () => void;
}

const FloatingAlert: React.FC<FloatingAlertProps> = ({ message, type = 'success', show, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                if (onClose) onClose();
            }, 3000); // Alert disappears after 3 seconds
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
            return undefined;
        }
    }, [show, onClose]);

    if (!isVisible && !show) return null; // Only render when needed for animation

    return (
        <div className={`floating-alert-container slide-right ${isVisible ? 'show' : ''}`}>
            <Alert variant={type} onClose={() => { setIsVisible(false); if (onClose) onClose(); }} dismissible>
                {message}
            </Alert>
        </div>
    );
};

export default FloatingAlert;
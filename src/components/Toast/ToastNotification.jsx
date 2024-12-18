import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastNotification = () => {
    return (
        <ToastContainer
            position="top-center"
            autoClose={5000}
        />
    )
}
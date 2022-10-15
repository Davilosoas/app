import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = () => toast("Wow so easy!");

export const toastSuccess = (message: string) => toast.success(message, { autoClose: 2000, theme: "colored" });

export const toastError = (message: string) => toast.error(message, { autoClose: 2000, theme: "colored" });




import { Bounce, Slide, toast } from "react-toastify";

export const SuccessAlert  = ( message, time, position ) => {
    return toast.success(message, {
        position: position,
        autoClose: time,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
    });
}

export const ErrorAlert  = ( message, time, position ) => {
    return toast.error(message, {
        position: position,
        autoClose: time,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
    });
}

export const WarningAlert  = ( message, time, position ) => {
    return toast.warn(message, {
        position: position,
        autoClose: time,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
}
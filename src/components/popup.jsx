import { useContext, useEffect, useState } from "react"
import { AppState } from "../App"
import { gsap } from "gsap/gsap-core"
import { ToastContainer, toast } from 'react-toastify';
import "./popup.css"

export default function PopUp() {
    const state = useContext(AppState)
    const notify = () => toast("Link copied to clipboard.",
        {
            position: "top-left",
            autoClose: 1700,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light"
        }
    );
    
    useEffect(() => {
        if (state.data.popup > 0) {
            notify()
        }
    }, [state.data.popup])

    return (
        <>
            {/* <ToastContainer /> */}
        </>
    )
}
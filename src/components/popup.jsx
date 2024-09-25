import { useContext, useEffect, useState } from "react"
import { AppState } from "../App"
import { gsap } from "gsap/gsap-core"
import "./popup.css"

export default function PopUp() {
    const state = useContext(AppState)
    useEffect(() => {
        if (state.data.popup > 0) {
            gsap.to(".popup", { x: 450, delay: 0})
            gsap.to(".popup", { opacity: 0, delay: 1 })
            gsap.to(".popup", { x: -450, delay: 2 })
            gsap.to(".popup", { opacity: 1, delay: 3 })
        }
    }, [state.data.popup])

    return (
        <>
            <div className="popup notranslate">
                Link copied to clipboard.
            </div>
        </>
    )
}
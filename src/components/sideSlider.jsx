import { useContext, useEffect, useRef } from "react"
import { AppState } from "../App"
import { gsap } from "gsap";

import "./sideSlider.css"

export default function SideScreen() {
    const sideWindow = useRef()
    const state = useContext(AppState)

    function switchFilters(screen) {
        switch (screen) {
            case "filter":
                return (
                    <ul className="filter-List">
                        <li onClick={() => state.dispatch({ type: "filter_type", payload: "price" })}><span>Price</span></li>
                        <li onClick={() => state.dispatch({ type: "filter_type", payload: "city" })}><span >City</span></li>
                        <li onClick={() => state.dispatch({ type: "filter_type", payload: "date" })}><span >Date</span></li>
                        <li onClick={() => state.dispatch({ type: "filter_type", payload: "phone" })}><span>Phone</span></li>
                    </ul>
                )
            case "language":
                return (
                    <ul className="filter-List">
                        <li><span>RU</span></li>
                        <li><span>ENG</span></li>
                        <li><span>SPA</span></li>
                    </ul >
                )
            default:
                console.warn("Error in filter")
        }
    }

    function closeModal(event) {
        event.stopPropagation()
        state.dispatch({ type: "switch_side_window", payload: "closed" })
    }

    useEffect(() => {
        if (state.data.sideWindow === "opened") {
            gsap.to(sideWindow.current, {
                xPercent: -100
            })
        } else {
            gsap.to(sideWindow.current, {
                xPercent: 0
            })
        }
    }, [state.data.sideWindow])

    return (
        <div ref={sideWindow} className="side-screen" onClick={(event) => closeModal(event)}>
            {switchFilters(state.data.filter)}
        </div>
    )
}
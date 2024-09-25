import { useContext, useEffect, useRef } from "react"
import { AppState } from "../App"
import { gsap } from "gsap";
import { useLocalStorage } from "../hooks/useLocalStorage";

import "./sideSlider.css"

export default function SideScreen() {
    const [lang, setLang] = useLocalStorage()
    const sideWindow = useRef()
    const state = useContext(AppState)

    const languages = [
        [navigator.language.split("-")[0], "Your language"],
        ["ru", "Русский"],
        ["en", "English"],
        ["be", "Беларуская"],
        ["uk", "Українська"],
        ["tr", "Türkçe"],
        ["pl","Polski"],
        ["ja","日本語"],
        ["it","Italiano"],
        ["de","Deutsch"],
        ["fr","Français"]
    ]
    function languageSelect(value) {
        setLang(value)
        state.dispatch({ type: "change_language" })
    }
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
                    <ul className="filter-List-lang notranslate">
                        {
                            languages.map(element => {
                                return <li onClick={() => { languageSelect(element[0]) }}><span>{element[1]}</span></li>
                            })
                        }
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
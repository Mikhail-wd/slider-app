import { useContext } from "react"
import settings from "../img/settings.svg"
import { AppState } from "../App"
import earth from "../img/earth.svg"
import "./control.css"

export default function Control() {
    const state = useContext(AppState)
    function openLang() {
        state.dispatch({ payload: "language", type: "filter" })
    }
    function openFilter() {
        state.dispatch({ payload: "filter", type: "filter" })
    }
    return (
        <>
            <div className="sidebar-controller">
                <div className="sidebar-language"
                    onClick={() => openLang()}
                ><img src={earth} alt="language" /></div>
                <div className="sidebar-settings"
                    onClick={() => openFilter()}
                ><img src={settings} alt="settings" /></div>
            </div>
        </>
    )
}
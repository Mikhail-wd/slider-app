import { useContext, useEffect, useState } from "react"
import settings from "../img/settings.svg"
import { AppState } from "../App"
import earth from "../img/earth.svg"

import search from "../img/search.svg"
import "./control.css"

export default function Control() {
    const state = useContext(AppState)
    const [compState,setCompState] = useState("waiting")

    function waiting() {
        setTimeout(() => {
            setCompState("ready")
        }, 300)
    }

    function closeDownModals() {
        state.dispatch({ type: "switch_side_window", payload: "closed_side" })
        state.dispatch({ type: "switch_side_window", payload: "closed_down" })
    }
    function openLang() {
        waiting()
        closeDownModals()
        state.dispatch({ payload: ["language", "opened_side"], type: "filter" })
    }
    function openFilter() {
        waiting()
        closeDownModals()
        state.dispatch({ payload: ["filter", "opened_side"], type: "filter" })
    }
    function openSearch() {
        waiting()
        closeDownModals()
        state.dispatch({ payload: ["search", "opened_down"], type: "filter" })
    }
    useEffect(()=>{
        return ()=>{setCompState("waiting")}
    },[])
    return (
        <>
            <div className={compState === "ready" ? "sidebar-controller" : "sidebar-controller closing"}>
                <div className="sidebar-language"
                    onClick={() => openLang()}
                ><img src={earth} alt="language" /></div>
                <div className="sidebar-settings"
                    onClick={() => openFilter()}
                ><img src={settings} alt="settings" /></div>
                <div className="sidebar-settings"
                    onClick={() => openSearch()}
                ><img src={search} alt="search" /></div>
            </div>
        </>
    )
}
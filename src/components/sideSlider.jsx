import { useContext, useEffect, useRef, useState } from "react"
import { AppState } from "../App"
import { gsap } from "gsap";
import { useLocalStorage } from "../hooks/useLocalStorage";
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'


import "./sideSlider.css"

export default function SideScreen() {
    const [lang, setLang] = useLocalStorage()
    const sideWindow = useRef()
    const downWindow = useRef()
    const search = useRef()
    const state = useContext(AppState)

    const [sliderRef, instanceRef] = useKeenSlider({
        slides: {
            perView: 15
        },
        vertical: true,
    })

    const [compState, setCompState] = useState({
        searchField: "",
        selected: false,
        categories: []
    })

    const languages = [
        ["ru", "Русский"],
        ["en", "English"],
        ["be", "Беларуская"],
        ["uk", "Українська"],
        ["tr", "Türkçe"],
        ["pl", "Polski"],
        ["ja", "日本語"],
        ["it", "Italiano"],
        ["de", "Deutsch"],
        ["fr", "Français"]
    ]
    function categoryCutter(value) {
        if (value.length > 15) {
            return value.slice(0, 13) + "..."
        } else {
            return value
        }
    }
    function filterRequest(filterName, filterId, event) {
        closeModal(event)
        try {
            fetch(`https://indoads.terrapay.online/api/items/?category=${filterName}&page=1`)
                .then(response => response.json())
                .then(json =>
                    state.dispatch({ type: "filter_category", payload: [json, filterId, filterName] })
                )
        }
        catch {
            console.warn("Filter request error")
        }
    }
    function switchFilters(screen) {
        switch (screen) {
            case "filter":
                return (
                    <div ref={sideWindow} className="side-screen " onClick={(event) => closeModal(event)}>
                        <div ref={sliderRef} className="keen-slider filter-List" style={{ height: `90dwh` }}>
                            {compState.categories.length > 0 ?
                                compState.categories.map((element, index) =>
                                    <li key={index} onClick={(e) => filterRequest(element.name, element.id, e)} className="filter-List-item keen-slider__slide"
                                    ><span className={state.data.filterType === element.id ? "underline" : ""}>{categoryCutter(element.name)}</span></li>
                                ) : null}
                        </div>
                    </div >
                )
            case "language":
                return (
                    <div ref={sideWindow} className="side-screen" onClick={(event) => closeModal(event)}>
                        <ul className="filter-List-lang notranslate">
                            {
                                languages.map((element, index) => {
                                    return <a key={index} href="/"
                                        className={localStorage.getItem("Language") === element[0] ? "link underline" : "link"}
                                        onClick={(e) => { languageSelect(element[0], e) }}><span>{element[1]}</span></a>
                                })
                            }
                        </ul >
                    </div >
                )
            case "search":
                return (
                    null
                )
            default:
                console.warn("Error in filter")
        }
    }
    function searchModalPrevent(event) {
        event.preventDefault()
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
    }
    function closeModal(event) {
        event.preventDefault()
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        state.dispatch({ type: "switch_side_window", payload: "closed_side" })
    }
    function closeDownModals(event) {
        event.preventDefault()
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        state.dispatch({ type: "switch_side_window", payload: "closed_side" })
        state.dispatch({ type: "switch_side_window", payload: "closed_down" })
    }
    function languageSelect(value, event) {
        setLang(value)
        state.dispatch({ type: "change_language", payload: value })
    }
    function searchInput(value) {
        setCompState({ ...compState, searchField: value.target.value })
    }
    function sendSearchData(event) {
        closeDownModals(event)
        try {
            fetch(`https://indoads.terrapay.online/api/items/search?query=${compState.searchField}&page=1`)
                .then(response => response.json())
                .then(json => state.dispatch({ type: "filter_data", payload: [json, compState.searchField] }))
        }
        catch {
            console.warn("Search error")
        }
        // state.dispatch({ type: "filter_data", payload: compState.searchField })
    }

    useEffect(() => {

        function focusInput() {
            setTimeout(() => {
                setCompState({ ...compState, selected: true })
            }, 1500)
        }
        function unFocusInput() {
            setCompState({ ...compState, selected: false })
        }
        //open side window and close downsearch
        if (state.data.sideWindow === "opened_side") {
            if (state.data.filter !== "search") {
                gsap.to(sideWindow.current, {
                    xPercent: -100,
                    onComplete: unFocusInput()
                })
                gsap.to(downWindow.current, {
                    zIndex: -1,
                    opacity: 0
                })
            }
        }
        //open downsearch and close side window
        if (state.data.sideWindow === "opened_down") {
            if (state.data.filter === "search") {
                gsap.to(sideWindow.current, {
                    xPercent: 0
                })
                gsap.to(downWindow.current, {
                    zIndex: 11,
                    opacity: 1,
                    onComplete: focusInput()
                })
            }
        }
        //close side window and searchdown window
        if (state.data.sideWindow === "closed_side") {
            if (state.data.filter !== "search") {
                gsap.to(sideWindow.current, {
                    xPercent: 0,
                    onComplete: unFocusInput()
                })
                gsap.to(downWindow.current, {
                    zIndex: -1,
                    opacity: 0
                })
            }
        }
        //close searchdown window only
        if (state.data.sideWindow === "closed_down") {
            if (state.data.filter === "search") {
                gsap.to(downWindow.current, {
                    zIndex: -1,
                    opacity: 0,
                    onComplete: unFocusInput()
                })
                gsap.to(sideWindow.current, {
                    xPercent: 0
                })
            }
        }
    }, [state.data.filter, state.data.sideWindow])


    useEffect(() => {
        fetch(`https://indoads.terrapay.online/api/categories/`)
            .then(response => response.json())
            .then(json => setCompState({ ...compState, categories: json }))
        console.warn(compState)
    }, [])
    return (
        <>
            {switchFilters(state.data.filter)}
            <div ref={downWindow} className="down-screen" onClick={(event) => closeDownModals(event)}>
                <ul className="filter-List-search" onClick={(e) => { searchModalPrevent(e) }}>
                    <li className="filterSearch">
                        <h2>Search advertisements</h2>
                        <input type="text" id="input" className={compState.selected ? "selectedInput" : ""} ref={search} value={compState.searchField} onChange={(e) => searchInput(e)} placeholder="Search" />
                        <button onClick={(event) => sendSearchData(event)}>Search</button>
                    </li>
                </ul >
            </div>
        </>
    )
}
// import { useContext } from "react"
// import { AppState } from "../App"
import "./loading.css"


export default function Loading() {
//     const state = useContext(AppState)
    return (
        <div className="loader-page">
            <div className="loader-pagewrapper">
                <span className="loader"></span>
                <span className="loaderWord">Loading</span>
            </div>
        </div>
    )
}
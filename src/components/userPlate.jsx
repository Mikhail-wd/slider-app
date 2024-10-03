import { useRef, useContext, useState } from "react"
import { AppState } from "../App"
import share from "../img/share.svg"
import notFound from '../img/noImage.png'
import "./userPlate.css"

export default function UserPlate({ data }) {
    const state = useContext(AppState)
    const thisUrl = `?share=${data.id}`
    const shareButton = useRef()
    const [compState, setCompState] = useState({
        imageLoaded: true
    })

    function shareButtonFunc(event) {
        event.preventDefault()
        if (navigator.share) {
            navigator.share({
                url: thisUrl
            })
                .catch(console.error);
        } else {
            navigator.clipboard.writeText(document.location.href + thisUrl)
            state.dispatch({ type: "popup" })
        }
    }
    function nameCutter(value) {
        if (value.length > 26) {
            return value.slice(0, 25) + "..."
        }
        else {
            return value
        }
    }
    function locationCutter(value) {
        if (value.length > 15) {
            return value.slice(0, 13) + "..."
        } else {
            return value
        }
    }
    function categoriesCutter(value) {
        if (value.length > 19) {
            return value.slice(0, 10) + "..."
        } else {
            return value
        }
    }
    function phoneCutter(value) {
        if (value.length > 12) {
            return value.slice(0, 11) + "..."
        } else {
            return value
        }
    }

    function checkImage() {
        setCompState({ ...compState, imageLoaded: false })
    }

    function dateFormatingAlter(value) {
        let temporalArray = value.split("-")
        return temporalArray[2].slice(0, 2) + "." + temporalArray[1] + "." + temporalArray[0]
    }
    return (
        <>
            <div className="userPlateMobile">
                <header className="upm-header">
                    {/* <div className="ump-colors">
                    <div></div>
                    <div></div>
                    <div></div>
                </div> */}
                    <span className="upm-header-title">
                        {nameCutter(data.name)}
                    </span>
                </header>
                {compState.imageLoaded ?
                    <div className="upm-Img" style={{ backgroundImage: `url(${data.image})` }}>
                    </div> :
                    <div className="upm-Img" style={{ backgroundImage: `url(${notFound})` }}>
                    </div>
                }
                <img src={data.image} alt="roket" onError={() => checkImage()} style={{ display: "none" }} />
                <div className="upm-footer">
                    <div className="upm-footerLeftCol">
                        <ul>
                            <li><strong><span className="notranslate">User</span> <span className="notranslate">name</span></strong></li>
                            {/* <li>{data.country}</li> */}
                            <a ref={shareButton} onClick={(event) => shareButtonFunc(event)} className="upm-button" href="sdfsd"><img src={share} alt="shere" /><span>Share</span></a>
                        </ul>
                    </div>
                    <div className="upm-footerRightCol">
                        <ul>
                            <li><span>Date</span><span>{dateFormatingAlter(data.date)}</span></li>
                            <li><span>price</span><span className="notranslate">{data.price} USD</span></li>
                            <li><span>location</span><span>{locationCutter(data.location)}</span></li>
                            <li><span>Category</span><span>{categoriesCutter(data.category)}</span></li>
                            <li><span>Contact</span><span>{phoneCutter(data.contact)}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
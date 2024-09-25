import { useRef, useContext } from "react"
import { AppState } from "../App"
import share from "../img/share.svg"
import "./userPlate.css"

export default function UserPlate({ data }) {
    const state = useContext(AppState)
    const thisUrl = `?share=${data.id}`
    const shareButton = useRef()

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

    function dateFormating(value) {
        let newData = new Date(value * 1000)
        let day = newData.getDay()
        let month = newData.getMonth() + 1
        let year = newData.getFullYear()
        return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${year}`
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
                        {data.title}
                    </span>
                </header>
                <div className="upm-Img">
                    <img src={"https://24ai.tech/en/wp-content/uploads/sites/3/2023/10/01_product_1_sdelat-izobrazhenie-4-3-5-scaled.jpg"} alt="roket" />
                </div>
                <div className="upm-footer">
                    <div className="upm-footerLeftCol">
                        <ul>
                            <li><strong><span>User</span> <span>NAME</span></strong></li>
                            {/* <li>{data.country}</li> */}
                            <a ref={shareButton} onClick={(event) => shareButtonFunc(event)} className="upm-button" href="sdfsd"><img src={share} alt="shere" /><span>Share</span></a>
                        </ul>
                    </div>
                    <div className="upm-footerRightCol">
                        <ul>
                            <li><span>Date</span><span>{dateFormating(data.date)}</span></li>
                            <li><span>price</span><span className="notranslate">{data.price} USD</span></li>
                            <li><span>location</span><span>{data.city}</span></li>
                            <li><span>Category</span><span>{data.statium}</span></li>
                            <li><span>Contact</span><span>{data.phone}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
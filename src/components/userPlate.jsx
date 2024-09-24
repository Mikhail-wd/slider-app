import { useRef } from "react"
import share from "../img/share.svg"
import "./userPlate.css"
export default function UserPlate({ data }) {

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
            alert("Web Share API wasn't supported");
        }
    }

    return (
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
                        <li><strong>User NAME</strong></li>
                        {/* <li>{data.country}</li> */}
                        <a ref={shareButton} onClick={(event) => shareButtonFunc(event)} className="upm-button" href="sdfsd"><img src={share} alt="shere" />Share</a>
                    </ul>
                </div>
                <div className="upm-footerRightCol">
                    <ul>
                        <li><span>Date</span><span>{data.date}</span></li>
                        <li><span>price</span><span>{data.time}</span></li>
                        <li><span>location</span><span>{data.content}</span></li>
                        <li><span>Category</span><span>{data.statium}</span></li>
                        <li><span>Contact</span><span>{data.phone}</span></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
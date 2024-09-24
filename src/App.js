import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import UserPlate from './components/userPlate';
import { EffectCoverflow, EffectFlip, EffectCube, EffectCards } from "swiper/modules"
import { useSearchParams } from "react-router-dom";
import './App.css';
import 'swiper/css';
import "swiper/css/effect-flip"
import "swiper/css/effect-cube"
import "swiper/css/effect-coverflow"
import "swiper/css/effect-cards"

const mockData = [{
  title: "Quartett Turnier",
  country: ".de",
  date: "01.11.2012",
  time: "1000 USD",
  content: "London",
  statium: "notebooks",
  phone: " 8238438823",
  colors: ["red", "red", "grey"],
  id: "sdafsdad9sa6987"
}, {
  title: "Otto Dixs",
  country: ".de",
  date: "01.11.2012",
  time: "5000 USD",
  content: "Amsterdam",
  statium: "notebooks",
  phone: " 8238438823",
  colors: ["red", "red", "grey"],
  id: "0sa8lasd9sd"
}, {
  title: "Victorius Oth",
  country: ".de",
  date: "12.01.2005",
  time: "1200 USD",
  content: "Hangour",
  statium: "notebooks",
  phone: " 8238438823",
  colors: ["red", "red", "grey"],
  id: "fasdo(*iudklas"
},
{
  title: "Land Lord",
  country: ".de",
  date: "12.01.2005",
  time: "800 USD",
  content: "Krakow",
  statium: "notebooks",
  phone: " 8238438823",
  colors: ["red", "red", "grey"],
  id: "3243sdafldjhl"
},
{
  title: "Divine Goose",
  country: ".de",
  date: "12.01.2005",
  time: "2200 USD",
  content: "Rome",
  statium: "notebooks",
  phone: " 8238438823",
  colors: ["red", "red", "grey"],
  id: "88skjesdfdsgfd"
},
{
  title: "Mole Earthrover",
  country: ".de",
  date: "12.01.2005",
  time: "1200 USD",
  content: "Hangour",
  statium: "notebooks",
  phone: " 8238438823",
  colors: ["red", "red", "grey"],
  id: "LdfjsakDFSG4df"
},
{
  title: "Flask Ruiner",
  country: ".de",
  date: "01.11.2012",
  time: "200 USD",
  content: "Lesbon",
  statium: "notebooks",
  phone: " 8238438823",
  colors: ["red", "red", "grey"],
  id: "9sdf898sdfa87"
}]

function App() {
  const [stateData, setStateData] = useState([])
  const [search, setSearchParams] = useSearchParams()
  const requared = search.get("share")

  useEffect(() => {
    if (requared !== null && mockData.find(element => element.id === requared)) {
      let newArray = []
      let oldArray = []
      newArray.push(mockData.find(element => element.id === requared))
      setStateData(newArray.concat(mockData.filter(element => element.id !== requared)))
      console.log(mockData.filter(element => element.id !== requared))
    } else {
      setStateData(mockData)
    }
  }, [])

  return (
    <div className="App">
      {stateData.length > 0 ?
        <Swiper
          modules={[EffectCoverflow, EffectFlip, EffectCube, EffectCards]}
          direction={'vertical'}
          slidesPerView={2}
          spaceBetween={10}
          centeredSlides={true}
          mousewheel={true}
          sticky={true}
          className={"alterSwiper"}
        >
          {stateData.map((element, index) => {
            return (
              <SwiperSlide key={index}>
                {
                  <UserPlate data={element} />
                }
              </SwiperSlide>
            )
          })}

        </Swiper> : null}
    </div>
  );
}

export default App;

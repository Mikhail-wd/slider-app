import { useEffect, useState, useContext, createContext, useReducer } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import UserPlate from './components/userPlate';
import Control from "./components/control";
import SideScreen from "./components/sideSlider"
import { EffectCoverflow, EffectFlip, EffectCube, EffectCards } from "swiper/modules"
import { useSearchParams, useNavigate } from "react-router-dom";
import PopUp from "./components/popup";
import { useLocalStorage } from "./hooks/useLocalStorage"
import './App.css';
import 'swiper/css';
import "swiper/css/effect-flip"
import "swiper/css/effect-cube"
import "swiper/css/effect-coverflow"
import "swiper/css/effect-cards"

const location = document.location

const initialState = {
  filter: "none",
  filterType: "none",
  sideWindow: "closed",
  popup: 0,
  language: 0,
  mockData: [{
    title: "Quartett Turnier",
    country: ".de",
    date: 1297480953,
    price: 1000,
    city: "London",
    statium: "notebooks",
    phone: 11111111,
    colors: ["red", "red", "grey"],
    id: "sdafsdad9sa6987"
  }, {
    title: "Otto Dixs",
    country: ".de",
    date: 1257996153,
    price: 5000,
    city: "Amsterdam",
    statium: "notebooks",
    phone: 22222222,
    colors: ["red", "red", "grey"],
    id: "0sa8lasd9sd"
  }, {
    title: "Victorius Oth",
    country: ".de",
    date: 853989753,
    price: 1200,
    city: "Hangour",
    statium: "notebooks",
    phone: 893328823,
    colors: ["red", "red", "grey"],
    id: "fasdo(*iudklas"
  },
  {
    title: "Land Lord",
    country: ".de",
    date: 1192414953,
    price: 800,
    city: "Krakow",
    statium: "notebooks",
    phone: 823448823,
    colors: ["red", "red", "grey"],
    id: "3243sdafldjhl"
  },
  {
    title: "Divine Goose",
    country: ".de",
    date: 1981423353,
    price: 2200,
    city: "Rome",
    statium: "notebooks",
    phone: 812348823,
    colors: ["red", "red", "grey"],
    id: "88skjesdfdsgfd"
  },
  {
    title: "Mole Earthrover",
    country: ".de",
    date: 32528488953,
    price: 1200,
    city: "Hangour",
    statium: "notebooks",
    phone: 44444444,
    colors: ["red", "red", "grey"],
    id: "LdfjsakDFSG4df"
  },
  {
    title: "Flask Ruiner",
    country: ".de",
    date: 2374543353,
    price: 200,
    city: "Lisbon",
    statium: "notebooks",
    phone: 33333333,
    colors: ["red", "red", "grey"],
    id: "9sdf898sdfa87"
  }]
}

function reducer(state, action) {
  switch (action.type) {
    case "filter":
      return { ...state, filter: action.payload, sideWindow: "opened" }
    case "switch_side_window":
      return { ...state, sideWindow: action.payload }
    case "change_language":
      window.location.replace(location)
      return { ...state, language: state.language + 1, }

    case "filter_type":
      if (action.payload === "date") {
        function filterDate(elemOne, elemTwo) {
          if (elemOne.date < elemTwo.date) {
            return -1;
          }
          if (elemOne.date > elemTwo.date) {
            return 1;
          }
          return 0;
        }
        return { ...state, mockData: mockData.sort(filterDate) }
      }
      if (action.payload === "city") {
        function filterCity(elemOne, elemTwo) {
          if (elemOne.city < elemTwo.city) {
            return -1;
          }
          if (elemOne.city > elemTwo.city) {
            return 1;
          }
          return 0;
        }
        return { ...state, mockData: mockData.sort(filterCity) }
      }
      if (action.payload === "phone") {
        function filterPhone(elemOne, elemTwo) {
          if (elemOne.phone < elemTwo.phone) {
            return -1;
          }
          if (elemOne.phone > elemTwo.phone) {
            return 1;
          }
          return 0;
        }
        return { ...state, mockData: mockData.sort(filterPhone) }
      }
      if (action.payload === "price") {
        function filterPrice(elemOne, elemTwo) {
          if (elemOne.price < elemTwo.price) {
            return -1;
          }
          if (elemOne.price > elemTwo.price) {
            return 1;
          }
          return 0;
        }
        return { ...state, mockData: mockData.sort(filterPrice) }
      }
    case "initialing":
      let newArray = []
      let formatedArray = []
      newArray.push(state.mockData.find(element => element.id === action.payload))
      formatedArray = newArray.concat(state.mockData.filter(element => element.id !== action.payload))
      return { ...state, mockData: formatedArray }
    case "popup":
      return { ...state, popup: state.popup + 1 }
    default:
      console.log("Reducer error")
  }

}

export const AppState = createContext(initialState)

const mockData = [{
  title: "Quartett Turnier",
  country: ".de",
  date: 1297480953,
  price: 1000,
  city: "London",
  statium: "notebooks",
  phone: 11111111,
  colors: ["red", "red", "grey"],
  id: "sdafsdad9sa6987"
}, {
  title: "Otto Dixs",
  country: ".de",
  date: 1257996153,
  price: 5000,
  city: "Amsterdam",
  statium: "notebooks",
  phone: 22222222,
  colors: ["red", "red", "grey"],
  id: "0sa8lasd9sd"
}, {
  title: "Victorius Oth",
  country: ".de",
  date: 853989753,
  price: 1200,
  city: "Hangour",
  statium: "notebooks",
  phone: 893328823,
  colors: ["red", "red", "grey"],
  id: "fasdo(*iudklas"
},
{
  title: "Land Lord",
  country: ".de",
  date: 1192414953,
  price: 800,
  city: "Krakow",
  statium: "notebooks",
  phone: 823448823,
  colors: ["red", "red", "grey"],
  id: "3243sdafldjhl"
},
{
  title: "Divine Goose",
  country: ".de",
  date: 1981423353,
  price: 2200,
  city: "Rome",
  statium: "notebooks",
  phone: 812348823,
  colors: ["red", "red", "grey"],
  id: "88skjesdfdsgfd"
},
{
  title: "Mole Earthrover",
  country: ".de",
  date: 32528488953,
  price: 1200,
  city: "Hangour",
  statium: "notebooks",
  phone: 44444444,
  colors: ["red", "red", "grey"],
  id: "LdfjsakDFSG4df"
},
{
  title: "Flask Ruiner",
  country: ".de",
  date: 2374543353,
  price: 200,
  city: "Lesbon",
  statium: "notebooks",
  phone: 33333333,
  colors: ["red", "red", "grey"],
  id: "9sdf898sdfa87"
}]

function App() {
  const location = document.location.href
  const [storage] = useLocalStorage()
  const navigate = useNavigate()
  const [appState, dispatch] = useReducer(reducer, initialState)
  const [rerender] = useState(prev => appState.language)
  const [search, setSearchParams] = useSearchParams()
  const requared = search.get("share")
  document.cookie = `googtrans=/auto/${localStorage.getItem("Language")};path=/;domain=${document.domain}`;

  useEffect(() => {
    if (requared !== null &&
      mockData.find(element => element.id === requared) &&
      appState.filterType === "none") {
      dispatch({ type: "initialing", payload: requared })
      navigate("/")
    }
  }, [rerender])

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Функция обратного вызова при загрузке скрипта Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          layout: window.google.translate.TranslateElement.InlineLayout
            .SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };
    return () => {
      document.body.removeChild(script);
    };
  }, [])

  return (
    <AppState.Provider value={{ data: appState, dispatch: dispatch }}>
      <div className="App">
        {appState.mockData.length > 0 ?
          <Swiper
            modules={[EffectCoverflow, EffectFlip, EffectCube, EffectCards]}
            direction={'vertical'}
            slidesPerView={2}
            spaceBetween={10}
            centeredSlides={true}
            mousewheel={true}
            className={"alterSwiper"}
          >
            <PopUp />
            <Control />
            <SideScreen />
            {appState.mockData.map((element, index) => {
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
    </AppState.Provider>
  );
}

export default App;

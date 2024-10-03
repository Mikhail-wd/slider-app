import { useEffect, useState, useContext, createContext, useReducer } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import UserPlate from './components/userPlate';
import Control from "./components/control";
import SideScreen from "./components/sideSlider"
import { EffectCoverflow, EffectFlip, EffectCube, EffectCards } from "swiper/modules"
import { useSearchParams, useNavigate } from "react-router-dom";
import PopUp from "./components/popup";
import Loader from './components/loading'
import { useLocalStorage } from "./hooks/useLocalStorage"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'swiper/css';
import "swiper/css/effect-flip"
import "swiper/css/effect-cube"
import "swiper/css/effect-coverflow"
import "swiper/css/effect-cards"

const notify = () => toast("Advertisements not found or missing.",
  {
    position: "top-left",
    autoClose: 1700,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light"
  }
);

const initialState = {
  filter: "none",
  filterType: "none",
  sideWindow: "closed",
  searchWord: "",
  popup: 0,
  language: 0,
  fake: null,
  page: 1,
  nextPage: true,
  startData: [],
  formatedData: []
}

function reducer(state, action) {
  switch (action.type) {
    case "increase_page":
      return {
        ...state,
        startData: state.startData.concat(action.payload.items),
        formatedData: state.startData.concat(action.payload.items),
        nextPage: action.payload.next_page,
        filterType: "none",
        page: state.page + 1
      }
    case "filter":
      if (action.payload[0] === "language" || action.payload[0] === "filter") {
        return { ...state, filter: action.payload[0], sideWindow: action.payload[1] }
      } if (action.payload[0] === "search") {
        return { ...state, filter: action.payload[0], sideWindow: action.payload[1] }
      }
    case "increase_page_category": {
      return {
        ...state,
        filterWord: action.payload[1],
        startData: state.startData.concat(action.payload[0].items),
        formatedData: state.startData.concat(action.payload[0].items),
        nextPage: action.payload[0].next_page,
        page: state.page + 1
      }
    }
    case "doncat_data":
      return { ...state, formatedData: state.formatedData.push(action.payload.items) }
    case "switch_side_window":
      return { ...state, sideWindow: action.payload }
    case "change_language":
      document.cookie = `googtrans=;path=/;domain=${document.domain};expires=Thu, 01 Jan 1970 00:00:00 GMT;`
      window.location.reload()
      return { ...state, language: state.language + 1, }
    case "filter_data":
      if (action.payload === null
        || action.payload[0].detail === "Products not found"
        || action.payload[0].detail === "Items not found"
        || action.payload[0].detail === "Category not found") {
        console.log("search")
        notify()
        return { ...state, formatedData: state.startData, filterType: "search" }
      } else {
        console.log(action.payload)
        return {
          ...state, startData: state.startData,
          formatedData: action.payload[0].items,
          nextPage: action.payload[0].next_page,
          filterType: "search",
          searchWord: action.payload[1],
          page: 1
        }
      }
    case "filter_data_increase":
      if (action.payload === null
        || action.payload.detail === "Products not found"
        || action.payload.detail === "Items not found"
        || action.payload.detail === "Category not found") {
        return { ...state, formatedData: state.startData, filterType: "search" }
      } else {
        console.log(action.payload)
        return {
          ...state, startData: state.startData.concat(action.payload[0].items),
          formatedData: state.startData.concat(action.payload[0].items),
          nextPage: action.payload[0].next_page,
          filterType: "search",
          searchWord: action.payload[1],
          page: state.page + 1
        }
      }
    // case "filter_name":
    //   if (action.payload[1] === "date") {
    //     function filterDate(elemOne, elemTwo) {
    //       if (elemOne.date < elemTwo.date) {
    //         return -1;
    //       }
    //       if (elemOne.date > elemTwo.date) {
    //         return 1;
    //       }
    //       return 0;
    //     }
    //     return { ...state, formatedData: state.startData.sort(filterDate), filterType: action.payload }
    //   }
    //   if (action.payload[1] === "location") {
    //     function filterCity(elemOne, elemTwo) {
    //       if (elemOne.location < elemTwo.location) {
    //         return -1;
    //       }
    //       if (elemOne.location > elemTwo.location) {
    //         return 1;
    //       }
    //       return 0;
    //     }
    //     return { ...state, formatedData: state.startData.sort(filterCity), filterType: action.payload }
    //   }
    //   if (action.payload[1] === "contact") {
    //     function filterPhone(elemOne, elemTwo) {
    //       if (elemOne.contact < elemTwo.contact) {
    //         return -1;
    //       }
    //       if (elemOne.contact > elemTwo.contact) {
    //         return 1;
    //       }
    //       return 0;
    //     }
    //     return { ...state, formatedData: state.startData.sort(filterPhone), filterType: action.payload }
    //   }
    //   if (action.payload[1] === "price") {
    //     function filterPrice(elemOne, elemTwo) {
    //       if (elemOne.price < elemTwo.price) {
    //         return -1;
    //       }
    //       if (elemOne.price > elemTwo.price) {
    //         return 1;
    //       }
    //       return 0;
    //     }
    //     return { ...state, formatedData: state.startData.sort(filterPrice), filterType: action.payload }
    //   }
    case "filter_category":
      if (action.payload === null
        || action.payload[0].detail === "Products not found"
        || action.payload[0].detail === "Items not found"
        || action.payload[0].detail === "Category not found") {
        notify()
        return { ...state, formatedData: state.startData }
      } else {
        console.log(action.payload)
        return {
          ...state,
          formatedData: action.payload[0].items,
          startData: action.payload[0].items,
          filterType: action.payload[2],
          searchWord: action.payload[2],
          page: 1
        }
      }
    case "restart_state_data":
      return { ...state, formatedData: state.mockData }
    case "process_share":
      return { ...state, startData: [action.payload], formatedData: [action.payload] }
    case "starting":
      console.log(action.payload)
      return {
        ...state,
        startData: action.payload.items,
        formatedData: action.payload.items,
        page: action.payload.page,
        nextPage: action.payload.next_page
      }
    case "popup":
      return { ...state, popup: state.popup + 1 }
    default:
      console.log("Reducer error")
  }

}

export const AppState = createContext(initialState)

function App() {
  let newDate = Date.now()
  let expire = new Date(newDate + 284000000).toString().slice(0, 15)
  const navigate = useNavigate()
  const [appState, dispatch] = useReducer(reducer, initialState)
  const [search, setSearchParams] = useSearchParams()
  const requared = search.get("share")

  function getDefaultData() {
    try {
      fetch("https://indoads.terrapay.online/api/items/ ")
        .then(response => response.json())
        .then(json => dispatch({ type: "starting", payload: json }))
    } catch {

    }
  }

  //requesting language and reload page
  // document.cookie = `googtrans=/auto/${localStorage.getItem("Language")};path=/;domain=${document.domain}`;

  function callForMoarItems() {

    if (appState.filterType !== "none") {
      try {
        if (appState.filterType !== "search") {
          fetch(`https://indoads.terrapay.online/api/items/?category=${appState.filterType}&page=${appState.page + 1}`)
            .then(response => response.json())
            .then(json => dispatch({ type: "increase_page_category", payload: [json, appState.filterWord] }))
        }
      }
      catch {
        console.warn("ServerError on getting item by Id")
      }
    }
    if (appState.filterType === "none") {
      console.log("none")
      try {
        fetch(`https://indoads.terrapay.online/api/items/?page=${appState.page + 1}`)
          .then(response => response.json())
          .then(json => dispatch({ type: "increase_page", payload: json }))
      }
      catch {
        console.warn("ServerError on getting item by Id")
      }
    }
    else {
      try {
        if (appState.nextPage && appState.filterType === "search") {
          fetch(`https://indoads.terrapay.online/api/items/search?query=${appState.searchWord}&page=${appState.page + 1}`)
            .then(response => response.json())
            .then(json => dispatch({ type: "filter_data_increase", payload: [json, appState.searchWord] }))
        }
      }
      catch {
        console.warn("ServerError on getting item by Id")
      }
    }
  }

  useEffect(() => {
  }, [])
  //checking browser lang. and sett as default
  useEffect(() => {
    if (requared !== null) {
      try {
        fetch(`https://indoads.terrapay.online/api/items/${requared}`)
          .then(response => response.json())
          .then(json => dispatch({ type: "process_share", payload: json }))
        navigate("/")
      }
      catch {
        console.warn("ServerError on getting item by Id")
      }
    } else {
      getDefaultData()
    }
  }, [])
  //executting translate script
  useEffect(() => {
    // const script = document.createElement("script");
    // script.src =
    //   "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    // script.async = true;
    // document.body.appendChild(script);
    // // Функция обратного вызова при загрузке скрипта Google Translate
    // window.googleTranslateElementInit = () => {
    //   new window.google.translate.TranslateElement(
    //     {
    //       pageLanguage: "auto",
    //       layout: window.google.translate.TranslateElement.InlineLayout
    //         .SIMPLE,
    //       autoDisplay: false,
    //     },
    //     "google_translate_element"
    //   );
    // }
    // return () => {
    //   document.body.removeChild(script);
    // };
  }, [])
  //execute telegramMiniApp
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready()
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.setHeaderColor("#e3e3e3")
      window.Telegram.WebApp.setBackgroundColor("#ffffff")
      window.Telegram.WebApp.enableClosingConfirmation()
      window.Telegram.WebApp.openTelegramLink(`https://indoads.terrapay.online/api/items/${requared}`)
    }
  }, []);

  return (
    <AppState.Provider value={{ data: appState, dispatch: dispatch }}>
      <div className="App">
        {appState !== undefined ?
          <Swiper
            modules={[EffectCoverflow, EffectFlip, EffectCube, EffectCards]}
            direction={'vertical'}
            slidesPerView={2}
            spaceBetween={10}
            centeredSlides={true}
            mousewheel={true}
            className={"alterSwiper"}
            onReachEnd={() => callForMoarItems()}
            automaticallyAdjustContentInsets={true}
          >
            <PopUp />
            <Control />
            <SideScreen />
            <ToastContainer />
            {appState.formatedData.map((element, index) => {
              return (
                <SwiperSlide key={index}>
                  {
                    <UserPlate data={element} />
                  }
                </SwiperSlide>
              )
            })}

          </Swiper> : <Loader />}
      </div>
    </AppState.Provider >
  );
}

export default App;

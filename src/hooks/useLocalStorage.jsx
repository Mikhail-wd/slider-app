import { useEffect, useState } from "react";

export function useLocalStorage() {
    const [state, setState] = useState()
    const language = navigator.language.split("-")

    function setLanguage(value){
        localStorage.setItem ("Language",value)
    }

    useEffect(()=>{
        if (localStorage.getItem("Language")=== null) {
            localStorage.setItem ("Language",language[0])
            setState(navigator.language[0])
        } else {
            setState (localStorage.getItem("Language"))
        }
    },[])

    return [state,(value)=>{setLanguage(value)}]
}
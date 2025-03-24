import { useEffect } from "react";

function useCloseOut(ref,setIsOpen){
    useEffect(()=>{
        const handler = (event) =>{
            if(ref.current &&!ref.current.contains(event.target)){
                setIsOpen(false)
            }
        }
        window.addEventListener("mousedown",handler);
        return ()=> window.removeEventListener("mousedown",handler)
    },[ref, setIsOpen]);
}
export default useCloseOut;
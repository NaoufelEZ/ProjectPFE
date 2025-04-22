import { createContext, useState } from "react";

export const BasketContext = createContext(null);

const BasketProvider = ({children}) => {
    const [basketChange,setBasketChange] = useState(0);
    return(
    <BasketContext.Provider value={{basketChange,setBasketChange}}>
        {children}
    </BasketContext.Provider>
    );
}
export default BasketProvider;
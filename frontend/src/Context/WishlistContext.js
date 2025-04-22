import { createContext, useState } from "react";

export const WishlistContext = createContext(0);

const WishlistProvider = ({children}) => {
    const [wishlistChange,setWishlistChange] = useState(0);
    return(
        <WishlistContext.Provider value={{wishlistChange,setWishlistChange}}>
            {children}
        </WishlistContext.Provider>
    );
}
export default WishlistProvider;

import React, { createContext, useState, useContext } from 'react'
import { PopupContextType } from '../types/types';

const PopUpContext = createContext()

// The triggerPopup and clearPopup are used purely for readability 
//although it is possible to directly have useState as the value of the provider and having usePopup 
//which is a function that returns the value of the context is a neat way to grab those values from around your app.
// like this: 
//  const [isPopupVisible, setIsPopupVisible] = useState(false);
// o useState deve ser apenas para gerenciar o valor booleano isPopupVisible.

export const PopupProvider = ({ children }: { children: React.ReactNode } ) => {

    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

return (
    <PopUpContext.Provider value={{ isPopupVisible, setIsPopupVisible}}>
        {children}
    </PopUpContext.Provider>
)}

export const usePopup = () => {
    const context = useContext(PopUpContext);
    
    if (context === undefined) {
      throw new Error('usePopup must be used within a PopupProvider');
    }
  
    return context;
  };
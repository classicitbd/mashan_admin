import { createContext, useState, useEffect } from "react";
import i18n from "../i18n"; 

export const LocaleContext = createContext();

const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(i18n.language || "en"); 

  useEffect(() => {
    i18n.on("languageChanged", (lng) => setLocale(lng)); 
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); 
  };

  return (
    <LocaleContext.Provider value={{ locale, changeLanguage }}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;

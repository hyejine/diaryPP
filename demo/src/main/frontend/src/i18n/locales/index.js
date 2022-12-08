import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './en';
import ko from './ko';
// import jp from './jp';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
        en:en,
        ko:ko,
        // jp:jp
    },
    lng: "ko", // if you're using a language detector, do not define the lng option
    fallbackLng: "ko",
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n
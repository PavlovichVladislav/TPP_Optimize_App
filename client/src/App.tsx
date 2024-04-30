import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./Router/AppRouter";
import { THEME_2022, ThemeContext } from '@skbkontur/react-ui';
import { store } from "./store/store";
import { Provider } from "react-redux";

function App() {
   return (
      <>
         <ThemeContext.Provider value={THEME_2022}>
            <BrowserRouter>
               <Provider store={store}>
                  <AppRouter /> 
               </Provider>
            </BrowserRouter>
         </ThemeContext.Provider>
      </>
   );
}

export default App;

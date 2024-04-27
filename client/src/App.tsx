import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./Router/AppRouter";
import { THEME_2022, ThemeContext } from '@skbkontur/react-ui';

function App() {
   return (
      <>
         <ThemeContext.Provider value={THEME_2022}>
            <BrowserRouter>
               <AppRouter /> 
            </BrowserRouter>
         </ThemeContext.Provider>;
      </>
   );
}

export default App;

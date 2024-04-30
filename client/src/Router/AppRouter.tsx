import { Route, Routes } from "react-router-dom";
import { BoilerShopRgc } from "../components/BoilerShopRgc";
import { TurbineShopRgc } from "../components/TurbineShopRgc/TurbineShopRgc";
import { Layout } from "../Layout/Layout";
import { StationRgc } from "../components/StationRgc/StationRgc";

export const AppRouter = () => {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route path="/boilers" element={<BoilerShopRgc />} />
            <Route path="/turbines" element={<TurbineShopRgc />} />
            <Route path="/station-rgc" element={<StationRgc />} />
         </Route>
      </Routes>
   );
};

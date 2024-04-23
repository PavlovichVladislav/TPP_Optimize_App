import "./App.css";
import { OptimalEquipment } from "./components/OptimalEquipment";
import { SideBar } from "./components/SideBar/SideBar";

function App() {
   return (
      <div className="app" >
         <SideBar />
         <OptimalEquipment/>
      </div>
   );
}

export default App;

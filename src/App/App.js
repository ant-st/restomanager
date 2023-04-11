import {Root} from "../Root/root";
import './App.css';
import {RouterProvider, createRoutesFromElements, Route, createBrowserRouter} from "react-router-dom";
import {Homepage} from "../HomePage/homepage";
import {Tables} from "../Tables/tables";
import {TableScreen} from "../TableScreen/tablescreen";
import {Menus} from "../Menus/Menus";
import {MenuScreen} from "../MenuScreen/menuScreen";
import {Kitchen} from "../Kitchen/kitchen";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element= {<Root/>}>
            <Route path="" element={<Homepage/>}/>
            <Route path="tables">
                <Route path='' element={<Tables/>}/>
                <Route path=":id" element={<TableScreen/>}/>
            </Route>
            <Route path="menus" element={<Menus/>}>
                <Route path=":id" element={<MenuScreen/>}/>
            </Route>
            <Route path="kitchen" element={<Kitchen/>}/>
        </Route>
    ));



function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;

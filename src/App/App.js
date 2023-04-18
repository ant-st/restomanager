import {Root} from "../Root/root";
import './App.css';
import {RouterProvider, createRoutesFromElements, Route, createBrowserRouter} from "react-router-dom";
import {Homepage} from "../HomePage/homepage";
import {Tables} from "../Tables/tables";
import {TableScreen} from "../TableScreen/tablescreen";
import {Menus} from "../Menus/Menus";
import {MenuScreen} from "../MenuScreen/menuScreen";
import {Kitchen} from "../Kitchen/kitchen";
import {Delivery} from "../Delivery/delivery";
import {DeliveryScreen} from "../DeliveryScreen/deliveryScreen";
import {useEffect} from "react";
import {fetchMenus} from "../Menus/menusSlice";
import {useDispatch} from "react-redux";
import {fetchTables} from "../Tables/tablesSlice";
import {Settings} from "../Settings/settings";

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
            <Route path="delivery" element={<Delivery/>}/>
            <Route path="delivery/new" element={<DeliveryScreen/>}/>
            <Route path="settings" element={<Settings/>}/>
        </Route>
    ));



function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMenus());
        dispatch(fetchTables());
    },[dispatch]);

  return (
      <RouterProvider router={router}/>
  );
}

export default App;

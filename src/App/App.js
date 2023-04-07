import {Root} from "../Root/root";
import './App.css';
import {RouterProvider, createRoutesFromElements, Route, createBrowserRouter} from "react-router-dom";
import {Homepage} from "../HomePage/homepage";
import {Tables} from "../Tables/tables";
import {TableScreen} from "../TableScreen/tablescreen";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element= {<Root/>}>
            <Route path="" element={<Homepage/>}/>
            <Route path="tables">
                <Route path='' element={<Tables/>}/>
                <Route path=":id" element={<TableScreen/>}/>
            </Route>
        </Route>
    ));



function App() {

  return (
      <RouterProvider router={router}/>
  );
}

export default App;

import {Root} from "../Root/root";
import './App.css';
import {RouterProvider, createRoutesFromElements, Route, createBrowserRouter} from "react-router-dom";
import {Homepage} from "../HomePage/homepage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element= {<Root/>}>
            <Route path="/" element={<Homepage/>}/>
        </Route>
    ));

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;

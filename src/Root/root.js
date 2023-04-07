import {Outlet} from "react-router-dom";
import './root.css'

export const Root = () => {
    return (
        <div className="App">
            <header>
            <h1>resto_manager</h1>
            </header>
            <section className="content">
                <Outlet/>
            </section>
        </div>
    )
}
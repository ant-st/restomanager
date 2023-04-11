import {Link, Outlet} from "react-router-dom";
import './root.css'

export const Root = () => {
    return (
        <div className="App">
            <header>
                <Link to="/"><h1>resto_manager</h1></Link>
            </header>
            <section className="content">
                <Outlet/>
            </section>
        </div>
    )
}
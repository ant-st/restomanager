import {Link, Outlet} from "react-router-dom";
import './root.css'

export const Root = () => {
    const handleRestart = () => {
        // eslint-disable-next-line no-restricted-globals
        fetch('http://localhost:4000/restart').then(location.reload());
    }

    return (
        <div className="App">
            <header>
                <Link to="/"><h1>resto_manager</h1></Link>
                <button onClick={handleRestart}>RESTART</button>
            </header>
            <section className="content">
                <Outlet/>
            </section>
        </div>
    )
}
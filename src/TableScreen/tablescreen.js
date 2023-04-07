import {useParams} from "react-router";
import './tablescreen.css'

export const TableScreen = () => {
    let { id } = useParams();

    return (
        <div id="tableScreen">
            <section id="tableName">
                <p>TABLE {id} !</p>
            </section>
            <section id="menuButtons">
                <button>Menu codzienne</button>
                <button>Menu sezonowe</button>
            </section>
            <section id="menuListing">
                <div className="menuPosition">
                    <div className="positionDescription">
                        <h3>Ziemniaki</h3>
                        <p>Danie z ziemniaków, kartofli i pyr</p>
                    </div>
                    <div className="priceAndButton">
                        <h3>15.00$</h3>
                        <button>+</button>
                    </div>
                </div>
                <div className="menuPosition">
                    <div className="positionDescription">
                        <h3>Ziemniaki</h3>
                        <p>Danie z ziemniaków, kartofli i pyr</p>
                    </div>
                    <div className="priceAndButton">
                        <h3>15.00$</h3>
                        <button>+</button>
                    </div>
                </div>
                <div className="menuPosition">
                    <div className="positionDescription">
                        <h3>Ziemniaki</h3>
                        <p>Danie z ziemniaków, kartofli i pyr</p>
                    </div>
                    <div className="priceAndButton">
                        <h3>15.00$</h3>
                        <button>+</button>
                    </div>
                </div>
                <div className="menuPosition">
                    <div className="positionDescription">
                        <h3>Ziemniaki</h3>
                        <p>Danie z ziemniaków, kartofli i pyr</p>
                    </div>
                    <div className="priceAndButton">
                        <h3>15.00$</h3>
                        <button>+</button>
                    </div>
                </div>
                <div className="menuPosition">
                    <div className="positionDescription">
                        <h3>Ziemniaki</h3>
                        <p>Danie z ziemniaków, kartofli i pyr</p>
                    </div>
                    <div className="priceAndButton">
                        <h3>15.00$</h3>
                        <button>+</button>
                    </div>
                </div>
                <div className="menuPosition">
                    <div className="positionDescription">
                        <h3>Ziemniaki</h3>
                        <p>Danie z ziemniaków, kartofli i pyr</p>
                    </div>
                    <div className="priceAndButton">
                        <h3>15.00$</h3>
                        <button>+</button>
                    </div>
                </div>
                <div className="menuPosition">
                    <div className="positionDescription">
                        <h3>Ziemniaki</h3>
                        <p>Danie z ziemniaków, kartofli i pyr</p>
                    </div>
                    <div className="priceAndButton">
                        <h3>15.00$</h3>
                        <button>+</button>
                    </div>
                </div>
                <div className="menuPosition">
                    <div className="positionDescription">
                        <h3>Ziemniaki</h3>
                        <p>Danie z ziemniaków, kartofli i pyr</p>
                    </div>
                    <div className="priceAndButton">
                        <h3>15.00$</h3>
                        <button>+</button>
                    </div>
                </div>
            </section>
            <section id="order">
                <div className="menuPosition">
                    <div className="positionDescription">
                        <h3>Ziemniaki</h3>
                    </div>
                    <div className="priceAndButton">
                        <h3>15.00$</h3>
                        <button>note</button>
                        <button>-</button>
                    </div>
                </div>
                <div className="menuPosition">
                    <div className="positionDescription">
                        <h3>Ziemniaki</h3>
                    </div>
                    <div className="priceAndButton">
                        <h3>15.00$</h3>
                        <button>note</button>
                        <button>-</button>
                    </div>
                </div>
            </section>
            <section id="total">
                <h4>Total: 15.00$</h4>
            </section>
        </div>
    )
}
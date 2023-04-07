import {useParams} from "react-router";

export const MenuScreen = () => {
    let { id } = useParams();
    return (
        <div>
            I am a menu {id}!


        </div>
    )
}
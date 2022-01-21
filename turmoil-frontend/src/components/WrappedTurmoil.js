import {useNavigate , useLocation} from "react-router-dom";
import Turmoil from "./Turmoil";

export const WrappedTurmoil = props => {
    const navigate = useNavigate()
    const location = useLocation()

    return <Turmoil navigate={navigate} location={location} {...props} />
}
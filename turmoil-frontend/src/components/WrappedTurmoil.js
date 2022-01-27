import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import Turmoil from './Turmoil';

function WrappedTurmoil(props) {
  const navigate = useNavigate();
  const location = useLocation();

  return <Turmoil navigate={navigate} location={location} {...props} />;
}

export default WrappedTurmoil;

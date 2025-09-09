import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";

interface RegRoutProps {
  component: React.ReactElement,
  redirectTo: string;
}
const RestrictedRoute: React.FC<RegRoutProps> = ({ component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}

export default RestrictedRoute;
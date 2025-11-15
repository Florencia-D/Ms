import { useParams } from "react-router-dom";
import ResetContraseña from "../components/ResetContraseña";

const ResetPasswordPage = () => {
  const { token } = useParams();

  return <ResetContraseña token={token} />;
};

export default ResetPasswordPage;

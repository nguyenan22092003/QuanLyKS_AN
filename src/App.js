import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import STORAGE, { getStorage } from "./lib/storage";
import { setUserInfo } from "./redux/appGlobal";
import AppRouter from "./router";

function App() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  useEffect(() => {
    const user = getStorage(STORAGE.USER_INFO);
    dispatch(setUserInfo(user || undefined));
  }, []);
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;

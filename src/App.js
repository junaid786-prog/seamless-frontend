import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import { useCallback, useEffect } from "react";
import { userProfileAction } from "./Redux/actions/userActions";
import { ColorRing } from "react-loader-spinner";
import EditAgent from "./components/EditAgent";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector(
    (state) => state.userProfile
  );

  useCallback(() => {
    dispatch(userProfileAction);
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      isAuthenticated ? navigate("/") : navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  return (
    <>
    {loading && (
        <ColorRing
          visible={true}
          height="50"
          width="50"
          ariaLabel="blocks-loading"
          wrapperStyle={{width : '90vw', height: '90vh'}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      )}
      <div className="App">
        <Routes>
          <Route exact path="/" element={<MainPage />}></Route>{" "}
          <Route exact path="/login" element={<LoginPage />}></Route>{" "}
        </Routes>{" "}
      </div>
    </>
  );
}

export default App;

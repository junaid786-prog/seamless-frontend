import React, { useCallback, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import "../css/login.css";
import { userProfileAction } from "../Redux/actions/userActions";

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { loading, isAuthenticated } = useSelector(
    (state) => state.userProfile
  );

  useCallback(() => {
    dispatch(userProfileAction);
    if (!loading) {
      isAuthenticated && navigate("/")
    }
  }, [dispatch, loading, isAuthenticated, navigate]);
  
  return (
    <>
      {
        loading ? <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      /> : !isAuthenticated && <div className="login_page"><Login/></div>
      }
    </>
  );
};

export default LoginPage;

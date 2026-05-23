import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from "react-router-dom";
import "./Appbar.css";
import { useRecoilState } from "recoil";
import { loginState } from "../GlobalState";

export const Appbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCoursesPage = location.pathname === '/users/courses';
  const isPurchasedCoursesPage = location.pathname === '/users/purchasedCourses';
  const isCreateCoursesPage = location.pathname === '/admin/createCourse';

  const [currentloginState, setcurrentloginState] = useRecoilState(loginState);
  const [userEmail, setUserEmail] = useState("");
  const [allCourseBtnVisible, setAllCourseBtnVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("usertoken")) {
      fetch("http://localhost:3002/users/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("usertoken"),
        },
      })
        .then((response) => {
          return response.json();
        })
        .catch((err) => {})
        .then((data) => {
          setcurrentloginState({
            user: true,
            admin: false,
          });
          if (data.username) {
            setUserEmail(data.username);
          }
        })
        .catch((err) => {});
    }
    if (localStorage.getItem("admintoken")) {
      fetch("http://localhost:3002/admin/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("admintoken"),
        },
      })
        .then((response) => {
          return response.json();
        })
        .catch((err) => {})
        .then((data) => {
          setcurrentloginState({
            user: false,
            admin: true,
          });
          if (data.username) {
            setUserEmail(data.username);
          }
        })
        .catch((err) => {});
    }
  }, []);

  return (
    <div className="appbar">
      <div className="left">
        <div className="name">SkillSwap</div>
      </div>
      {!currentloginState.user && !currentloginState.admin ? (
        <div className="navitems">
          <span id="home" onClick={()=>{navigate("/")}}>Home</span>

          <span id="about" onClick={() => {
            let aboutcart = document.getElementById("aboutUs");
            aboutcart.scrollIntoView({ behavior: "smooth" });
          }} >About us</span>

          <span id="follow" onClick={() => {
            let followcart = document.getElementById("footer");
            followcart.scrollIntoView({ behavior: "smooth" });
          }}>Follow us</span>

          <span id="contact" onClick={() => {
            let contactcart = document.getElementById("footer");
            contactcart.scrollIntoView({ behavior: "smooth" });
          }}>Contact us</span>
          
        </div>
      ) : (
        <>
          {currentloginState.user ? (
            <div className="right">
              <div className="user">
                <AccountCircleIcon fontSize="large"/>{ userEmail}
              </div>
              <div className="navbtn">
              {
                isCoursesPage && <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/users/purchasedCourses");
                    setAllCourseBtnVisible(true);
                  }}
                  >
                    My courses
                  </Button>
              }
              {
                isPurchasedCoursesPage && <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/users/courses");
                  }}
                  >
                    All courses
                  </Button>
              }  
              </div>
              <div className="navbtn">
                <Button
                  variant="contained"
                  onClick={() => {
                    localStorage.removeItem("usertoken");
                    navigate("/");
                    setcurrentloginState({
                      user: false,
                      admin: false,
                    });
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className="right">
              <div className="user">
              <AccountCircleIcon fontSize="large"/>{ userEmail}
              </div>
              <div className="navbtn">
              {
                 !isCreateCoursesPage && 
                 <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/admin/createCourse");
                  }}
                >
                  Add course
                </Button>
              }
              {
                 isCreateCoursesPage &&
                 <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/admin/courses");
                  }}
                >
                  All courses
                </Button>
              }
              </div>
              <div className="navbtn">
                <Button
                  variant="contained"
                  onClick={() => {
                    localStorage.removeItem("admintoken");
                    navigate("/");
                    setcurrentloginState({
                      user: false,
                      admin: false,
                    });
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

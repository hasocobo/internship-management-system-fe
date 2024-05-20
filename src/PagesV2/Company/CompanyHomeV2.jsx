import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { GetWithAuth } from "../../Services/HttpService";
import "../../Pages/Home.css";
import iyte_icon from "../../Components/Assets/iyte-logo.png";
import user_icon from "../../Components/Assets/user.png";
import admin_icon from "../../Components/Assets/shield.png";
import student_icon from "../../Components/Assets/studentbook.png";
import grade_icon from "../../Components/Assets/grades.png";
import announcement_icon from "../../Components/Assets/announcements.png";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";


const tabs = [
  { name: "Company Actions", link: "" },
  { name: "General Documents", link: "" },
  { name: "General Settings", link: "" },
];

const subtabs = {
  "Company Actions": [
    { name: "See Students", link: "/company/students" },
    { name: "Announcements", link: "/company/announcements" },
    { name: "My Interns", link: "/company/interns" },
  ],
  "General Documents": [
    { name: "User Guide", link: "" },
    { name: "IZTECH Website", link: "" },
  ],
  "General Settings": [
    { name: "User Settings", link: "/company/settings" },
    { name: "Profile", link: "/company/profile" },
    { name: "Help", link: "" },
    { name: "Log out", link: "/log_out" },
  ],
};

const CompanyHomeV2 = ({ children }) => {
  var [currentUser, setCurrentUser] = useState({});
  const [showDropdown, setShowDropdown] = useState({
    btn1: false,
    btn1_1: false,
    btn1_2: false,
    btn2: false,
    btn2_1: false,
    btn2_2: false,
    btn3: false,
    btn3_1: false,
    btn3_2: false,
    btn4: false,
    userbtn: false,
    userbtn_1: false,
    userbtn_2: false,
    userbtn_3: false,
    userbtn_4: false,
    userbtn_5: false,
    homebtn: false,
  });

  const toggleDropdown = (btn) => {
    setShowDropdown((prev) => ({ ...prev, [btn]: !prev[btn] }));
  };

  useEffect(() => {
    console.log(currentUser.name); // currentUser her güncellendiğinde bu çalışır
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetWithAuth(
          "/company/token/" + localStorage.getItem("tokenKey")
        );
        const result = await response.json();
        setCurrentUser(result);
        console.log(currentUser.name);
      } catch (error) {
        console.log(error);
        console.log("User not found");
      }
    };

    const timeout = setTimeout(() => {
      fetchData();
    }, 1);

    return () => clearTimeout(timeout); // useEffect'in temizleme fonksiyonu, bileşen kaldırıldığında zamanlayıcıyı temizler
  }, []);

  return (
    <div style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <Header role={"Secretary"} />
        <div
          style={{
            display: "flex",
            flexGrow: "1",
            backgroundColor: "white",
            overflowY: "hidden",
          }}
        >
          <Sidebar tabs={tabs} subtabs={subtabs} />
          <Outlet /> {/*/secretary'nin child objeleri buraya geliyor. */}
        </div>
      </div>
    </div>
  );
};

export default CompanyHomeV2;

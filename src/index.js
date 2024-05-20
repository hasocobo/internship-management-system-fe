import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Logout from "./Pages/Logout";
import UserSettings from "./Pages/UserSettings";
import Profile from "./Pages/Profile";
import Companies from "./Pages/Companies";
import ApplyInternship from "./Pages/ApplyInternship";
import UploadSummerPractice from "./Pages/UploadSummerPractice";
import SecretaryUserSettings from "./Pages/Secretary/SecretaryUserSettings";
import Announcement from "./Pages/Announcement";
import Documents from "./Pages/Documents";
import Applications from "./Pages/Applications";
import Templates from "./Pages/Templates";
import CoordinatorHome from "./Pages/Coordinator/CoordinatorHome";
import CoordinatorAnnouncement from "./Pages/Coordinator/CoordinatorAnnouncement";
import CoordinatorStudents from "./Pages/Coordinator/CoordinatorStudents";
import Guidelines from "./Pages/Coordinator/Guidelines";
import CoordinatorSettings from "./Pages/Coordinator/CoordinatorSettings";
import CoordinatorProfile from "./Pages/Coordinator/CoordinatorProfile";
import CompanyHome from "./Pages/Company/CompanyHome";
import CompanyProfile from "./Pages/Company/CompanyProfile";
import CompanySettings from "./Pages/Company/CompanySettings";
import CompanyStudents from "./Pages/Company/CompanyStudents";
import CompanyAnnouncements from "./Pages/Company/CompanyAnnouncements";
import CompanyInterns from "./Pages/Company/CompanyInterns";
import CoordinatorCompanies from "./Pages/Coordinator/CoordinatorCompanies";

/**
 * V2
*/

//Secretary
import SecretaryHome from "./Pages/Secretary/SecretaryHome";
import Students from "./Pages/Secretary/Students";
import Settings from "./Pages/Secretary/Settings";

//Company
import CompanyAnnouncementsV2 from "./PagesV2/Company/CompanyAnnouncementsV2";
import CompanyHomeV2 from "./PagesV2/Company/CompanyHomeV2";
import CompanyInternsV2 from "./PagesV2/Company/CompanyInternsV2";
import CompanyProfileV2 from "./PagesV2/Company/CompanyProfileV2";
import CompanySettingsV2 from "./PagesV2/Company/CompanySettingsV2";
import CompanyStudentsV2 from "./PagesV2/Company/CompanyStudentsV2";

//Coordinator
import CoordinatorAnnouncementV2 from "./PagesV2/Coordinator/CoordinatorAnnouncementV2";
import CoordinatorCompaniesV2 from "./PagesV2/Coordinator/CoordinatorCompaniesV2";
import CoordinatorGradesV2 from "./PagesV2/Coordinator/CoordinatorGradesV2";
import CoordinatorHomeV2 from "./PagesV2/Coordinator/CoordinatorHomeV2";
import CoordinatorProfileV2 from "./PagesV2/Coordinator/CoordinatorProfileV2";
import GuidelinesV2 from "./PagesV2/Coordinator/GuidelinesV2";
import CoordinatorStudentsV2 from "./PagesV2/Coordinator/CoordinatorStudentsV2"
import CoordinatorSettingsV2 from "./PagesV2/Coordinator/CoordinatorSettingsV2";

//Student
import AnnouncementV2 from "./PagesV2/Student/AnnouncementV2";
import ApplicationsV2 from "./PagesV2/Student/ApplicationsV2";
import ApplyInternshipV2 from "./PagesV2/Student/ApplyInternshipV2";
import CompaniesV2 from "./PagesV2/Student/CompaniesV2";
import DocumentsV2 from "./PagesV2/Student/DocumentsV2";
import HomeV2 from "./PagesV2/Student/HomeV2";
import ProfileV2 from "./PagesV2/Student/ProfileV2";
import TemplatesV2 from "./PagesV2/Student/TemplatesV2";
import UploadSummerPracticeV2 from "./PagesV2/Student/UploadSummerPracticeV2";
import UserSettingsV2 from "./PagesV2/Student/UserSettingsV2";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "log_out",
    element: <Logout />,
  },
  {
    path: "user_settings",
    element: <UserSettings />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "companies",
    element: <Companies />,
  },
  {
    path: "apply",
    element: <ApplyInternship />,
  },
  {
    path: "upload_summer_practice",
    element: <UploadSummerPractice />,
  },
  {
    path: "announcement",
    element: <Announcement />,
  },
  {
    path: "documents",
    element: <Documents />,
  },
  {
    path: "applications",
    element: <Applications />,
  },
  {
    path: "templates",
    element: <Templates />,
  },
  {
    path: "coor_home",
    element: <CoordinatorHome />,
  },
  {
    path: "coor_announcements",
    element: <CoordinatorAnnouncement />,
  },
  {
    path: "coor_students",
    element: <CoordinatorStudents />,
  },
  {
    path: "guidelines",
    element: <Guidelines />,
  },
  {
    path: "coor_settings",
    element: <CoordinatorSettings />,
  },
  {
    path: "coor_profile",
    element: <CoordinatorProfile />,
  },
  {
    path: "comp-home",
    element: <CompanyHome />,
  },
  {
    path: "comp-profile",
    element: <CompanyProfile />,
  },
  {
    path: "comp-settings",
    element: <CompanySettings />,
  },
  {
    path: "comp-announcements",
    element: <CompanyAnnouncements />,
  },
  {
    path: "comp-students",
    element: <CompanyStudents />,
  },
  {
    path: "comp-interns",
    element: <CompanyInterns />,
  },
  {
    path: "coor_companies",
    element: <CoordinatorCompanies />,
  },
//////////////////////////////////////////////////////////////////////////
  {
    path: "secretary",
    element: <SecretaryHome />,
    children: [
      {
        path: "",
        element: "",
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "student",
    element: "",
    children: [
      {
        path: "",
        element: <HomeV2 />,
      },
      {
        path: "apply",
        element: <ApplyInternshipV2 />,
      },
      {
        path: "announcement",
        element: <AnnouncementV2 />,
      },
      {
        path: "applications",
        element: <ApplicationsV2 />,
      },
      {
        path: "templates",
        element: <TemplatesV2 />,
      },
      {
        path: "documents",
        element: <DocumentsV2 />,
      },
      {
        path: "profile",
        element: <ProfileV2 />,
      },
      {
        path: "settings",
        element: <UserSettingsV2 />,
      },
    ],
  },
  {
    path: "company",
    element: "",
    children: [
      {
        path: "",
        element: <CompanyHomeV2 />,
      },
      {
        path: "announcements",
        element: <CompanyAnnouncementsV2 />,
      },
      {
        path: "students",
        element: <CompanyStudentsV2 />,
      },
      {
        path: "settings",
        element: <CompanySettingsV2 />,
      },
      {
        path: "interns",
        element: <CompanyInternsV2 />,
      },
    ],
  },

  {
    path: "coordinator",
    element: <CoordinatorHomeV2 />,
    children: [
      {
        path: "",
        element: "",
      },
      {
        path: "students",
        element: <CoordinatorStudentsV2 />
      },
      {
        path: "companies",
        element: <CoordinatorCompaniesV2 />,
      },
      {
        path: "profile",
        element: <CoordinatorProfileV2 />,
      },
      {
        path: "announcements",
        element: <CoordinatorAnnouncementV2 />,
      },
      {
        path: "guidelines",
        element: <GuidelinesV2 />,
      },
      {
        path: "settings",
        element: <CoordinatorSettingsV2 />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

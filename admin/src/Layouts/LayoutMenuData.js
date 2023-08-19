import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Navdata = () => {
    const history = useHistory();
    //state data
    const [isDashboard, setIsDashboard] = useState(false);
    const [isApps, setIsApps] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isPassport, setIsPassport] = useState(false);
    const [isReport, setIsReport] = useState(false);
    const [isRegistration, setIsRegistration] = useState(false);
    const [isForms, setIsForms] = useState(false);
    const [isTables, setIsTables] = useState(false);
    const [isCharts, setIsCharts] = useState(false);
    const [isIcons, setIsIcons] = useState(false);
    const [isMaps, setIsMaps] = useState(false);
    const [isMultiLevel, setIsMultiLevel] = useState(false);

    // Apps
    const [isEmail, setEmail] = useState(false);
    const [isSubEmail, setSubEmail] = useState(false);
    const [isEcommerce, setIsEcommerce] = useState(false);
    const [isProjects, setIsProjects] = useState(false);
    const [isTasks, setIsTasks] = useState(false);
    const [isCRM, setIsCRM] = useState(false);
    const [isCrypto, setIsCrypto] = useState(false);
    const [isInvoices, setIsInvoices] = useState(false);
    const [isSupportTickets, setIsSupportTickets] = useState(false);
    const [isNFTMarketplace, setIsNFTMarketplace] = useState(false);

    // Authentication
    const [isSignIn, setIsSignIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [isPasswordCreate, setIsPasswordCreate] = useState(false);
    const [isLockScreen, setIsLockScreen] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [isVerification, setIsVerification] = useState(false);
    const [isError, setIsError] = useState(false);

    // Passport
    const [isProfile, setIsProfile] = useState(false);
    const [isLanding, setIsLanding] = useState(false);

    // Charts
    const [isApex, setIsApex] = useState(false);

    // Multi Level
    const [isLevel1, setIsLevel1] = useState(false);
    const [isLevel2, setIsLevel2] = useState(false);

    const [iscurrentState, setIscurrentState] = useState('Dashboard');

    function updateIconSidebar(e) {
        if (e && e.target && e.target.getAttribute("subitems")) {
            const ul = document.getElementById("two-column-menu");
            const iconItems = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("subitems");
                if (document.getElementById(id))
                    document.getElementById(id).classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState !== 'Dashboard') {
            setIsDashboard(false);
        }
        if (iscurrentState !== 'Apps') {
            setIsApps(false);
        }
        if (iscurrentState !== 'Auth') {
            setIsAuth(false);
        }
        if (iscurrentState !== 'Passport') {
            setIsPassport(false);
        }
        if (iscurrentState !== 'Report') {
            setIsReport(false);
        }
        if (iscurrentState !== 'Registration') {
            setIsRegistration(false);
        }
        if (iscurrentState !== 'Forms') {
            setIsForms(false);
        }
        if (iscurrentState !== 'Tables') {
            setIsTables(false);
        }
        if (iscurrentState !== 'Charts') {
            setIsCharts(false);
        }
        if (iscurrentState !== 'Icons') {
            setIsIcons(false);
        }
        if (iscurrentState !== 'Maps') {
            setIsMaps(false);
        }
        if (iscurrentState !== 'MuliLevel') {
            setIsMultiLevel(false);
        }
        if (iscurrentState === 'Widgets') {
            history.push("/widgets");
            document.body.classList.add('twocolumn-panel');
        }
        if (iscurrentState !== 'Landing') {
            setIsLanding(false);
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isApps,
        isAuth,
        isPassport,
        isReport,
        isRegistration,
        isForms,
        isTables,
        isCharts,
        isIcons,
        isMaps,
        isMultiLevel
    ]);

    const menuItems = [
     
        {
            id: "dashboard",
            label: "Dashboards",
            icon: "mdi mdi-speedometer",
            link: "/",
            stateVariables: isDashboard,
            click: function (e) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState('Dashboard');
                updateIconSidebar(e);
            },
            // subItems: [
            //     {
            //         id: "analytics",
            //         label: "Analytics",
            //         link: "#",
            //         parentId: "dashboard",
            //     },
            //     {
            //         id: "crm",
            //         label: "CRM",
            //         link: "#",
            //         parentId: "dashboard",
            //     },
            //     {
            //         id: "ecommerce",
            //         label: "Ecommerce",
            //         link: "/dashboard",
            //         parentId: "dashboard",
            //     },
            //     {
            //         id: "crypto",
            //         label: "Crypto",
            //         link: "#",
            //         parentId: "dashboard",
            //     },
            //     {
            //         id: "projects",
            //         label: "Projects",
            //         link: "#",
            //         parentId: "dashboard",
            //     },
            //     {
            //         id: "nft",
            //         label: "NFT",
            //         link: "#",
            //         parentId: "dashboard",
            //     },
            // ],
        },
      
      
      
        {
            id: "Passport",
            label: "Passport Settings",
            icon: "mdi mdi-sticker-text-outline",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsPassport(!isPassport);
                setIscurrentState('Passport');
                updateIconSidebar(e);
            },
            stateVariables: isPassport,
            subItems: [
                {
                    id: "CreateApplicant",
                    label: "Create New Applicant",
                    link: "/new",
                    parentId: "setting",
                  },
                {
                    id: "ApprovedApplicants",
                    label: "Approved Applicants",
                    link: "/Approved",
                    parentId: "setting",
                  },
                {
                    id: "CreateApplicant",
                    label: "Un Approved Applicants",
                    link: "/unApproved",
                    parentId: "setting",
                  },
                //   {
                //     id: "CheckApplicantData",
                //     label: "Check Applicant Data",
                //     link: "/CheckApplicant",
                //     parentId: "setting",
                //   },
                  {
                    id: "approveApplicantData",
                    label: "Approve Applicant Data",
                    link: "/approve",
                    parentId: "setting",
                  },
                  {
                    id: "cancel",
                    label: "Cancel Appointment",
                    link: "/cancel",
                    parentId: "setting",
                  },
                  {
                    id: "scan",
                    label: "Scan Applicant Finger",
                    link: "/scan",
                    parentId: "setting",
                  },
                ]
        },
        // {
        //     id: "Report",
        //     label: "Passport Settings",
        //     icon: "ri-layout-grid-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsReport(!isReport);
        //         setIscurrentState('Report');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isReport,
        //     subItems: [
        //         {
        //             id: "Create User",
        //             label: "Create User",
        //             link: "/register",
        //             parentId: "setting",
        //           },
        //           {
        //             id: "Setup",
        //             label: "Setups",
        //             link: "/Promotion",
        //             parentId: "setting",
        //           },
        //           {
        //             id: "User Role",
        //             label: "User Roles",
        //             link: "/UserRole",
        //             parentId: "setting",
        //           },
        //         ]
        // },
        {
            id: "Registration",
            label: "Registration",
            icon: "ri-dashboard-2-line",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsRegistration(!isRegistration);
                setIscurrentState('Registration');
                updateIconSidebar(e);
            },
            stateVariables: isRegistration,
            subItems: [
                {
                    id: "Create Employee",
                    label: "Create Employee",
                    link: "/createEmployee",
                    parentId: "setting",
                  },
                {
                    id: "Register Holydays",
                    label: "Register Holydays",
                    link: "/Holydays",
                    parentId: "setting",
                  },
              
          
            ],
        },
        {
            id: "Report",
            label: "Reports",
            icon: "ri-layout-grid-line",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsReport(!isReport);
                setIscurrentState('Report');
                updateIconSidebar(e);
            },
            stateVariables: isReport,
            subItems: [
                {
                    id: "dailyApplicants",
                    label: "Daily Applicants",
                    link: "/daily",
                    parentId: "Report",
                  },
                  {
                    id: "monthlyApplicants",
                    label: "Monthly Applicants",
                    link: "/monthly",
                    parentId: "Report",
                  },
                  {
                    id: "applicantList",
                    label: "Applicant List",
                    link: "/list",
                    parentId: "Report",
                  },
                ]
        },
        {
            id: "authentication",
            label: "Authentication",
            icon: "mdi mdi-account-circle-outline",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsAuth(!isAuth);
                setIscurrentState('Auth');
                updateIconSidebar(e);
            },
            stateVariables: isAuth,
            subItems: [
                {
                    id: "Create User",
                    label: "Create User",
                    link: "/register",
                    parentId: "setting",
                  },
                //   {
                //     id: "Setup",
                //     label: "Setups",
                //     link: "/Promotion",
                //     parentId: "setting",
                //   },
                //   {
                //     id: "User Role",
                //     label: "User Roles",
                //     link: "/UserRole",
                //     parentId: "setting",
                //   },
          
            ],
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
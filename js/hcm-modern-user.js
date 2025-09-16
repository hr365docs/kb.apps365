$(document).ready(function () {
        $("#hcm-modern-user").html("");

        $("#hcm-modern-user").append("<ul>" +
                // Introduction
                "<li data-nav-id='./introduction/' title='Introduction' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/introduction/'>" +
                "Introduction" +
                "</a>" +
                "</li>" +
                // Home Page
                "<li data-nav-id='./home-page/' title='Home Page' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/home-page/'>" +
                "Home Page" +
                "</a>" +
                "</li>" +
                // Apps
                "<li class='dropdownicon sidelist' title='Apps'>" +
                "<a href='#'>" +
                "Apps" +
                "</a>" +
                "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconapps aside_dropdown_icon'>" +
                "</li>" +
                "<li data-nav-id='./apps/' title='Apps' class='sidelist dropdown_romove_dot'>" +
                "<ul class='sidenavSub-topics aside_dropdown_list' id='modernuserapps'>" +
                // ED365
                "<a href='/HRMS-HR365/modern/user/apps/ED365/profile-card/'>ED365</a>" +

// "<li data-nav-id='../apps/ED365/' title='ED365 - Introduction' class='sidelist'>" +
//   "<a href='/HRMS-HR365/modern/user/apps/ED365/introduction/'>Introduction</a>" +
// "</li>" +

"<li data-nav-id='../apps/ED365/' title='ED365 - Managing User Profile' class='sidelist'>" +
  "<a href='/HRMS-HR365/modern/user/apps/ED365/profile-card/'>Managing User Profile</a>" +
"</li>" +

"<li data-nav-id='../apps/ED365/' title='ED365 - user interface' class='sidelist'>" +
  "<a href='/HRMS-HR365/modern/user/apps/ED365/user-interface/'>User Interface</a>" +
"</li>" +


  "<ul class='ml-15 sidenavSub-topics'>" +
    "<li data-nav-id='../apps/ED365/' title='Home' class='sidelist'>" +
      "<a href='/HRMS-HR365/modern/user/apps/ED365/user-interface/#home-page'>Home Page</a>" +
    "</li>" +
    "<li data-nav-id='../apps/ED365/' title='Search' class='sidelist'>" +
      "<a href='/HRMS-HR365/modern/user/apps/ED365/user-interface/#search'>Search</a>" +
    "</li>" +
    "<li data-nav-id='../apps/ED365/' title='Views' class='sidelist'>" +
      "<a href='/HRMS-HR365/modern/user/apps/ED365/user-interface/#views'>Views</a>" +
    "</li>" +
  "</ul>" +
"</li>"+

"</li>"+



                
                // TMP365
               
                "<a href='/HRMS-HR365/modern/user/apps/TMP365/home-page/'>TMP365</a>" +
              
                "<li data-nav-id='../apps/TMP365/' title='TMP365 - Home Page' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/TMP365/home-page/'>Home Page</a>" +
                "</li>" +
                "<li data-nav-id='../apps/TMP365/' title='TMP365 - User Interface' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/TMP365/userinterface/'>User Interface</a>" +
                "</li>" +

               
            
                
                // EO365
               
                "<a href='/HRMS-HR365/modern/user/apps/EO365/home/'>EO365</a>" +
              
                "<li data-nav-id='../apps/EO365/' title='EO365 - Home Page' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/EO365/home/'>Home Page</a>" +
                "</li>" +
                
               
               
                "<li data-nav-id='../apps/EO365/' title='EO365 - Report' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/EO365/report/'>Report</a>" +
                "</li>" +
                "<li data-nav-id='../apps/EO365/' title='EO365 - Ess Portal' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/EO365/share-ess-url/'>Ess Portal</a>" +
                "</li>" +
                "<li data-nav-id='../apps/EO365/' title='EO365 - User Interface' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/EO365/user-interface/'>User Interface</a>" +
                "</li>" +
                // TS365
             
                "<a href='/HRMS-HR365/modern/user/apps/TS365/home-page/'>TS365</a>" +
            
                "<li data-nav-id='../apps/TS365/' title='TS365 - Home Page' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/TS365/home-page/'>Home Page</a>" +
                "</li>" +
                "<li data-nav-id='../apps/TS365/' title='TS365 - Reports' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/TS365/reports/'>Reports</a>" +
                "</li>" +
                
                // ET365
             
                "<a href='/HRMS-HR365/modern/user/apps/ET365/home-page/'>ET365</a>" +
            
                "<li data-nav-id='../apps/ET365/' title='ET365 - Home Page' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/ET365/home-page/'>Home Page</a>" +
                "</li>" +
                "<li data-nav-id='../apps/ET365/' title='ET365 - Reports' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/ET365/reports/'>Reports</a>" +
                "</li>" +
                
                // RM365
           
                "<a href='/HRMS-HR365/modern/user/apps/RM365/home-page/'>RM365</a>" +
            
                "<li data-nav-id='../apps/RM365/' title='RM365 - Home Page' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/RM365/home-page/'>Home Page</a>" +
                "</li>" +
               //  Roles Parent Item
"<li data-nav-id='../apps/RM365/' title='RM365 - Roles' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/RM365/role/'>Roles</a>" +
                "</li>" +


    "<li data-nav-id='../Approver' title='Approver Role' class='sidelist'>"+
     " <a href='/HRMS-HR365/modern/user/apps/RM365/role/#Approver'>Approver</a>"+
    "</li>"+
   " <li data-nav-id='../Recruiter' title='Recruiter Role' class='sidelist'>"+
      "<a href='/HRMS-HR365/modern/user/apps/RM365/role/#Recruiter'>Recruiter</a>"+
    "</li>"+
     " <li data-nav-id='../Recruiter' title='RecruiterManager' class='sidelist'>"+
      "<a href='/HRMS-HR365/modern/user/apps/RM365/role/#RecruiterManager'>RecruiterManager</a>"+
    "</li>"+
     " <li data-nav-id='../Recruiter' title='Interviewer' class='sidelist'>"+
      "<a href='/HRMS-HR365/modern/user/apps/RM365/role/#Interviewer'>Interviewer</a>"+
    "</li>"+
     " <li data-nav-id='../Recruiter' title='Recruiter Role' class='sidelist'>"+
      "<a href='/HRMS-HR365/modern/user/apps/RM365/role/#Screener'>Screener</a>"+
    "</li>"+
     " <li data-nav-id='../Recruiter' title='Hiring Manager' class='sidelist'>"+
      "<a href='/HRMS-HR365/modern/user/apps/RM365/role/#HiringManager'>Hiring Manager</a>"+
    "</li>"+
 
//portal
"<li class='dropdownicon sidelist' title='Portal'>"+
  "<a class='qwe' href='/HRMS-HR365/modern/user/apps/RM365/portal/'>Portal</a>"+
  
"</li>"+


"<li class='dropdownicon sidelist' title='external-portal'>"+
    "<a class='qwe' href='/HRMS-HR365/modern/user/apps/RM365/portal/#external-portal'>"+
        "External Portal"+
     "</a>"+ 
"<li class='dropdownicon sidelist' title='external-portal'>"+
    "<a class='qwe' href='/HRMS-HR365/modern/user/apps/RM365/portal/#internal-portal'>"+
        "Internal Portal"+
     "</a>"+ 
  
"</li>"+

                
                
                // PM365
              
                "<a href='/HRMS-HR365/modern/user/apps/PM365/home-page/'>PM365</a>" +
           
                "<li data-nav-id='../apps/PM365/' title='PM365 - Home Page' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/PM365/home-page/'>Home Page</a>" +
                "</li>" +
                
                "<li data-nav-id='../apps/PM365/' title='PM365 - Document' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/PM365/Document/'>Document</a>" +
                "</li>" +

               
                "<li data-nav-id='../apps/PM365/' title='PM365 - Reports' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/PM365/reports/'>Reports</a>" +
                "</li>" +
                 "<li data-nav-id='../apps/PM365/' title='PM365 - Self-Review' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/PM365/self-review/'>Self Review</a>" +
                "</li>" +
                 "<li data-nav-id='../apps/PM365/' title='PM365 - Feedback' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/PM365/feedback/'>Feedback</a>" +
                "</li>" +
                 "<li data-nav-id='../apps/PM365/' title='PM365 - PIP' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/PM365/pip/'>PIP</a>" +
                "</li>" +
                 "<li data-nav-id='../apps/PM365/' title='PM365 - Praise' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/PM365/praise/'>Praise</a>" +
                "</li>" +
                 "<li data-nav-id='../apps/PM365/' title='PM365 - 1:1' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/apps/PM365/oneonone/'>1:1</a>" +
                "</li>" +
                "</ul>" +
                "</li>" +
                // Help
                "<li class='dropdownicon sidelist' title='Help'>" +
                "<a href='/HRMS-HR365/modern/user/help/'>" +
                "Help" +
                "</a>" +
                "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconhelp aside_dropdown_icon'>" +
                "</li>" +
                "<li data-nav-id='./help/' title='Help' class='sidelist dropdown_romove_dot'>" +
                "<ul class='sidenavSub-topics aside_dropdown_list' id='modernuserhelp'>" +
                "<li data-nav-id='../help/' title='Feedback' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/help/#Feedback'>Feedback</a>" +
                "</li>" +
                "<li data-nav-id='../help/' title='Product Activation' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/user/help/#product-activation'>Product Activation</a>" +
                "</li>" +
                "</ul>" +
                "</li>" +
                "</ul>"
        );
});
$(document).ready(function () {
        $("#hcm-admin-guide").html("");

        $("#hcm-admin-guide").append("<ul>" +
                //       intro 
                "<li data-nav-id='./installation/requirments/' title=Introduction class=sidelist>" +
                "<a href='/HRMS-HR365/modern/admin/introduction/'>" +
                "Introduction" +
                "</a>" +
                "</li>" +
                // AD 
                "<li data-nav-id='https://github.com/hr365docs/My-project.git/installation/requirments/' title='Architecture Diagram' class=sidelist>" +
                "<a href='/HRMS-HR365/modern/admin/architecture-diagram/'>" +
                "Architecture Diagram" +
                "</a>" +
                "</li>" +
                // profil card  
                "<li data-nav-id='https://github.com/hr365docs/My-project.git/installation/requirments/' title='Home Page' class=sidelist>" +
                "<a href='/HRMS-HR365/modern/admin/home-page/'>" +
                "Home Page" +
                "</a>" +
                "</li>" +

                "<li class='dropdownicon sidelist' title='Settings'>" +
                "<a href='/HRMS-HR365/modern/admin/settings/'>" +
                "Settings" +
                "</a>" +
                "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconmainsetting aside_dropdown_icon_setting'>" +
                "</li>" +

                "<li data-nav-id='./Setting/' title='Settings' class='sidelist dropdown_romove_dot'>" +


                "<ul class='sidenavSub-topics aside_dropdown_list_setting' value='settings'>" +

                "<ul id='modernadminmainsetting'>" +
                "<li class='dropdownicon sidelist' title='General'>" +
                "<a  class='qwe' href='/HRMS-HR365/modern/admin/settings/general/'>" +
                "General" +
                "</a>" +
                "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIcongeneral aside_dropdown_icon''>" +
                "</li>" +
                "<li data-nav-id='../advanced/' class='sidelist dropdown_romove_dot' >" +



                "<ul class='sidenavSub-topics aside_dropdown_list' id='edmmoderngeneral'>" +
                "<li  data-nav-id='../advanced/' title='Theme' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/settings/general/#Theme'>Theme</a>" +
                "</li>" +

                "<li  data-nav-id='../advanced/' title='Date Format' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/settings/general/#DateFormat'>Date Format</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='Default Currency' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/settings/general/#DefaultCurrency'>Default Currency</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='GCC Tenant' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/settings/general/#GCC-Tenant'>GCC Tenant</a>" +
                "</li>" +

                "<li  data-nav-id='../advanced/' title='Show favorite icon' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/settings/general/#ShowFavIcon'>Show favorite icon</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='Langauge' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/settings/general/#Langauge'>Langauge</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='Brand Logo' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/settings/general/#Brand-logo'>Brand Logo</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='Shared Mail Box' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/settings/general/#Brand-logo'>Shared Mail Box</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='Sharepoint page components' class='sidelist '>" +
                "<a href='/HRMS-HR365/modern/admin/settings/general/#Sharepoint-page'>Sharepoint page components</a>" +
                "</li>" +


                "</ul>" +

                "</li>" +








                // view setting start 




                "<ul id='modernadminmainsetting'>" +
                "<li class='dropdownicon sidelist' title='Administration'>" +
                "<a  class='qwe' href='/HRMS-HR365/modern/admin/settings/Administration/'>" +
                "Administration" +
                "</a>" +
                "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIcongeneral aside_dropdown_icon''>" +
                "</li>" +
                "<li data-nav-id='../advanced/' class='sidelist dropdown_romove_dot' >" +



                "<ul class='sidenavSub-topics aside_dropdown_list' id='edmmoderngeneral'>" +
                "<li  data-nav-id='../advanced/' title='Department' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/settings/Administration/#Department'>Department</a>" +
                "</li>" +

                "<li  data-nav-id='../advanced/' title='Organization' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/settings/Administration/#Organization'>Organization</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='Badges' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/settings/Administration/#Badges'>Badges</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='Grade' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/settings/Administration/#Grade'>Grade</a>" +
                "</li>" +

                "<li  data-nav-id='../advanced/' title='Location' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/settings/Administration/#Location'>Location</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='Position' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/settings/Administration/#Position'>Position</a>" +
                "</li>" +



                "</ul>" +

                "</li>" +








                // view setting start 





                "<ul id='modernadminmainsetting'>" +
                "<li class='dropdownicon sidelist' title='User's Role Permissions'>" +
                "<a  class='qwe' href='/HRMS-HR365/modern/admin/settings/UserRole/'>" +
                "User's Role Permissions" +

                "</a>" +
                "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIcongeneral aside_dropdown_icon''>" +
                "</li>" +
                "<li data-nav-id='../advanced/' class='sidelist dropdown_romove_dot' >" +



                "<ul class='sidenavSub-topics aside_dropdown_list' id='edmmoderngeneral'>" +
                "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/settings/UserRole/#UserRole'>User's</a>" +
                "</li>" +

                // "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
                // "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#Birthday'>Birthdays and work anniversaries images</a>" +
                // "</li>" +


                "</ul>" +

                "</li>" +



                // //  exclude option 



                // "<ul id='modernadminmainsetting'>" +
                // "<li class='dropdownicon sidelist' title='Exclude Options'>" +
                // "<a  class='qwe' href='/HRMS-HR365/modern/admin/settings/exclude-options/'>" +
                // "Exclude Options" +
                // "</a>" +
                // "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIcongeneral aside_dropdown_icon''>" +
                // "</li>" +
                // "<li data-nav-id='../advanced/' class='sidelist dropdown_romove_dot' >" +



                // "<ul class='sidenavSub-topics aside_dropdown_list' id='edmmoderngeneral'>" +

                // "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
                // "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#ExcludeO365sign-inblockedusers'>Exclude 365 sign-in blocked users</a>" +
                // "</li>" +

                // "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
                // "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#Excludeuserbydepartment'>Exclude user by department</a>" +
                // "</li>" +
                // "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
                // "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#Excludeusersbyjobtitle'>Exclude users by job title</a>" +
                // "</li>" +

                // "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
                // "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#ExcludeusersbyName'>Exclude users by Name</a>" +
                // "</li>" +

                // "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
                // "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#Excludeuserbyofficelocation'>Exclude user by Office Location</a>" +
                // "</li>" +

                // "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
                // "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#Excludeuserbyusingcsvfile'>Exclude user by using csv file</a>" +
                // "</li>" +

                // "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
                // "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#ExcludeUsersByUPN'>Exclude Users By UPN</a>" +
                // "</li>" +

                // "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
                // "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#Excludeuserbycontain'>Exclude user by contain</a>" +
                // "</li>" +

                // "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
                // "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#Excludeusershiddeninaddresslist'>Exclude users hidden in address list</a>" +
                // "</li>" +


                // "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
                // "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#Removesharedmailboxes'>Remove shared mailboxes</a>" +
                // "</li>" +






                // // "<li data-nav-id='../views/' title='Make user sortabel' class='sidelist'>" +
                // // "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#make-user-sortable'>" +
                // // "Make user sortable" +
                // // "</a>" +
                // // "</li>" +


                // "<li data-nav-id='../advanced/' title=Advanced class='sidelist dropdown_romove_dot'>" +





                // "</ul>" +


                // "</ul>" +


                // "</a>" +
                // "</ul>" +
                // setting end 


                "</ul>" +


                "</ul>" +
                "<li data-nav-id='../advanced/' title=Help class='sidelist dropdown_romove_dot'>" +

                "<li class='dropdownicon sidelist' title='Apps'>" +
                "<a href='#'>" +
                "Apps" +
                "</a>" +
                "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' '>" +
                "</li>" +
                "<li data-nav-id='./Setting/' title='Settings' class='sidelist dropdown_romove_dot'>" +
                "<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +

                "</li>" +
               
                "<a href='/HRMS-HR365/modern/admin/apps/ED365/introduction/' title='ED365' >ED365</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='ED365-Introduction' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/ED365/introduction/'>Introduction</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='ED365-Profile Card' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/ED365/profile-card/'>Profile Card</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='ED365-Dashboard' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/ED365/dashboard/'>Dashboard</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='ED365-Settings' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/'>Settings</a>" +
                "</li>" +
                //----------------------------------------------------------------------general



"<li class='dropdownicon sidelist' title='General'>" +

  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/ED365/settings/general/'>" +
    "General" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +
// "<li data-nav-id='./Setting/' title='Settings' class='sidelist dropdown_romove_dot'>" +
  "<ul class='aside_dropdown_list' aria-labelledby='generalDropdown'>" +

    "<li class='sidelist' title='Azure Storage Configuration'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/general/#AzureStorageConfiguration'>" +
        "Azure Storage Configuration" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Birthday and anniversary templates'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/general/#Birthdayandanniversarytemplates'>" +
        "Birthday and Anniversary Templates" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Brand logo'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/general/#Brandlogo'>" +
        "Brand Logo" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Collaboration'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/general/#Collaboration'>" +
        "Collaboration" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Employee info page'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/general/#Employeeinfopage'>" +
        "Employee Info Page" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Filter Attributes'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/general/#Filterattribute'>" +
        "Filter Attributes" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Home page custom url'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/general/#Homepagecustomurl'>" +
        "Home Page Custom URL" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Map external list'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/general/#Map-external-list'>" +
        "Map External List" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Organization chart type'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/general/#orgChart'>" +
        "Organization Chart Type" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Date of Joining'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/general/#dateofjoin'>" +
        "Date of Joining" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Organization name'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/general/#Organizationname'>" +
        "Organization Name" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Records to load'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/general/#Recordstoload'>" +
        "Records to Load" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Role and Permissions'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/general/#RoleandPermissions'>" +
        "Role and Permissions" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Search filters'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/general/#search-filter'>" +
        "Search Filters" +
      "</a>" +
    "</li>" +

  "</ul>" +
"</li>"+
"</li>"+


//----------------------------------------------------------------------------------------------------------------------
                
               "<li class='dropdownicon sidelist' title='Views'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/'>" +
    "Views" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +


  "<ul class='aside_dropdown_list' aria-labelledby='generalDropdown'>" +
"<li data-nav-id='../advanced/' title='Align employee basic information' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#Alignemployeebasicinformation'>Align employee basic information</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Clear alphabet selection' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#Clearalpha'>Clear alphabet selection with reset filter</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Dashboard feature' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#Dashboardfeature'>Dashboard feature</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Grid Width' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#GridWidth'>Grid Width</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Hide manager' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#Hidemanagerofspecificuser'>Hide manager of specific user</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Hide mobile number' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#Hidemobilenumberofspecificuser'>Hide mobile number of specific user</a>" +
"</li>" +



"<li data-nav-id='../advanced/' title='Image profile tag' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#Imageprofiletag'>Image profile tag</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Labels' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#Labels'>Labels</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Show or Hide modules' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#ShoworHidemodules'>Show or Hide modules</a>" +
"</li>" +

// "<li data-nav-id='../advanced/' title='Praise' class='sidelist'>" +
// "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#Praise'>Praise</a>" +
// "</li>" +

// "<li data-nav-id='../advanced/' title='Text to speech' class='sidelist'>" +
// "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#Show-text-to-speech'>Show text to speech</a>" +
// "</li>" +

"<li data-nav-id='../advanced/' title='Sort by' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#Sortby'>Sort by</a>" +
"</li>" +



"<li data-nav-id='../advanced/' title='Work email ID' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#Useworkemailidinsteadaccountloginid'>Work email ID/UPN ID</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='View' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#view'>view</a>" +
"</li>" +

// "<li data-nav-id='../advanced/' title='Grid view properties' class='sidelist'>" +
// "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#Userpropertiesingridview'>User properties in grid view</a>" +
// "</li>" +

// "<li data-nav-id='../advanced/' title='List view properties' class='sidelist'>" +
// "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#Userpropertiesinlistview'>User properties in list view</a>" +
// "</li>" +

// "<li data-nav-id='../advanced/' title='Profile Card properties' class='sidelist'>" +
// "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#UserpropertiesinProfileCard'>User properties in Profile Card</a>" +
// "</li>" +

// "<li data-nav-id='../advanced/' title='Hover Card properties' class='sidelist'>" +
// "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/views/#User-Properties-in-Hover-Card'>User properties in hover card</a>" +
// "</li>" +
"</ul>" +
"</li>"+
//____________________________________________________________________________________________________________
               "<li class='dropdownicon sidelist' title='Exclude-Options'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/'>" +
    "Exclude-Options" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +


  "<ul class='aside_dropdown_list' aria-labelledby='generalDropdown'>" +

"<li data-nav-id='../advanced/' title='Exclude 365 sign-in blocked users' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#ExcludeO365sign-inblockedusers'>Exclude 365 sign-in blocked users</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Exclude by department' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#Excludeuserbydepartment'>Exclude user by department</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Exclude by job title' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#Excludeusersbyjobtitle'>Exclude users by job title</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Exclude by name' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#ExcludeusersbyName'>Exclude users by Name</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Exclude by office location' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#Excludeuserbyofficelocation'>Exclude user by Office Location</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Exclude using CSV file' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#Excludeuserbyusingcsvfile'>Exclude user by using csv file</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Exclude by UPN' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#ExcludeUsersByUPN'>Exclude Users By UPN</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Exclude by contain' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#Excludeuserbycontain'>Exclude user by contain</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Exclude hidden in address list' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#Excludeusershiddeninaddresslist'>Exclude users hidden in address list</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Remove shared mailboxes' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/exclude-options/#Removesharedmailboxes'>Remove shared mailboxes</a>" +
"</li>" +
"</ul>" +
"</li>"+
//_______________________________________________________________________________________________________________________
//                 "<ul id='modernadminmainsetting'>" +
// "<li class='dropdownicon sidelist' title='Advanced'>" +
// "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/'>" +
// "Advanced" +
// "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIcongeneral aside_dropdown_icon'>" +
// "</a>" +
// "</li>" +
// "<li data-nav-id='../advanced/' class='sidelist dropdown_romove_dot'>" +

 "<li class='dropdownicon sidelist' title='Advanced'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/'>" +
    "Advanced" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +

  "<ul class='aside_dropdown_list' aria-labelledby='generalDropdown'>" +


"<li data-nav-id='../advanced/' title='Additional manager' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#Additionalmanager'>Additional manager</a>" +
"</li>" +

// "<li data-nav-id='../advanced/' title='Analytics Report' class='sidelist'>" +
// "<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#Analytics-Report'>Analytics Report</a>" +
// "</li>" +

"<li data-nav-id='../advanced/' title='Auto load' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#Autoloadinsteadloadmorebutton'>Auto load instead load more button</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Auto fetch office data' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#Autofetchoffice365jobtitlelocationanddepartment'>Auto fetch office 365 job title, location and department</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Filter events' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#Filterupcomingbirthdaysworkanniversaries'>Filter upcoming birthdays & work anniversaries</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Configure API permissions' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#ConfigureSharePointAPIpermissions'>Configure SharePoint API permissions</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Custom fields' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#Customfields'>Custom fields</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Custom function' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#Customfunction'>Custom function</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Executive Assistant' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#ExecutiveAssistantrelationship'>Executive Assistant relationship</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Extend search' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#Extendcustomfieldssearchcapability'>Extend custom fields search capability</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Export permission' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#Export-data-permission'>Export data permission</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Import non-M365 users' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#ImportnonM365users'>Import non M365 users</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Extend phone search' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#ExtendMobileNumberandPhonenumbersearchcapability'>Extend Mobile Number and Phone number search capability</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Restricted Access' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#RestrictedAccess'>Restricted Access List</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Sync mobile numbers' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#Syncanddisplaymobilenumberfromazure'>Sync and display mobile number from azure</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Sync profile info' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#Syncemployeeprofileinformationfrom'>Sync employee profile information</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Sync user info' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#Syncuserinformationfrom'>Sync user information</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Topbar filters' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#topbarfilters'>Topbar filters</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Validate work email' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/ED365/settings/advanced/#workemail'>Validate work email with SharePoint account name</a>" +
"</li>" +
"</ul>" +
"</li>"+ 
               
                "<a href='/HRMS-HR365/modern/admin/apps/TMP365/home-page/' title='TMP365'>TMP365</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='TMP365 - Home page' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/TMP365/home-page/'>Home page</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='TMP365 - HR actions' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/TMP365/hr-actions/'>HR actions</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='TMP365 - Public Holidays' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/TMP365/holidays/'>Public Holidays</a>" +
                "</li>" +

                "<li  data-nav-id='../advanced/' title='TMP365 - Reports' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/TMP365/reports/'>Reports</a>" +
                 "</li>" + 
                  "<li class='dropdownicon sidelist' title='TMP365 - System Setting'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/TMP365/settings/'>" +
    "System Setting" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +

  "<ul class='aside_dropdown_list' aria-labelledby='generalDropdown'>" +

  "</li>" + "<li  data-nav-id='../advanced/' title='TMP365 - General Settings' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/TMP365/settings/#general'>General Setting</a>" +
                "</li>" + "<li  data-nav-id='../advanced/' title='TMP365 - Advance Settings' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/TMP365/settings/#advance-settings'>Advance Settings</a>" +
                "</li>" + "<li  data-nav-id='../advanced/' title='TMP365 - Organization' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/TMP365/settings/#Notifications'>Notifications</a>" +
               
                "</li>" +
                 "<li  data-nav-id='../advanced/' title='TMP365 - Leave Type Setting' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/TMP365/settings/#leave-type-settings'>Leave Type Setting</a>" +
                "</li>" + 
                "</ul>"+
                "</li>"+
                
                "<a href='/HRMS-HR365/modern/admin/apps/EO365/home/' title='EO365'>EO365</a>" +
                "</li>" +
                "<li data-nav-id='../advanced/' title='EO365 - Home Page' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/EO365/home/'>Home Page</a>" +
                "</li>" +
                 "<li data-nav-id='../advanced/' title='EO365 - Dashboard' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/EO365/dashboard/'>Dashboard</a>" +
                "</li>" +
                "<li data-nav-id='../advanced/' title='EO365 - Access Requirements' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/EO365/access-requirements/'>Access Requirements</a>" +
                "</li>" +
                "<li data-nav-id='../advanced/' title='EO365 - Settings' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/'>Settings</a>" +
                "</li>" +
                "<li class='dropdownicon sidelist' title='General Administration'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-administation/'>" +
    "General Administration" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +


  "<ul class='aside_dropdown_list' aria-labelledby='generalDropdown'>" +

    "<li class='sidelist' title='Onboarded Users'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-administation/#Onboarded-Users'>" +
        "Onboarded Users" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Position'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-administation/#Position'>" +
        "Position" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Department'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-administation/#Department'>" +
        "Department" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Locations'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-administation/#Locations'>" +
        "Locations" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Software'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-administation/#Software'>" +
        "Software" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Office'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-administation/#Office'>" +
        "Office" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Devices'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-administation/#Devices'>" +
        "Devices" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Status'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-administation/#Status'>" +
        "Status" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Employee Type'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-administation/#Employee-Type'>" +
        "Employee Type" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Additional Fields'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-administation/#AdditionalFields'>" +
        "Additional Fields" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Reason for Offboard'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-administation/#Reason-for-Offboard'>" +
        "Reason for Offboard" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Notice Period'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-administation/#Notice-Period'>" +
        "Notice Period" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Document Settings'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-administation/#Document_Settings'>" +
        "Document Settings" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Audit Logs'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-administation/#Audit-Logs'>" +
        "Audit Logs" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Groups'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-administation/#Groups'>" +
        "Groups" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Custom Forms'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-administation/#CustomForms'>" +
        "Custom Forms" +
      "</a>" +
    "</li>" +
    

  "</ul>" +
"</li>"+


                "<li class='dropdownicon sidelist' title='Task Administration'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/EO365/setting/task-administation/'>" +
    "Task Administration" +
  "</a>" +

  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +


  "<ul class='aside_dropdown_list' aria-labelledby='taskDropdown'>" +

    "<li class='sidelist' title='Task Categories'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/task-administation/#Task-Categories'>" +
        "Task Categories" +
      "</a>" +
    "</li>" +

    

    "<li class='sidelist' title='Task'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/task-administation/#Task'>" +
        "Task" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Task Template'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/task-administation/#Task-Template'>" +
        "Task Template" +
      "</a>" +
    "</li>" +

  "</ul>" +
"</li>"+
                "<li class='dropdownicon sidelist' title='General Settings'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-setting/'>" +
    "General Settings" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +


  "<ul class='aside_dropdown_list' aria-labelledby='generalSettingsDropdown'>" +

    "<li class='sidelist' title='Date Format'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-setting/#SideNavigation'>" +
        "Side Navigation User Permission" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='log-collection'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-setting/#GCC-Tenant'>" +
        "Log Collection" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Naming Convention'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-setting/#Naming-Convention'>" +
        "Naming Convention" +
      "</a>" +
    "</li>" +

    

    "<li class='sidelist' title='Show Fav Icon'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-setting/#comapany-Details'>" +
        "Company Details" +
      "</a>" +
    "</li>" +

    

   

    "<li class='sidelist' title='Brand Logo'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/general-setting/#Brand-Logo'>" +
        "Brand Logo" +
      "</a>" +
    "</li>" +

  "</ul>" +
"</li>"+
"<li class='dropdownicon sidelist' title='Users, Roles and Permissions'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/EO365/setting/Users-Roles-and-Permissions/'>" +
    "Users, Roles and Permissions" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +


  "<ul class='aside_dropdown_list' aria-labelledby='usersRolesDropdown'>" +

   
    "<li class='sidelist' title='Add/Edit Teams'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/Users-Roles-and-Permissions/#teams'>" +
        "Add/Edit Teams" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Teams Permissions'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/Users-Roles-and-Permissions/#Permissions'>" +
        "Teams Permissions" +
      "</a>" +
    "</li>" +

  "</ul>" +
"</li>" +


"<li class='dropdownicon sidelist' title='Integrations'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/EO365/setting/Integration/'>" +
    "Integrations" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +


  "<ul class='aside_dropdown_list' aria-labelledby='integrationsDropdown'>" +

    "<li class='sidelist' title='Configure SharePoint API Permission'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/Integration/#configure-api'>" +
        "Configure SharePoint API Permission" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='E-Sign'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/Integration/#E-Sign'>" +
        "E-Sign" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='MS Form'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/Integration/#MS-Form'>" +
        "MS Form" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Mailbox Integration'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/Integration/#Mailbox-Integration'>" +
        "Mailbox Integration" +
      "</a>" +
    "</li>" +

  "</ul>" +
"</li>"+
        //        <!-- Features Menu -->
"<li class='dropdownicon sidelist' title='Features'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/EO365/setting/Features/'>" +
    "Features" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +


  "<ul class='aside_dropdown_list' aria-labelledby='featuresDropdown'>" +

    "<li class='sidelist' title='Custom Columns'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/Features/#Custom-Columns'>" +
        "Custom Columns" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Quick Share Links'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/Features/#Quick-Share-Links'>" +
        "Quick Share Links" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Create User in M365'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/Features/#Create-User-in-M365'>" +
        "Create User in M365" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Approval-Workflow'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/Features/#Approval-Workflow'>" +
        "Approval Workflow" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Guest Users'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/Features/#GUsers'>" +
        "Guest Users" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Preonboarding'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/Features/#Preonboarding'>" +
        "Preonboarding" +
      "</a>" +
    "</li>" +

  "</ul>" +
"</li>" +

// <!-- Notifications Menu -->
"<li class='dropdownicon sidelist' title='Notifications'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/EO365/setting/Notification/'>" +
    "Notifications" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +


  "<ul class='aside_dropdown_list' aria-labelledby='notificationsDropdown'>" +

    "<li class='sidelist' title='Email'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/Notification/#Email'>" +
        "Email" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Reminder Notifications'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/Notification/#Reminder-Notifications'>" +
        "Reminder Notifications" +
      "</a>" +
    "</li>" +

  "</ul>" +
"</li>" +

// <!-- EO365 Assessments Menu -->
"<li class='dropdownicon sidelist' title='EO365 Assessments'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/EO365/setting/EO365-Assesment/'>" +
    "EO365 Assessments" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +


  "<ul class='aside_dropdown_list' aria-labelledby='assessmentsDropdown'>" +

    "<li class='sidelist' title='Question'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/EO365-Assesment/#Questions'>" +
        "Question" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Sections'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/EO365-Assesment/#Sections'>" +
        "Sections" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Assessments'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/EO365-Assesment/#Assessments'>" +
        "Assessments" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Company Details'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/setting/EO365-Assesment/#Company-Details'>" +
        "Company Details" +
      "</a>" +
    "</li>" +

  "</ul>" +
"</li>"+
                "<li data-nav-id='../advanced/' title='EO365 - Report' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/EO365/report/'>Report</a>" +
                "</li>" +
                "<li data-nav-id='../advanced/' title='EO365 - ShareEss Url' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/EO365/share-ess-url/'>ShareEss Url</a>" +
                "</li>" +
                "<li class='dropdownicon sidelist' title='Process'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/EO365/process/'>" +
    "Process" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +


  "<ul class='aside_dropdown_list' aria-labelledby='processDropdown'>" +

    "<li class='sidelist' title='My Active Task'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/process/#my-active-task'>" +
        "My Active Task" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='My Overdue Task'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/process/#my-overdue-task'>" +
        "My Overdue Task" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Onboarding Process'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/process/#onboarding-process'>" +
        "Onboarding Process" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Offboarding Process'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/process/#offboarding-process'>" +
        "Offboarding Process" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='All Active Task'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/process/#all-active-task'>" +
        "All Active Task" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='All Overdue Task'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/process/#all-overdue-task'>" +
        "All Overdue Task" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Onboarded'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/process/#onboarded'>" +
        "Onboarded" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Offboarded'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/process/#offboarded'>" +
        "Offboarded" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Training'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/process/#training'>" +
        "Training" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Pre-onboarding'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/EO365/process/#pre-onboarding'>" +
        "Pre-onboarding" +
      "</a>" +
    "</li>" +

  "</ul>" +
"</li>"
+
                "<a href='/HRMS-HR365/modern/admin/apps/TS365/home-page/' title='TS365'>TS365</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='Home page' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/TS365/home-page/'>Home page</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='Reports' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/TS365/reports/'>Reports</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='Administration' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/TS365/administration/'>Administration</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='Settings' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/TS365/Settings/'>Settings</a>" +
                "</li>" +
//notification
                "<li class='dropdownicon sidelist' title='Notification'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/TS365/settings/notification/'>" +
    "Notification" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +


  "<ul class='aside_dropdown_list' aria-labelledby='notificationDropdown'>" +

    "<li class='sidelist' title='Send End of the Week Notification'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/notification/#SendEndoftheWeekNotification'>" +
        "Send End of the Week Notification" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Select Day to Send End of the Week Notification'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/notification/#SelectDaytoSendEndoftheWeekNotification'>" +
        "Select Day to Send End of the Week Notification" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Following Day as another Notification'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/notification/#following-day-another-notification'>" +
        "Following Day as another Notification" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Send Invoice Mail to client'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/notification/#send-Invoice-mail-to-client'>" +
        "Send Invoice Mail to client" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Timesheet Submission and Approval Notifications'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/notification/#timesheet-submission-and-approval-notifications'>" +
        "Timesheet Submission and Approval Notifications" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Auto Approve Notifications'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/notification/#auto-approve-notifications'>" +
        "Auto Approve Notifications" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Tasks Assign Notification'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/notification/#tasks-assign-notification'>" +
        "Tasks Assign Notification" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Enable Daily Timesheet Report Notification'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/notification/#enable-daily-timesheet-report-notification'>" +
        "Enable Daily Timesheet Report Notification" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Pending Timesheet approval notification to approver'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/notification/#pending-timesheet-approval-notification-to-approver'>" +
        "Pending Timesheet approval notification to approver" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Send Pending Timesheet Approval Notification'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/notification/#Send-Pending-Timesheet-Approval-Notification'>" +
        "Send Pending Timesheet Approval Notification" +
      "</a>" +
    "</li>" +

  "</ul>" +
"</li>" +

// <!-- Email Template Menu -->
"<li class='dropdownicon sidelist' title='Email Template'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/TS365/settings/email-template/'>" +
    "Email Template" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +


  "<ul class='aside_dropdown_list' aria-labelledby='emailTemplateDropdown'>" +

    "<li class='sidelist' title='User'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/email-template/#User'>" +
        "User" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Manager'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/email-template/#Manager'>" +
        "Manager" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='System'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/email-template/#System'>" +
        "System" +
      "</a>" +
    "</li>" +

  "</ul>" +
"</li>" +


        //        <!-- Features Menu -->
"<li class='dropdownicon sidelist' title='Features'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/TS365/settings/features/'>" +
    "Features" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +


  "<ul class='aside_dropdown_list' aria-labelledby='featuresDropdown'>" +

    "<li class='sidelist' title='Organization'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/features/#Organization'>" +
        "Organization" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Custom Fields'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/features/#custom-fields'>" +
        "Custom Fields" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Projects Off Days'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/features/#projects-off-days'>" +
        "Projects Off Days" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Departments'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/features/#location'>" +
        "Locations" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Timesheet Fields'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/features/#timesheet-fields'>" +
        "Timesheet Fields" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Timesheet Customization'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/features/#timesheet-customization'>" +
        "Timesheet Customization" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Invoice Module'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/features/#daily-weekly-hours'>" +
        "Invoice Module" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Restrict Daily and Weekly Hours'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/features/#Restrict-Daily'>" +
        "Restrict Daily and Weekly Hours" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Restrict Daily and Weekly Hours Based on Rules'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/features/#Restrict-Daily-and-Weekly-Hours-Based'>" +
        "Restrict Daily and Weekly Hours Based on Rules" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Rules'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/features/#Rules'>" +
        "Rules" +
      "</a>" +
    "</li>" +

  "</ul>" +
"</li>" +
//advanced
 "<li class='dropdownicon sidelist' title='Advanced'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/TS365/settings/advance/'>" +
    "Advanced" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +


  "<ul class='aside_dropdown_list' aria-labelledby='advancedDropdown'>" +

    "<li class='sidelist' title='Child Item 1'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/advance/#Time-Tracking-Days'>" +
        "Time Tracking Days" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Allow-Same-Project'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/advance/#Allow-Same-Project'>" +
        "Allow Same Project Names for Different Client" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Exclude-Finance-Info'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/advance/#Exclude-Finance-Info'>" +
        "Exclude Finance Info" +
      "</a>" +
    "</li>" +

  "</ul>" +
"</li>"+

// <!-- General Menu -->
"<li class='dropdownicon sidelist' title='General'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/TS365/settings/general/'>" +
    "General" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +


  "<ul class='aside_dropdown_list' aria-labelledby='generalDropdown'>" +

   
    "<li class='sidelist' title='Start Day of The Week'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/general/#start-day-of-the-week'>" +
        "Start Day of The Week" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Follow ISO Week Number Format'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/general/#ISOweek'>" +
        "Follow ISO Week Number Format" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Brand Logo'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/general/#brand-logo'>" +
        "Brand Logo" +
      "</a>" +
    "</li>" +

  "</ul>" +
"</li>" +






// <!-- Integration Menu -->
"<li class='dropdownicon sidelist' title='Integration'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/TS365/settings/integration/'>" +
    "Integration" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +


  "<ul class='aside_dropdown_list' aria-labelledby='integrationDropdown'>" +

    "<li class='sidelist' title='Configure SharePoint API Permission'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/integration/#Configure-SharePoint-API'>" +
        "Configure SharePoint API Permission" +
      "</a>" +
    "</li>" +

    "<li class='sidelist' title='Integrate with Time-Off Manager'>" +
      "<a href='/HRMS-HR365/modern/admin/apps/TS365/settings/integration/#Integrate-with-Time-Off-Manager'>" +
        "Integrate with Time-Off Manager" +
      "</a>" +
    "</li>" +

  "</ul>" +
"</li>"+


                "<a href='/HRMS-HR365/modern/admin/apps/ET365/home-page/' title='ET365'>ET365</a>" +
                "</li>" +

                "<li data-nav-id='../advanced/' title='ET365 - Home Page' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/ET365/home-page/'>Home Page</a>" +
                "</li>" +
                "<li data-nav-id='../advanced/' title='ET365 - Reports' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/ET365/reports/'>Reports</a>" +
                "</li>" +
                "<li data-nav-id='../advanced/' title='ET365 - Administraion' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/ET365/administration/'>Administration</a>" +
                "</li>" +
                "<li data-nav-id='../advanced/' title='ET365 - Settings' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/ET365/settings/'>Settings</a>" +
                "</li>"
                +
                
                //general
                "<li class='dropdownicon sidelist' title='General'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/ET365/settings/#General-setting'>" +
    "General Setting" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +
 

  "<ul class='aside_dropdown_list' aria-labelledby='generalDropdown'>" +

        "<li data-nav-id='../General' title='Currency Seperator' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/ET365/settings/#CurrencySeperator'> Currency Seperator </a>" +
        "</li>" +
      
        "<li data-nav-id='../General' title='Custom Column' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/ET365/settings/#CustomColumn'> Custom Column </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Expense Future Days' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/ET365/settings/#ExpenseFutureDays'> Expense Future Days </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Display Project Name' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/ET365/settings/#DisplayProjectName'>Display Project Name</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Expense Tracking ID' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/ET365/settings/#ExpenseTrackingID'>Expense Tracking ID</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Brand Logo' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/ET365/settings/#brandlogo'>Brand Logo</a>" +
        "</li>" +

   
    

  "</ul>" +
"</li>" +
                //Notifications
 "<li data-nav-id='../advanced/' title='ET365 - Notification' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/ET365/settings/#Notification'>Notifications</a>" +
                "</li>" +

                //features

                 "<li class='dropdownicon sidelist' title='Features'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/ET365/settings/#Feature'>" +
    "Features" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +
 "<ul class='aside_dropdown_list' aria-labelledby='generalDropdown'>" +
 "<li data-nav-id='../General' title='Custom Fields' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/ET365/settings/#Custom-Fields'> Custom Fields</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Cost Center' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/ET365/settings/#Cost-Center'>Cost Center</a>" +
        "</li>" +
       
        "<li data-nav-id='../General' title='Job Title' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/ET365/settings/#Job-title'>Job Title</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Location' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/ET365/settings/#Location'>Location</a>" +
        "</li>" +
        
  "</ul>" +
"</li>" +
               
               
                
                "<a href='/HRMS-HR365/modern/admin/apps/RM365/home-page/' title='RM365'>RM365</a>" +
                "</li>" +

                "<li data-nav-id='../advanced/' title='RM365 - Home Page' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/RM365/home-page/'>Home Page</a>" +
                "</li>" +
                "<li data-nav-id='../advanced/' title='RM365 - Home Page' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/RM365/dashboard/'>Dashboard</a>" +
                "</li>" +
                "<li data-nav-id='../advanced/' title='RM365 - Home Page' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/RM365/reports/'>Report</a>" +
                "</li>" +
                "<li data-nav-id='../advanced/' title='RM365 - Draft' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/RM365/draft/'>Draft</a>" +
                "</li>" +
                "<li data-nav-id='../advanced/' title='RM365 - Inactive Items' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/RM365/inactiveitem/'>Inactive Items</a>" +
                "</li>" +
                "<li data-nav-id='../advanced/' title='RM365 - Administration' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/RM365/administration/'>Administration</a>" +
                "</li>" +
                "<li data-nav-id='../advanced/' title='RM365 - Settings' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/RM365/settings/'>Settings</a>" +
                
                "</li>"+
                 "<li class='dropdownicon sidelist' title='Job Posting'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/RM365/settings/Job-Posting/'>" +
    "Job Posting" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +
 "<ul class='aside_dropdown_list' aria-labelledby='generalDropdown'>" +

       "<li data-nav-id='../General' title='Custom Fields' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/RM365/settings/Job-Posting/#job-location'>Job Location</a>" +
        "</li>" +
         
        "<li data-nav-id='../General' title='Cost Center' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/RM365/settings/Job-Posting/#job-priority'>Job Priority</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Departments' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/RM365/settings/Job-Posting/#job-sourced-from'>Job Sourced From</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Job Title' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/RM365/settings/Job-Posting/#job-title'>Job Title</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Location' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/RM365/settings/Job-Posting/#job-type'>Job Type</a>" +
        "</li>" +
        
        "<li data-nav-id='../General' title='Location' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/RM365/settings/Job-Posting/#Work-Mode'>Work Mode</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Location' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/RM365/settings/Job-Posting/#yearofexp'>Year(s) of Experience</a>" +
        "</li>" +

   
    

  "</ul>" +
"</li>" +
                 
                 "<li data-nav-id='../advanced/' title='RM365 - Email Configuration' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/RM365/settings/Email-configration/'>Email Configuration</a>" +
                
                "</li>"
                 +
                 "<li data-nav-id='../advanced/' title='RM365 - General-ettings' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/RM365/settings/general-setting/'>General Settings</a>" +
                
                "</li>"
                 +
                 "<li data-nav-id='../advanced/' title='RM365 - Permission' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/RM365/settings/permissions/'>Permission</a>" +
                
                "</li>"
                 +
                 "<li class='dropdownicon sidelist' title='Hirinig Process'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/RM365/settings/hiring-process/'>" +
    "Hiring Process" +
  "</a>" +
  "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +
 "<ul class='aside_dropdown_list' aria-labelledby='generalDropdown'>" +
 "<li data-nav-id='../General' title='Complexity Level' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/RM365/settings/hiring-process/#Complexity-Level'>Complexity Level</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Score Card' class='sidelist'>" +
        "<a href='/HRMS-HR365/modern/admin/apps/RM365/settings/hiring-process/#Score-Card'>Score Card</a>" +
        "</li>" +




 "</ul>"+
 "</li>"
                 +
                 "<li data-nav-id='../advanced/' title='RM365 - Requisition Templates' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/RM365/settings/Requisition-Templates/'>Requisition Templates</a>" +
                
                "</li>"
                 +
                 "<li data-nav-id='../advanced/' title='RM365 - Portal Configuration' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/RM365/settings/portal-configration/'>Portal Configuration</a>" +
                
                "</li>"
                 +
                 

                "</li>" +
                "<a href='/HRMS-HR365/modern/admin/apps/PM365/home-page/' title='PM365'>PM365</a>" +
                "</li>" +

                "<li data-nav-id='../advanced/' title='PM365 - Home Page' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/PM365/home-page/'>Home Page</a>" +
                "</li>" +
                "<li data-nav-id='../advanced/' title='PM365 - Dashboard' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/PM365/dashboard/'>Dashboard</a>" +
                "</li>" +
                "<li data-nav-id='../advanced/' title='PM365 - Document' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/PM365/Document/'>Document</a>" +
                "</li>" +


                "<li data-nav-id='../advanced/' title='PM365 - Appraisal Cycle' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/PM365/appraisal-cycle/'>Appraisal Cycle</a>" +
                "</li>" +

                "<li class='dropdownicon sidelist' title='Roles'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/PM365/roles/'>" +
    "Roles" +
  "</a>" +
  // "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +
//  "<ul class='aside_dropdown_list' aria-labelledby='generalDropdown'>" +
// "<li data-nav-id='./Email-Notification/' title=users class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/roles/#user'>User</a>" +
//         "</li>" +

//         "<li data-nav-id='./Custom-Emails/' title=Manager class='sidelist'>" +
//         " <a href='/HRMS-HR365/modern/admin/apps/PM365/roles/#manager'>Manager(Employee's Manger)</a>" +
//         " </li>" +

//         " <li data-nav-id='./User/' title='HR Executive' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/roles/#hr-executive-dashboard'>HR Executive</a>" +
//         "</li>" +

//         "<li data-nav-id='./General-Settings/' title='HR Manager' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/roles/#hr-manager-dashboard'>HR Manager </a>" +
//         "</li>" +
//         "<li data-nav-id='./General-Settings/' title='HR Head' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/roles/#hr-head-dashboard'>HR Head </a>" +
//         " </li>" +
//         "<li data-nav-id='./General-Settings/' title='HR Manager Admin' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/roles/#hr-manager-admin-dashboard'>HR Manager Admin </a>" +
//         "</li>" +
//         "<li data-nav-id='./General-Settings/' title='HR Head Admin' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/roles/#hr-head-admin'>HR Head–Admin </a>" +
//         "</li>" +
       
//  "</ul>"+
//  "</li>"+
                



                 "<li class='dropdownicon sidelist' title='Administration'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/PM365/administration/'>" +
    "Administration" +
  "</a>" +
  // "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +
//  "<ul class='aside_dropdown_list' aria-labelledby='generalDropdown'>" +


//         "<li data-nav-id='./Custom-Emails/' title=Department class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/administration/#Department'>" +
//         "Department" +
//         "</a>" +
//         "</li>" +
//         "<li data-nav-id='./Custom-Emails/' title=Location class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/administration/#Location'>" +
//         "Location" +
//         "</a>" +
//         "</li>" +
//         "<li data-nav-id='./Custom-Emails/' title=Job Title class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/administration/#job-title'>" +
//         "Job title" +
//         "</a>" +
//         "</li>" +
//         "<li data-nav-id='./Custom-Emails/' title=Categories class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/administration/#categories'>" +
//         "Categories" +
//         "</a>" +
//         "</li>" +

//         "<li data-nav-id='./User/' title=KRA class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/administration/#kra'>" +
//         "KRA(Key Result Area)" +
//         "</a>" +
//         " </li>" +
//         "<li data-nav-id='./User/' title=Goals class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/administration/#Goals'>" +
//         "Goals" +
//         "</a>" +
//         " </li>" +
//         "<li data-nav-id='./User/' title=Competency & Skills class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/administration/#Competency&Skills'>" +
//         "Competency & Skills" +
//         "</a>" +
//         " </li>" +

//         "<li data-nav-id='./General-Settings/' title='Role Template' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/administration/#role-template'>" +
//         "Template(s)" +
//         " </a>" +
//         " </li>" +
//         "<li data-nav-id='./General-Settings/' title='1:1 Template' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/administration/#1:1-template'>" +
//         " 1:1 Template" +
//         " </a>" +
//         " </li>" +
//         "<li data-nav-id='./General-Settings/' title='Feedback Template' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/administration/#FeedbackTemplate'>" +
//         "Feedback template" +
//         " </a>" +
//         " </li>" +


//  "</ul>"+
//  "</li>"+

                "<li data-nav-id='../advanced/' title='PM365 - Settings' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/apps/PM365/settings/'>Settings</a>" +
                "</li>" +


                 "<li class='dropdownicon sidelist' title='General Setting'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/PM365/settings/#general-setting'>" +
    "General Setting" +
  "</a>" +
  // "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +
//  "<ul class='aside_dropdown_list' aria-labelledby='generalDropdown'>" +
//  "<li data-nav-id='../General' title='API Configuration' class='sidelist'>" +
//          "<li data-nav-id='../General' title='API Configuration' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/settings/#API-Configuration'>API Configuration</a>" +
//         "</li>" +
       
//         "<li data-nav-id='../General' title='Overall Rating Method' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/settings/#Overall-Rating-Method'> Overall Rating Method </a>" +
//         "</li>" +
//         "<li data-nav-id='../General' title='Acknowledgement' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/settings/#Acknowledgement'> Acknowledgement </a>" +
//         "</li>" +
//         "<li data-nav-id='../General' title='Brand Logo' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/settings/#Brand-Logo'> Brand Logo </a>" +
//         "</li>" +
     

//  "</ul>"+
//  "</li>"+
                 "<li class='dropdownicon sidelist' title='notification'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/PM365/settings/#notification'>" +
    "Notifications" +
  "</a>" +
  // "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +
//  "<ul class='aside_dropdown_list' aria-labelledby='generalDropdown'>" +

//  "<li data-nav-id='../General' title='Self-Review' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/settings/#Self-Review'> Self-Review</a>" +
//         "</li>" +
//         "<li data-nav-id='../General' title='Appraisal’s-Review' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/settings/#Appraisals-Review'>Appraisal’s-Review</a>" +
//         "</li>" +
//         "<li data-nav-id='../General' title='HR-Review' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/settings/#HR-Review'>HR-Review</a>" +
//         "</li>" +
//         "<li data-nav-id='../General' title='360 Degree' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/settings/#360Degree'>360 Degree</a>" +
//         "</li>" +
//         "<li data-nav-id='../General' title='1:1' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/settings/#OnetoOne'>1:1</a>" +
//         "</li>" +
//         "<li data-nav-id='../General' title='KPI' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/settings/#KPI'>KPI</a>" +
//         "</li>" +




//  "</ul>"+
//  "</li>"+


                 "<li class='dropdownicon sidelist' title='Features'>" +
  "<a class='qwe' href='/HRMS-HR365/modern/admin/apps/PM365/settings/#features'>" +
    "Features" +
  "</a>" +
  // "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' />" +
"</li>" +
//  "<ul class='aside_dropdown_list' aria-labelledby='generalDropdown'>" +
 
//         "<li data-nav-id='../General' title='360 Feedback' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/settings/#360Feedback'>360 Feedback</a>" +
//         "</li>" +
       
//         "<li data-nav-id='../General' title='Appraisal Cycle' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/settings/#AppraisalCycle'>Appraisal Cycle</a>" +
//         "</li>" +
//         "<li data-nav-id='../General' title='1:1' class='sidelist'>" +
//         "<a href='/HRMS-HR365/modern/admin/apps/PM365/settings/#KPICycle'>KPI Cycle</a>" +
//         "</li>" +

// "</ul>"+
// "</li>"+




"<li data-nav-id='../advanced/' title='PM365 - Reports' class='sidelist'>" +
"<a href='/HRMS-HR365/modern/admin/apps/PM365/reports/'>Reports</a>" +
"</li>"
+
                "</ul>" +

                "<li data-nav-id='../advanced/' title=Help class='sidelist dropdown_romove_dot'>" +



                "</ul>" +
                "</ul>"+

                // help start 

               "<li class='dropdownicon sidelist' title='Help'>" +
                "<a href='/HRMS-HR365/modern/admin/help/'>" +
                "Help" +
                "</a>" +
                "<img src='/js/down-arrow-avgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' '>" +
                "</li>" +
                "<li data-nav-id='./Setting/' title='Settings' class='sidelist dropdown_romove_dot'>" +
                "<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
                "<li  data-nav-id='../advanced/' title='Configure SharePoint API permissions' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/help/#Feedback'>Feedback</a>" +
                "</li>" +
                "<li  data-nav-id='../advanced/' title='Configure SharePoint API permissions' class='sidelist'>" +
                "<a href='/HRMS-HR365/modern/admin/help/#product-activation'>Product Activation</a>" +
                "</li>" +
                "</li>" +

                "</ul>" +
                "</ul>" +

                "</ul>"

        )



});
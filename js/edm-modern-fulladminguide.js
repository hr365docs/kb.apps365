$(document).ready(function () {
    $("#edmfullyadminguide").html("");

    $("#edmfullyadminguide").append("<ul>" +
//       intro 
        "<li data-nav-id='./installation/requirments/' title=Introduction class=sidelist>" +
        "<a href='/sharepoint-employee-directory/modern/admin/introduction/'>" +
        "Introduction" +
        "</a>" +
        "</li>" +
// AD 
        "<li data-nav-id='https://github.com/hr365docs/My-project.git/installation/requirments/' title='Architecture Diagram' class=sidelist>" +
        "<a href='/sharepoint-employee-directory/modern/admin/ArchitectureDiagram/'>" +
        "Architecture Diagram" +
        "</a>" +
        "</li>" +
// profil card  
        "<li data-nav-id='https://github.com/hr365docs/My-project.git/installation/requirments/' title='Profile Card' class=sidelist>" +
        "<a href='/sharepoint-employee-directory/modern/admin/profile-card/'>" +
        "Profile Card" +
        "</a>" +
        "</li>" +
// dashboard 
        "<li class='dropdownicon sidelist' title='dashboard'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/dashboard/'>" +
        "Dashboard" +
        "</a>" +
        "<img src='../../down-arrow-svgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' '>" +
        "</li>" +

        "<li data-nav-id='../advanced/' title=dashboard class='sidelist dropdown_romove_dot'>" +



        "<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
        "<li  data-nav-id='../advanced/' title='General' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/dashboard/general'>General</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Advance' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/dashboard/advance'>Advance</a>" +
        "</li>" +
        
        "</ul>" +

        // help 


       
     
        // help end 

        
        
      
       
        


// setting start 
        "<li class='dropdownicon sidelist' title='Settings'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/'>" +
        "Settings" +
        "</a>" +
        "<img src='../../down-arrow-svgrepo-com.svg' class='imageIconmainsetting aside_dropdown_icon_setting''>" +
        "</li>" +

        "<li data-nav-id='./Setting/' title='Settings' class='sidelist dropdown_romove_dot'>" +
      

        "<ul class='sidenavSub-topics aside_dropdown_list_setting' value='settings'>" +

        "<ul id='modernadminmainsetting'>" +
        "<li class='dropdownicon sidelist' title='General'>" +
        "<a  class='qwe' href='/sharepoint-employee-directory/modern/admin/settings/general/'>" +
        "General" +
        "</a>" +
        "<img src='../../down-arrow-svgrepo-com.svg' class='imageIcongeneral aside_dropdown_icon''>" +
        "</li>" +
        "<li data-nav-id='../advanced/' class='sidelist dropdown_romove_dot' >" +

  

        "<ul class='sidenavSub-topics aside_dropdown_list' id='edmmoderngeneral'>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/general/#search-filter'>Search filters</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/general/#allow-user-export-directory'>Allow users to export directory</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Language selection as browser default language' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/general/#language-selection-as-browser'>Language selection as browser default language</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Language Language selection in case browser default language is not detected' class='sidelist '>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/general/#language-selection'>Language selection in case browser default language is not detected</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title=' Update users role and permissions' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/general/#update-roles'>Update users role and permissions</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title=' Update users department' class='sidelist '>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/general/#update-department'>Update users department" +
        "</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title=' Update job title ' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/general/#update-jobtitle'>Update job title" +
        "</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title=' Update users location  ' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/general/#update-location'>Update users location  </a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Collaboration ' class='sidelist '>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/general/#collaboration'>Collaboration </a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Custom link ' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/general/#custom-link'>Custom link</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Organization chart type ' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/general/#organization-chart-type'>Organization chart type</a>" +
        "</li>" +
        "</ul>" +

        "</li>" +








// view setting start 





        "<ul id='modernadminmainsetting'>" +
        "<li class='dropdownicon sidelist' title='view'>" +
        "<a  class='qwe' href='/sharepoint-employee-directory/modern/admin/settings/views/'>" +
        "Views" +
        "</a>" +
        "<img src='../../down-arrow-svgrepo-com.svg' class='imageIcongeneral aside_dropdown_icon''>" +
        "</li>" +
        "<li data-nav-id='../advanced/' class='sidelist dropdown_romove_dot' >" +

  

        "<ul class='sidenavSub-topics aside_dropdown_list' id='edmmoderngeneral'>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Alignemployeebasicinformation'>Align employee basic information</a>" +
        "</li>" +

        // "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        // "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Birthday'>Birthdays and work anniversaries images</a>" +
        // "</li>" +
     
        "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Clearalpha'>Clear alphabet selection with reset filter</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Dashboardfeature'>Dashboard feature</a>" +
        "</li>" +

        // "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        // "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Desktopdefaultview'>Desktop default view</a>" +
        // "</li>" +

        "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#GridWidth'>Grid Width</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Hidemanagerofspecificuser'>Hide manager of specific user</a>" +
        "</li>" +

        // "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        // "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Hidemanagerofspecificuser'>Hide manager of specific user</a>" +
        // "</li>" +

        "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Hidemobilenumberofspecificuser'>Hide mobile number of specific user</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#SharepointConfiguration'>Sharepoint page configuration </a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Imageprofiletag'>Image profile tag</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Labels'>Labels</a>" +
        "</li>" +

        // "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        // "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Mobiledefaultview'>Mobile default view</a>" +
        // "</li>" +

        // "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        // "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Removeextracharacterfromaccountname'>Remove extra character from account name</a>" +
        // "</li>" +

        
        "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#ShoworHidemodules'>Show or Hide modules</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Sortby'>Sort by</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#theme'>Theme</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Useworkemailidinsteadaccountloginid'>Work email ID/UPN ID</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#view'>view</a>" +
        "</li>" +
      "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Userpropertiesingridview'>User properties in grid view</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Userpropertiesinlistview'>User properties in list view</a>" +
        "</li>" +
      
        "<li  data-nav-id='../advanced/' title='Allow users to export directory' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#UserpropertiesinProfileCard'>User properties in Profile Card</a>" +
        "</li>" +
      
        "</ul>" +

        "</li>" +



//  exclude option 



        "<ul id='modernadminmainsetting'>" +
        "<li class='dropdownicon sidelist' title='view'>" +
        "<a  class='qwe' href='/sharepoint-employee-directory/modern/admin/settings/exclude-options/'>" +
        "Exclude Options" +
        "</a>" +
        "<img src='../../down-arrow-svgrepo-com.svg' class='imageIcongeneral aside_dropdown_icon''>" +
        "</li>" +
        "<li data-nav-id='../advanced/' class='sidelist dropdown_romove_dot' >" +

  

        "<ul class='sidenavSub-topics aside_dropdown_list' id='edmmoderngeneral'>" +

        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/exclude-options/#ExcludeO365sign-inblockedusers'>Exclude 365 sign-in blocked users</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/exclude-options/#Excludeuserbydepartment'>Exclude user by department</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/exclude-options/#Excludeusersbyjobtitle'>Exclude users by job title</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/exclude-options/#ExcludeusersbyName'>Exclude users by Name</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/exclude-options/#Excludeuserbyofficelocation'>Exclude user by Office Location</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/exclude-options/#Excludeuserbyusingcsvfile'>Exclude user by using csv file</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/exclude-options/#ExcludeUsersByUPN'>Exclude Users By UPN</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/exclude-options/#Excludeuserbycontain'>Exclude user by contain</a>" +
        "</li>" +

        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/exclude-options/#Excludeusershiddeninaddresslist'>Exclude users hidden in address list</a>" +
        "</li>" +


        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/exclude-options/#Removesharedmailboxes'>Remove shared mailboxes</a>" +
        "</li>" +


       


      
        // "<li data-nav-id='../views/' title='Make user sortabel' class='sidelist'>" +
        // "<a href='/sharepoint-employee-directory/modern/admin/settings/views/#make-user-sortable'>" +
        // "Make user sortable" +
        // "</a>" +
        // "</li>" +


        "<li data-nav-id='../advanced/' title=Advanced class='sidelist dropdown_romove_dot'>" +



       

        "</ul>" +
        
        "<li class='dropdownicon sidelist' title='Advanced'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/'>" +
        "Advanced" +
        "</a>" +
        "<img src='../../down-arrow-svgrepo-com.svg' class='imageIcongeneral aside_dropdown_icon''>" +
        "</li>" +
        "<li data-nav-id='../advanced/' class='sidelist dropdown_romove_dot' >" +

  

        "<ul class='sidenavSub-topics aside_dropdown_list' id='edmmoderngeneral'>" +

        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#Additionalmanager'>Additional manager</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#Autoloadinsteadloadmorebutton'>Auto load instead load more button</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#Autofetchoffice365jobtitlelocationanddepartment'>Auto fetch office 365 job title, location and department</a>" +
        "</li>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#Filterupcomingbirthdaysworkanniversaries'>Filter upcoming birthdays & work anniversaries</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#ConfigureSharePointAPIpermissions'>Configure SharePoint API permissions</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#Customfields'>Custom fields</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#Customfunction'>Custom function</a>" +
        "</li>" +
        // "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        // "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#Defaultviewoftopbarfilters'>Default view of topbar filters</a>" +
        // "</li>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#ExecutiveAssistantrelationship'>Executive Assistant relationship</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#Extendcustomfieldssearchcapability'>Extend custom fields search capability</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#ImportnonM365users'>Import non M365 users</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#ExtendMobileNumberandPhonenumbersearchcapability'>Extend Mobile Number and Phone number search capability</a>" +
        "</li>" +
        // "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        // "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#Selecttopbarfilters'>Select topbar filters</a>" +
        // "</li>" +
        // "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        // "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#ShowGroups'>Show Groups</a>" +
        // "</li>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#RestrictedAccess'>Restricted Access List</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#Syncanddisplaymobilenumberfromazure'>Sync and display mobile number from azure</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#Syncemployeeprofileinformationfrom '>Sync employee profile information from </a>" +
        "</li>" +
        // "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        // "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#Syncunlicensedusers '>Sync unlicensed users </a>" +
        // "</li>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#Syncuserinformationfrom '>Sync user information from </a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#topbarfilters'>Topbar filters</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Search filters' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/advanced/#workemail'>Validate work email with SharePoint account name</a>" +
        "</li>" +
        
        "</li>" +
        "</li>" +

        "</ul>" +
        

        "</a>" +
        "</ul>" +
        // setting end 
      

        "</ul>" +
        
       
        "</ul>" +
        

     
      



        "</ul>" +
        "</ul>"+
// help start 

         
        "<li data-nav-id='../advanced/' title=Help class='sidelist dropdown_romove_dot'>" +

        "<li class='dropdownicon sidelist' title='Help'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/help/'>" +
        "Help" +
        "</a>" +
        "<img src='../../down-arrow-svgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' '>" +
        "</li>" +

        "<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
        "<li  data-nav-id='../advanced/' title='Configure SharePoint API permissions' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/help/#Feedback'>Feedback</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Configure SharePoint API permissions' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/help/#product-activation'>Product Activation</a>" +
        "</li>" +
        "</ul>"
// help end 

)



});
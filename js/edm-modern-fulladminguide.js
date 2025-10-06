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
       

        // help 

// Dashboard
"<li class='dropdownicon sidelist' title='Dashboard'>" +
    "<a href='/sharepoint-employee-directory/modern/admin/dashboard/'>" +
        "Dashboard" +
    "</a>" +
    "<img src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg' class='imageIcondashboard aside_dropdown_icon'>" +
"</li>" +

"<li data-nav-id='../dashboard/' class='sidelist dropdown_romove_dot'>" +
    "<ul class='sidenavSub-topics aside_dropdown_list' id='moderndashboard'>" +

        // Organization
        "<li class='dropdownicon sidelist' title='Organization'>" +
            "<a href='/sharepoint-employee-directory/modern/admin/dashboard/organization/'>" +
                "Organization" +
            "</a>" +
            "<img src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg' class='imageIconorganization aside_dropdown_icon'>" +
        "</li>" +

        "<li data-nav-id='../dashboard/organization/' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list' id='moderndashboardorganization'>" +

                "<li data-nav-id='../dashboard/organization/general/' title='General' class='sidelist'>" +
                    "<a href='/sharepoint-employee-directory/modern/admin/dashboard/organization/general/'>General</a>" +
                "</li>" +

                "<li data-nav-id='../dashboard/organization/advanced/' title='Advanced' class='sidelist'>" +
                    "<a href='/sharepoint-employee-directory/modern/admin/dashboard/organization/advance/'>Advanced</a>" +
                "</li>" +

            "</ul>" +
        "</li>" +

        // Analytics
        "<li class='dropdownicon sidelist' title='Analytics'>" +
            "<a href='/sharepoint-employee-directory/modern/admin/dashboard/analytics/'>" +
                "Analytics" +
            "</a>" +
            "<img src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg' class='imageIconanalytics aside_dropdown_icon'>" +
        "</li>" +

    "</ul>" +
"</li>" +

       
     
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
        "<li data-nav-id='../advanced/' title='Auto Load Configuration' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/general/#AutoLoadConfiguration'>Auto Load Configuration</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Birthday and anniversary templates' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/general/#Birthdayandanniversarytemplates'>Birthday and anniversary templates</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Brand logo' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/general/#Brandlogo'>Brand logo</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Collaboration' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/general/#Collaboration'>Collaboration</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='GCC Tenant' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/general/#GCCTenant'>GCC Tenant</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Extend Mobile Number Search Capability' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/general/#ExtendMobileNumberSearch'>Extend Mobile Number Search Capability</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Extend Custom Fields Search Capability' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/general/#ExtendCustomFieldsSearch'>Extend Custom Fields Search Capability</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Filter Attributes' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/general/#Filterattribute'>Filter Attributes</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Language selection as browser default language' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/general/#language-selection-as-browser'>Language selection as browser default language</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Language selection' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/general/#language-selection'>Language selection</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Organization name' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/general/#Organizationname'>Organization name</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Records to load' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/general/#Recordstoload'>Records to load</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Role and Permissions' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/general/#update-department'>Role and Permissions</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Sync Job Title, Location and Department' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/general/#SyncJobTitleLocationDept'>Sync Job Title, Location and Department</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Validate Work Email with SharePoint Account Name' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/general/#ValidateWorkEmail'>Validate Work Email with SharePoint Account Name</a>" +
"</li>"+
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
        "<li data-nav-id='../advanced/' title='Align employee basic information' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Alignemployeebasicinformation'>Align employee basic information</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Clear alphabet selection with reset filter' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Clearalpha'>Clear alphabet selection with reset filter</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Dashboard feature' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Dashboardfeature'>Dashboard feature</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Grid Width' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/views/#GridWidth'>Grid Width</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Hide manager of specific user' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Hidemanagerofspecificuser'>Hide manager of specific user</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Hide mobile number of specific user' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Hidemobilenumberofspecificuser'>Hide mobile number of specific user</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Sharepoint page configuration' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/views/#SharepointConfiguration'>Sharepoint page configuration</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Profile Image Width' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/views/#ProfileImageWidth'>Profile Image Width</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Labels' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Labels'>Labels</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Show or Hide modules' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/views/#ShoworHidemodules'>Show or Hide modules</a>" +
"</li>" +



"<li data-nav-id='../advanced/' title='Sort by' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Sortby'>Sort by</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Theme' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/views/#theme'>Theme</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='Work email ID/UPN ID' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Useworkemailidinsteadaccountloginid'>Work email ID/UPN ID</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='view' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/views/#view'>views</a>"+
"</li>" +

"<li data-nav-id='../advanced/' title='User properties in grid view' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Userpropertiesingridview'>User properties in grid view</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='User properties in list view' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/views/#Userpropertiesinlistview'>User properties in list view</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='User properties in Profile Card' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/views/#UserpropertiesinProfileCard'>User properties in Profile Card</a>" +
"</li>" +

"<li data-nav-id='../advanced/' title='User properties in hover card' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/views/#User-Properties-in-Hover-Card'>User properties in hover card</a>" +
"</li>"+
      
        "</ul>" +

        "</li>" +



//  exclude option 



        "<ul id='modernadminmainsetting'>" +
        "<li class='dropdownicon sidelist' title='Integration'>" +
       "<a href='/sharepoint-employee-directory/modern/admin/settings/integration/'>Integrations</a>"
      
       +
        "<img src='../../down-arrow-svgrepo-com.svg' class='imageIcongeneral aside_dropdown_icon''>" +
        "</li>" +
        "<li data-nav-id='../advanced/' class='sidelist dropdown_romove_dot' >" +

  

        "<ul class='sidenavSub-topics aside_dropdown_list' id='edmmoderngeneral'>" +

       
"<li data-nav-id='../../azure-storage-configuration/' title='Azure Storage Configuration' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/integration/#AzureStorageConfiguration'>Azure Storage Configuration</a>" +
"</li>" +
"<li data-nav-id='../../configure-sharepoint-api/' title='Configure SharePoint API Permissions' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/integration/#ConfigureSharePointAPI'>Configure SharePoint API Permissions</a>" +
"</li>" +
"<li data-nav-id='../../map-external-list/' title='Map external list' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/integration/#Map-external-list'>Map external list</a>" +
"</li>" +
"<li data-nav-id='../../shared-mailbox-id/' title='Shared Mailbox ID' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/integration/#SharedMailboxID'>Shared Mailbox ID</a>" +
"</li>" +
"<li data-nav-id='../../slack/' title='Slack' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/integration/#SlackIntegration'>Slack</a>" +
"</li>" +
"<li data-nav-id='../../sync-mobile-number-azure/' title='Sync and Display Mobile Number from Azure' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/integration/#SyncMobileNumberAzure'>Sync and Display Mobile Number from Azure</a>" +
"</li>" +
"<li data-nav-id='../../sync-employee-profile-images/' title='Sync Employee Profile Images From' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/integration/#SyncEmployeeProfileImages'>Sync Employee Profile Images From</a>" +
"</li>" +
"<li data-nav-id='../../sync-employee-profile-information/' title='Sync Employee Profile Information From' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/integration/#SyncEmployeeProfileSource'>Sync Employee Profile Information From</a>" +
"</li>" +
"<li data-nav-id='../../sync-user-information/' title='Sync User Information From' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/integration/#SyncUserInformation'>Sync User Information From</a>" +
"</li>" +
"<li data-nav-id='../../time-off-manager/' title='Time Off Manager' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/integration/#TimeOffManager'>Time Off Manager</a>" +
"</li>" +

       

        "</ul>" +
        
        "<li class='dropdownicon sidelist' title='Features'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/settings/feature/'>Features</a>" +


        "<img src='../../down-arrow-svgrepo-com.svg' class='imageIcongeneral aside_dropdown_icon''>" +
        "</li>" +
        "<li data-nav-id='../advanced/' class='sidelist dropdown_romove_dot' >" +

  

        "<ul class='sidenavSub-topics aside_dropdown_list' id='edmmoderngeneral'>" +

"<li data-nav-id='../../additional-manager/' title='Additional manager' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/feature/#Additionalmanager'>Additional manager</a>" +
"</li>" +
"<li data-nav-id='../../analytics-report/' title='Analytics Report' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/feature/#Analytics-Report'>Analytics Report</a>" +
"</li>" +
"<li data-nav-id='../../upcoming-birthdays-work-anniversaries/' title='Upcoming Birthdays & Work Anniversaries' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/feature/#UpcomingEvents'>Upcoming Birthdays & Work Anniversaries</a>" +
"</li>" +
"<li data-nav-id='../../custom-fields/' title='Custom fields' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/feature/#Customfields'>Custom fields</a>" +
"</li>" +
"<li data-nav-id='../../custom-function/' title='Custom Function' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/feature/#CustomFunction'>Custom Function</a>" +
"</li>" +
"<li data-nav-id='../../employee-info-page/' title='Employee info page' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/feature/#Employeeinfopage'>Employee info page</a>" +
"</li>" +
"<li data-nav-id='../../exclude-options/' title='Exclude Options' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/feature/#ExcludeOptions'>Exclude Options</a>" +
"</li>" +
"<li data-nav-id='../../executive-assistant-relationship/' title='Executive Assistant Relationship' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/feature/#ExecutiveAssistantrelationship'>Executive Assistant Relationship</a>" +
"</li>" +
"<li data-nav-id='../../export-data-permission/' title='Export Data Permission' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/feature/#Export-data-permission'>Export Data Permission</a>" +
"</li>" +
"<li data-nav-id='../../home-page-custom-url/' title='Home page custom url' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/feature/#Homepagecustomurl'>Home page custom url</a>" +
"</li>" +
"<li data-nav-id='../../image-profile-tag/' title='Image Profile Tag' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/feature/#ImageProfileTag'>Image Profile Tag</a>" +
"</li>" +
"<li data-nav-id='../../import-m365-users-pronouns/' title='Import M365 Users' Pronouns' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/feature/#ImportPronouns'>Import M365 Users' Pronouns</a>" +
"</li>" +
"<li data-nav-id='../../import-non-m365-users/' title='Import non-M365 Users' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/feature/#ImportNonM365Users'>Import non-M365 Users</a>" +
"</li>" +
"<li data-nav-id='../../organization-chart-type/' title='Organization chart type' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/feature/#orgChart'>Organization chart type</a>" +
"</li>" +

"<li data-nav-id='../../restricted-access-list/' title='Restricted Access List' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/feature/#RestrictedAccess'>Restricted Access List</a>" +
"</li>" +
"<li data-nav-id='../../search-filters/' title='Search Filters' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/feature/#SearchFilters'>Search Filters</a>" +
"</li>" +
        "<li data-nav-id='../../topbar-filter/' title='Topbar Filter' class='sidelist'>" +
"<a href='/sharepoint-employee-directory/modern/admin/settings/feature/#TopbarFilter'>Topbar Filter</a>" +
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
        "<li data-nav-id='../advanced/' class='sidelist dropdown_romove_dot' >" +

  

        

        "<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
        "<li  data-nav-id='../advanced/' title='Configure SharePoint API permissions' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/help/#Feedback'>Feedback</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Configure SharePoint API permissions' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/help/#product-activation'>Product Activation</a>" +
        "</li>" +
         "<li  data-nav-id='../advanced/' title='Configure SharePoint API permissions' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/help/#validate-filtered-user'>Validate Filtered User(s)</a>" +
        "</li>" +

         "<li  data-nav-id='../advanced/' title='User Profile License Limit Exceeded' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/modern/admin/help/#_license_limit'>User Profile License Limit Exceeded</a>" +
        "</li>" +
        "</ul>"+
        "</li>"
// help end 

)



});
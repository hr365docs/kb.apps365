$(document).ready(function () {
    $("#rmmmodernadmin").html("");

    $("#rmmmodernadmin").append("<li data-nav-id='./Settings/' title=Introduction class=sidelist>" +

        "<a href='/RM365/modern/admin/introduction/'>" +
        " Introduction" +
        " </a>" +
        "</li>" +
        "<li data-nav-id='./Settings/' title='Architecture Diagram' class=sidelist>" +

        "<a href='/RM365/modern/admin/architecture-diagram/'>" +
        "Architecture Diagram" +
        "</a>" +

        "</li>" +
        "<li data-nav-id='./Settings/' title='Home Page' class=sidelist>" +

        "<a href='/RM365/modern/admin/home-page/'>" +
        "Home Page" +
        "</a>" +

        "</li>" +
        "<li class='dropdownicon sidelist' title='Draft'>" +
        "<a href='/RM365/modern/admin/draft/'>" +
        "Draft" +
        "</a>" +


        "<li data-nav-id='./Settings/' title=inactive-items class=sidelist>" +

        "<a href='/RM365/modern/admin/inactiveitem/'>" +
        " Inactive Items" +
        "</a>" +
        "</li>" +



        "<li data-nav-id='./Settings/' title=Administration class=sidelist>" +

        "<a href='/RM365/modern/admin/administration/'>" +
        " Administration" +
        "</a>" +
        "</li>" +



        "<li class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/RM365/modern/admin/settings/'>" +
        "Settings" +
        "</a>" +
        "<img src='https://ik.imagekit.io/zn4au2jftpm5/hr365/down-arrow-avgrepo-com_TZAnDIIsES.svg?updatedAt=1717655767081'  class='helpdesk-img aside_dropdown_icon_setting'>" +
        "</li>" +


        "<li data-nav-id='../system-settings' title=system-settings class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list_setting'>" +


        "<li data-nav-id='../user' title=Users and Departments class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/RM365/modern/admin/settings/users-departments/'>Users and Departments</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</a>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='../General' title='User' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/users-departments/#User'>User</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Departments' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/users-departments/#Department'>Departments</a>" +
        "</li>" +

        "</ul>" +
        "<li data-nav-id='../user' title=Job Posting class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/RM365/modern/admin/settings/Job-Posting/'>Job Posting</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</a>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='../General' title='Custom Fields' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/Job-Posting/#job-location'>Job Location</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Cost Center' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/Job-Posting/#job-priority'>Job Priority</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Departments' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/Job-Posting/#job-sourced-from'>Job Sourced From</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Job Title' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/Job-Posting/#job-title'>Job Title</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Location' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/Job-Posting/#job-type'>Job Type</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Location' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/Job-Posting/#Work-Mode'>Work Mode</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Location' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/Job-Posting/#yearofexp'>Year(s) of Experience</a>" +
        "</li>" +

        "</ul>" +
        "<li data-nav-id='../General' title='Location' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/Email-configration'>Email Configuration</a>" +
        "</li>" +
        "<li data-nav-id='../user' title=Feature class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/RM365/modern/admin/settings/general-setting'>General Settings</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</a>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +

        "<li data-nav-id='../General' title='Date format' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/general-setting/#Date-Format'> Date format </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Theme' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/general-setting/#Theme'>Theme</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Language' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/general-setting/#Languages'> Language </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Enable Favicon' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/general-setting/#Enable-Favicon'> Enable Favicon </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Sharepoint Page Configuration:' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/general-setting/#Hide-Sharepoint-Pages-Default-Components'> Sharepoint Page Configuration </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Brand Logo' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/general-setting/#Brand-logo'> Brand Logo  </a>" +
        "</li>" +





        "</ul>" +
        "<li data-nav-id='../General' title='Sharepoint Page Configuration:' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/permissions/'>Permission</a>" +
        "</li>" +
        "<li data-nav-id='../user' title=Feature class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/RM365/modern/admin/settings/hiring-process'>Hiring Process</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</a>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='../General' title='Complexity Level' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/hiring-process/#Complexity-Level'>Complexity Level</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Score Card' class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/hiring-process/#Score-Card'>Score Card</a>" +
        "</li>" +

        "</ul>" +
        " <li data-nav-id='./Custom-Emails/' title=Users class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/Requisition-Templates'>" +
        "Requisition Templates" +
        " </a>" +
        "</li>" +
        " <li data-nav-id='./Custom-Emails/' title=Users class='sidelist'>" +
        "<a href='/RM365/modern/admin/settings/portal-configration'>" +
        "Portal Configuration" +
        " </a>" +
        "</li>" +

        "</ul>" +
        "</ul>" +
        "</li >" +





        "</ul>" +

        "</li>" +



        "<li class='dropdownicon sidelist' title='Help'>" +
        "<a href='/RM365/modern/admin/help/'>" +
        "Help" +
        "</a>" +
        "<img src='https://ik.imagekit.io/zn4au2jftpm5/hr365/down-arrow-avgrepo-com_TZAnDIIsES.svg?updatedAt=1717655767081' class='imageIconadvanced aside_dropdown_icon' '>" +
        "</li>" +

        "<li data-nav-id='../advanced/' title=Help class='sidelist dropdown_romove_dot'>" +



        "<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
        "<li  data-nav-id='../advanced/' title='Configure SharePoint API permissions' class='sidelist'>" +
        "<a href='/RM365/modern/admin/help/#product-activation'>Product Activation</a>" +
        "</li>")

});

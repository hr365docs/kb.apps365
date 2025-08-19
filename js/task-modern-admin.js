$(document).ready(function () {
    $("#taskmodernadmin").html("");

    $("#taskmodernadmin").append("<ul>" +
        // Introduction
        "<li data-nav-id='./installation/requirments/' title='Introduction' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/introduction/'>" +
        "Introduction" +
        "</a>" +
        "</li>" +
        // Architecture Diagram
        "<li data-nav-id='./installation/requirments/' title='Architecture Diagram' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/architecture-diagram/'>" +
        "Architecture Diagram" +
        "</a>" +
        "</li>" +
        // Home Page
        "<li data-nav-id='./installation/requirments/' title='Home Page' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/homepage/'>" +
        "Home Page" +
        "</a>" +
        "</li>" +
        // Dashboard
        "<li class='dropdownicon sidelist' title='Dashboard'>" +
        "<a href='/task-management-365/modern/admin/dashboard/'>" +
        "Dashboard" +
        "</a>" +
       
        "</li>" +
       
        // Report
        "<li data-nav-id='./installation/requirments/' title='Report' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/reports/'>" +
        "Report" +
        "</a>" +
        "</li>" +
        // Settings
        "<li class='dropdownicon sidelist' title='Settings'>" +
        "<a href='/task-management-365/modern/admin/settings/'>" +
        "Settings" +
        "</a>" +
        "<img src='https://ik.imagekit.io/zn4au2jftpm5/hr365/down-arrow-avgrepo-com_TZAnDIIsES.svg?updatedAt=1717655767081' class='imageIconmainsetting aside_dropdown_icon_setting'>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='Settings' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list_setting' value='settings'>" +
        // General Settings
        "<ul id='modernadminmainsetting'>" +
        "<li class='dropdownicon sidelist' title='General'>" +
        "<a class='qwe' href='/task-management-365/modern/admin/settings/generalsetting/'>" +
        "General" +
        "</a>" +
        "<img src='https://ik.imagekit.io/zn4au2jftpm5/hr365/down-arrow-avgrepo-com_TZAnDIIsES.svg?updatedAt=1717655767081' class='imageIcongeneral aside_dropdown_icon'>" +
        "</li>" +
        "<li data-nav-id='../advanced/' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list' id='edmmoderngeneral'>" +
        "<li data-nav-id='../advanced/' title='Date Format' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/generalsetting/#Date-Format'>Date Format</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Time Format' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/generalsetting/#Time-Format'>Time Format</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Theme' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/generalsetting/#Theme'>Theme</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='GCC Tenant' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/generalsetting/#GCC-Tenant'>GCC Tenant</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Fav Icon' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/generalsetting/#Fav-Icon'>Fav Icon</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Language' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/generalsetting/#Language'>Language</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Hide SharePoint Components' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/generalsetting/#Hide-SharePoint-Components'>Hide SharePoint Page's Default Components</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Brand Logo' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/generalsetting/#Brand-logo'>Brand Logo</a>" +
        "</li>" +
        "</ul>" +
        "</li>" +
        "</ul>" +
        // Users, Roles and Permissions
        "<ul id='modernadminmainsetting'>" +
        "<li class='dropdownicon sidelist' title='Users, Roles and Permissions'>" +
        "<a class='qwe' href='/task-management-365/modern/admin/settings/users/'>" +
        "Users, Roles and Permissions" +
        "</a>" +
        "<img src='https://ik.imagekit.io/zn4au2jftpm5/hr365/down-arrow-avgrepo-com_TZAnDIIsES.svg?updatedAt=1717655767081' class='imageIcongeneral aside_dropdown_icon'>" +
        "</li>" +
        "<li data-nav-id='../advanced/' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list' id='edmmoderngeneral'>" +
        "<li data-nav-id='../advanced/' title='Users' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/users/#Users'>Users</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Task Permissions' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/users/#Task-Permissions'>Task Permissions</a>" +
        "</li>" +
        "</ul>" +
        "</li>" +
        "</ul>" +
        // General Administration
        "<ul id='modernadminmainsetting'>" +
        "<li class='dropdownicon sidelist' title='General Administration'>" +
        "<a class='qwe' href='/task-management-365/modern/admin/settings/general-administration/'>" +
        "General Administration" +
        "</a>" +
        "<img src='https://ik.imagekit.io/zn4au2jftpm5/hr365/down-arrow-avgrepo-com_TZAnDIIsES.svg?updatedAt=1717655767081' class='imageIcongeneral aside_dropdown_icon'>" +
        "</li>" +
        "<li data-nav-id='../advanced/' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list' id='edmmoderngeneral'>" +
        "<li data-nav-id='../advanced/' title='Priority' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/general-administration/#Priority'>Priority</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Buckets' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/general-administration/#Buckets'>Buckets</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Clients' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/general-administration/#Clients'>Clients</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Projects' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/general-administration/#Projects'>Projects</a>" +
        "</li>" +
        "</ul>" +
        "</li>" +
        "</ul>" +
        // Notifications
        "<ul id='modernadminmainsetting'>" +
        "<li class='dropdownicon sidelist' title='Notifications'>" +
        "<a class='qwe' href='/task-management-365/modern/admin/settings/Notification/'>" +
        "Notifications" +
        "</a>" +
        "<img src='https://ik.imagekit.io/zn4au2jftpm5/hr365/down-arrow-avgrepo-com_TZAnDIIsES.svg?updatedAt=1717655767081' class='imageIcongeneral aside_dropdown_icon'>" +
        "</li>" +
        "<li data-nav-id='../advanced/' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list' id='edmmoderngeneral'>" +
        "<li data-nav-id='../advanced/' title='Email Templates' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/Notification/#Email-Templates'>Email Templates</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Notification Settings' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/Notification/#Notification-Settings'>Notification Settings</a>" +
        "</li>" +
        "</ul>" +
        "</li>" +
        "</ul>" +
        // Features
        "<ul id='modernadminmainsetting'>" +
        "<li class='dropdownicon sidelist' title='Features'>" +
        "<a class='qwe' href='/task-management-365/modern/admin/settings/features/'>" +
        "Features" +
        "</a>" +
        "<img src='https://ik.imagekit.io/zn4au2jftpm5/hr365/down-arrow-avgrepo-com_TZAnDIIsES.svg?updatedAt=1717655767081' class='imageIcongeneral aside_dropdown_icon'>" +
        "</li>" +
        "<li data-nav-id='../advanced/' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list' id='edmmoderngeneral'>" +
        "<li data-nav-id='../advanced/' title='Custom Columns' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/features/#Custom-Columns'>Custom Columns</a>" +
        "</li>" +
        "</ul>" +
        "</li>" +
        "</ul>" +
        // integration
        "<ul id='modernadminmainsetting'>" +
        "<li class='dropdownicon sidelist' title='integration'>" +
        "<a class='qwe' href='/task-management-365/modern/admin/settings/integration/'>" +
        "Integrations" +
        "</a>" +
        "<img src='https://ik.imagekit.io/zn4au2jftpm5/hr365/down-arrow-avgrepo-com_TZAnDIIsES.svg?updatedAt=1717655767081' class='imageIcongeneral aside_dropdown_icon'>" +
        "</li>" +
        "<li data-nav-id='../advanced/' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list' id='edmmoderngeneral'>" +
        "<li data-nav-id='../advanced/' title='Employee Onboarding 365' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/integration/#Employee-Onboarding-365'>Employee Onboarding 365</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Asset Management 365' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/integration/#Asset-Management-365'>Asset Management 365</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Helpdesk 365' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/integration/#Helpdesk-365'>Helpdesk 365</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Time-off Manager 365' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/integration/#Time-off-Manager-365'>Time-off Manager 365</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Timesheet 365' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/integration/#Timesheet-365'>Timesheet 365</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Expense Tracker 365' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/integration/#Expense-Tracker-365'>Expense Tracker 365</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Recruitment Management 365' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/integration/#Recruitment-Management-365'>Recruitment Management 365</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Performance Management 365' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/integration/#Performance-Management-365'>Performance Management 365</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='CLM365 - Contract Management' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/integration/#CLM365-Contract-Management'>CLM365 - Contract Management</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Microsoft Planner' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/integration/#Microsoft-Planner'>Microsoft Planner</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Azure DevOps' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/settings/integration/#Azure-Devops'>Azure Devops</a>" +
        "</li>" +
        "</ul>" +
        "</li>" +
        "</ul>" +
        "</ul>" +
        "</li>" +
//theme
"<li data-nav-id='./installation/requirments/' title='theme' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/theme/'>" +
        "Theme" +
        "</a>" +
        "</li>" +

        // Help
        "<li class='dropdownicon sidelist' title='Help'>" +
        "<a href='/task-management-365/modern/admin/help/'>" +
        "Help" +
        "</a>" +
        "<img src='https://ik.imagekit.io/zn4au2jftpm5/hr365/down-arrow-avgrepo-com_TZAnDIIsES.svg?updatedAt=1717655767081' class='imageIconadvanced aside_dropdown_icon'>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Help' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
        "<li data-nav-id='../advanced/' title='Feedback' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/help/#feedback'>Feedback</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Product Activation' class='sidelist'>" +
        "<a href='/task-management-365/modern/admin/help/#product-activation'>Product Activation</a>" +
        "</li>" +
       
        "</ul>" +
        "</li>" +
        "</ul>"
    );
});
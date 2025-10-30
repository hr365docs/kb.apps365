$(document).ready(function () {
    $("#obm-modern-admin").html("");
    $("#obm-modern-admin").append(
        "<ul>" +
        "<li data-nav-id='./installation/requirments/' title=Overview class='sidelist '>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/overview/'> Overview </a>" +
        "</li>" +

        "<li data-nav-id='../Exclude-Options/' title='Home Page' class=sidelist>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/home/'> Home Page </a>" +
        "</li>" +
        "<li data-nav-id='../Exclude-Options/' title='Architecture Diagram ' class=sidelist>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/ArchitectureDiagram/'> Architecture Diagram </a>" +
        "</li>" +
        "<li data-nav-id='../Exclude-Options/' title='Dashboard' class=sidelist>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/dashboard/'>Dashboard</a>" +
        "</li>" +
        "<li data-nav-id=https://github.com/hr365docs/My-project.git/installation/requirments/ title='Access requirements' class='sidelist'>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/access-requirements/'> Access requirements </a>" +
        "</li>" +
        // "<li data-nav-id=https://github.com/hr365docs/My-project.git/installation/requirments/ title='Settings' class='sidelist'>" +
        // "<a href='/sharepoint-employee-onboarding/modern/admin/settings/'> Settings </a>" +
        // "</li>" +

      
"<li class='dropdownicon sidelist' title='Settings'>" +
    "<a class='qwe' href='/sharepoint-employee-onboarding/modern/admin/setting/'>Settings</a>" +
    "<img class='helpdesk-img aside_dropdown_icon_setting' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
"</li>" +

"<li data-nav-id='./Setting/' title='Set up of application' class='sidelist dropdown_romove_dot'>" +
    "<ul class='sidenavSub-topics aside_dropdown_list_setting'>" +

        "<li class='dropdownicon sidelist' title='General Administration'>" +
            "<a class='qwe' href='/sharepoint-employee-onboarding/modern/admin/setting/general-administation/'>General Administration</a>" +
            "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li data-nav-id='../General' title='Onboarded Users' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-administation/#Onboarded-Users'>Onboarded Users</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Position' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-administation/#Position'>Position</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Department' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-administation/#Department'>Department</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Locations' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-administation/#Locations'>Locations</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Software' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-administation/#Software'>Software</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Office' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-administation/#Office'>Office</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Devices' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-administation/#Devices'>Devices</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Status' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-administation/#Status'>Status</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Employee Type' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-administation/#Employee-Type'>Employee Type</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Additional Fields' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-administation/#AdditionalFields'>Additional Fields</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Reason for Offboard' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-administation/#Reason-for-Offboard'>Reason for Offboard</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Notice Period' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-administation/#Notice-Period'>Notice Period</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Document Settings' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-administation/#Document_Settings'>Document Settings</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Audit Logs' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-administation/#Audit-Logs'>Audit Logs</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Groups' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-administation/#Groups'>Groups</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Custom Forms' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-administation/#CustomForms'>Custom Forms</a>" +
                "</li>" +
            "</ul>" +
        "</li>" +

        "<li class='dropdownicon sidelist' title='Task Administration'>" +
            "<a class='qwe' href='/sharepoint-employee-onboarding/modern/admin/setting/task-administation/'>Task Administration</a>" +
            "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li data-nav-id='../General' title='Task Categories' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/task-administation/#Task-Categories'>Task Categories</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Activity Type' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/task-administation/#Activity-Type'>Activity Type</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Task' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/task-administation/#Task'>Task</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Task Template' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/task-administation/#Task-Template'>Task Template</a>" +
                "</li>" +
            "</ul>" +
        "</li>" +

        "<li class='dropdownicon sidelist' title='General Settings'>" +
            "<a class='qwe' href='/sharepoint-employee-onboarding/modern/admin/setting/general-setting/'>General Settings</a>" +
            "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li data-nav-id='../General' title='Date Format' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-setting/#Date-Format'>Date Format</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Theme' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-setting/#Theme'>Theme</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Naming Convention' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-setting/#Naming-Convention'>Naming Convention</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='GCC Tenant' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-setting/#GCC-Tenant'>GCC Tenant</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Show Fav Icon' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-setting/#Show-FavIcon'>Show Fav Icon</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Language' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-setting/#Language'>Language</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Use Sharepoint URL for MS Teams installed application' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-setting/#SharepointURL'>Use Sharepoint URL for MS Teams installed application</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Hide Sharepoint Page&apos;s Default Components' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-setting/#hide'>Hide Sharepoint Page&apos;s Default Components</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Brand Logo' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/general-setting/#Brand-Logo'>Brand Logo</a>" +
                "</li>" +
            "</ul>" +
        "</li>" +

        "<li class='dropdownicon sidelist' title='Users, Roles and Permissions'>" +
            "<a class='qwe' href='/sharepoint-employee-onboarding/modern/admin/setting/Users-Roles-and-Permissions/'>Users, Roles and Permissions</a>" +
            "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li data-nav-id='../General' title='App Users' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Users-Roles-and-Permissions/#users'>App Users</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Add/Edit Teams' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Users-Roles-and-Permissions/#teams'>Add/Edit Teams</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Teams Permissions' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Users-Roles-and-Permissions/#Permissions'>Teams Permissions</a>" +
                "</li>" +
            "</ul>" +
        "</li>" +

        "<li class='dropdownicon sidelist' title='Integrations'>" +
            "<a class='qwe' href='/sharepoint-employee-onboarding/modern/admin/setting/Integration/'>Integrations</a>" +
            "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li data-nav-id='../General' title='Configure Sharepoint API Permission' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Integration/#configure-api'>Configure Sharepoint API Permission</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='E-Sign' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Integration/#E-Sign'>E-Sign</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='MS Form' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Integration/#MS-Form'>MS Form</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Mailbox Integration' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Integration/#Mailbox-Integration'>Mailbox Integration</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='AI Integration' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Integration/#AI-Integration'>AI Integration</a>" +
                "</li>" +
            "</ul>" +
        "</li>" +

        "<li class='dropdownicon sidelist' title='Features'>" +
            "<a class='qwe' href='/sharepoint-employee-onboarding/modern/admin/setting/Features/'>Features</a>" +
            "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li data-nav-id='../General' title='Custom Columns' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Features/#Custom-Columns'>Custom Columns</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Quick Share Links' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Features/#Quick-Share-Links'>Quick Share Links</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Approval Workflow' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Features/#Approval-Workflow'>Approval Workflow</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Delegation' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Features/#delegation'>Delegation</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Create User in M365' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Features/#Create-User-in-M365'>Create User in M365</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Guest Users' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Features/#GUsers'>Guest Users</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Show Home Sample Data' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Features/#ShowHomeSampleData'>Show Home Sample Data</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Preonboarding' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Features/#Preonboarding'>Preonboarding</a>" +
                "</li>" +
            "</ul>" +
        "</li>" +

        "<li class='dropdownicon sidelist' title='Notifications'>" +
            "<a class='qwe' href='/sharepoint-employee-onboarding/modern/admin/setting/Notification/'>Notifications</a>" +
            "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li data-nav-id='../General' title='Email' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Notification/#Email'>Email</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Reminder Notifications' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Notification/#Reminder-Notifications'>Reminder Notifications</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Enable Task Notification with Power Automate Flow' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/Notification/#_enable_task_notification'>Enable Task Notification with Power Automate Flow</a>" +
                "</li>" +
            "</ul>" +
        "</li>" +

        "<li class='dropdownicon sidelist' title='EO365 Assessments'>" +
            "<a class='qwe' href='/sharepoint-employee-onboarding/modern/admin/setting/EO365-Assesment/'>EO365 Assessments</a>" +
            "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li data-nav-id='../General' title='Question' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/EO365-Assesment/#Questions'>Question</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Sections' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/EO365-Assesment/#Sections'>Sections</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Assessments' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/EO365-Assesment/#Assessments'>Assessments</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Company Details' class='sidelist'>" +
                    "<a href='/sharepoint-employee-onboarding/modern/admin/setting/EO365-Assesment/#Company-Details'>Company Details</a>" +
                "</li>" +
            "</ul>" +
        "</li>" +

    "</ul>" +
"</li>"+
        "<li data-nav-id='../General' class=sidelist>" +
        "</li>" +
        "<li data-nav-id='../General' title=Report class=sidelist>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/report/'> Report </a>" +
        "</li>" +
        "<li data-nav-id='../views/' title='Share Ess Url' class=sidelist>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/share-ess-url/'> Share Ess Url </a>" +
        "</li>" +


        "<li class='dropdownicon sidelist' title='process'>" +
        "<a class='qwe' href='/sharepoint-employee-onboarding/modern/admin/process/'>Process</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li data-nav-id='../views/' title='Process' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='../General' title='My Active Task' class=sidelist>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/process/#my-active-task'> My Active Task </a>" +
        "</li>" +
        "<li data-nav-id='../General' title=' My Overdue Task' class=sidelist>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/process/#my-overdue-task'> My Overdue Task </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Onboarding Process' class=sidelist>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/process/#onboarding-process'> Onboarding Process </a>" +
        " </li>" +
        "<li data-nav-id='../General' title='Offboarding Process' class='sidelist'>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/process/#offboarding-process'> Offboarding Process </a>" +
        "</li>" +
        "<li data-nav-id='../General' title=' All active Task' class='sidelist'>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/process/#all-active-task'> All active Task </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='All Overdue Task' class='sidelist'>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/process/#all-overdue-task'> All Overdue Task </a>" +
        "</li>" +
        "<li data-nav-id='../General' title=Onboarded class='sidelist'>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/process/#onboarded'> Onboarded </a>" +
        "</li>" +
        "</li>" +
        "<li data-nav-id='../General' title=Offboarded class='sidelist'>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/process/#offboarded'> Offboarded </a>" +
        "</li>" +
        "<li data-nav-id='../General' title=Training class='sidelist'>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/process/#training'>Training</a>" +
        "</li>" +
        "<li data-nav-id='../General' title=pre-onboarding class='sidelist'>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/process/#pre-onboarding'>Pre-onboarding</a>" +
        "</li>" +
        "</ul>" +
         "<li data-nav-id='../General' title=email-tracker class='sidelist'>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/email-tracker/'> Email Tracker</a>" +
        "</li>" +


        "<li class='dropdownicon sidelist' title='Help'>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/help/'>" +
        "Help" +
        "</a>" +
        "<img src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' '>" +
        "</li>" +

        "<li data-nav-id='../advanced/' title=Help class='sidelist dropdown_romove_dot'>" +



        "<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
        "<li  data-nav-id='../advanced/' title='Product Activation' class='sidelist'>" +
        "<a href='/sharepoint-employee-onboarding/modern/admin/help/#product-activation'>Product Activation</a>" +
        "</li>" )
})
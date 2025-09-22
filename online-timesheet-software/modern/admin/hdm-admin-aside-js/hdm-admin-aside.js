$(document).ready(function () {
    $("#hdm-admin-aside").html("");
    $("#hdm-admin-aside").append(
        "<li data-nav-id='./installation/requirments/' title=Introduction class='sidelist'>"+
        "<a href='/online-timesheet-software/modern/admin/introduction/'>Introduction</a>"+
        "</li>"+

        "<li data-nav-id='./installation/requirments/' title='Architecture Diagram' class='sidelist'>"+
        "<a href='/online-timesheet-software/modern/admin/architecture-diagram/'>Architecture Diagram</a>"+
        "</li>"+
        "<li data-nav-id='./installation/requirments/' title='Home Page' class='sidelist'>"+
        "<a href='/online-timesheet-software/modern/admin/home-page/'>Home Page</a>"+
        "</li>"+
        "<li data-nav-id='./Settings/' title=Reports class='sidelist'>"+
        "<a href='/online-timesheet-software/modern/admin/reports/'>Reports</a>"+
        "</li>"+

        "<li data-nav-id='./Settings/' title=Dashboard class='sidelist'>"+
        "<a href='/online-timesheet-software/modern/admin/dashboard/'>Dashboard</a>"+
        "</li>"+
      
        "<li data-nav-id='./Adminstration' title=Introduction class='sidelist'>"+
        "<a href='/online-timesheet-software/modern/admin/administration/'>Administration</a>"+
        "</li>"+


        "<li class='dropdownicon sidelist'>"+
        "<a class='qwe' href='/online-timesheet-software/modern/admin/settings/'>Settings</a>"+
        "<img class='helpdesk-img aside_dropdown_icon_setting' src='/online-timesheet-software/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg'>"+
        "</li>"+

       "<li data-nav-id='./Settings/' title='Settings'  class='sidelist dropdown_romove_dot'>"+
        "<ul class='sidenavSub-topics aside_dropdown_list_setting'>"+
        "<li class='sidelist'>"+
        "<a class='qwe' href='/online-timesheet-software/modern/admin/settings/role/'>Users</a>"+
        
        "</li>"+
        
        "<li data-nav-id='../user' title=Features class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/online-timesheet-software/modern/admin/settings/features/'>Features</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</a>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='../General' title='Organization' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/features/#Organization'>Organization</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Custom Fields' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/features/#custom-fields'>Custom Fields</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Projects Off Days' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/features/#projects-off-days'>Projects Off Days</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Departments' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/features/#departments'>Departments</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Timesheet Fields' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/features/#timesheet-fields'>Timesheet Fields</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Timesheet Customization' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/features/#timesheet-customization'>Timesheet Customization</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Invoice Module' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/features/#daily-weekly-hours'>Invoice Module</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Restrict Daily and Weekly Hours' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/features/#Restrict-Daily'>Restrict Daily and Weekly Hours</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Restrict Daily and Weekly Hours Based on Rules' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/features/#Restrict-Daily-and-Weekly-Hours-Based'>Restrict Daily and Weekly Hours Based on Rules</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Rules' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/features/#Rules'>Rules</a>" +
        "</li>" +
       
        "</ul>" +
        "<li data-nav-id='../user' title=General class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/online-timesheet-software/modern/admin/settings/general/'>General</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</a>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='../General' title='Organization' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/general/#theme'>Theme</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Date Format' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/general/#date-format'>Date Format</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Start Day of The Week' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/general/#start-day-of-the-week'>Start Day of The Week</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Default Currency' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/general/#defaul-tcurrency'>Default Currency</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Language' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/general/#language'>Language</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Hide Sharepoint Page's Default Components' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/general/#hide-webpart-title'>Hide Sharepoint Page's Default Components</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Enable logs collection' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/general/#Enable_Logs'>Enable logs collection</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Restrict Logs Types' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/general/#Logs_Type'>Restrict Logs Types</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Follow ISO Week Number Format' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/general/#ISOweek'>Follow ISO Week Number Format</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Brand Logo' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/general/#brand-logo'>Brand Logo</a>" +
        "</li>" +
       

        
        "</ul>" +
     
        "<li data-nav-id='../user' title=General class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/online-timesheet-software/modern/admin/settings/email-template/'>Email Template</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</a>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='User' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='../General' title='User' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/email-template/#User'>User</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Manager' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/email-template/#Manager'>Manager</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='System' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/email-template/#System'>System</a>" +
        "</li>" +
        "</li>"+
        "</ul>" +


        "<li data-nav-id='../user' title=General class='dropdownicon sidelist'>" +
        "<a class='qwe'  href='/online-timesheet-software/modern/admin/settings/notification/''>Notification</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</a>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='../General' title='Send End of the Week Notification' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/notification/#SendEndoftheWeekNotification'>Send End of the Week Notification</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Select Day to Send End of the Week Notification' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/notification/#SelectDaytoSendEndoftheWeekNotification'>Select Day to Send End of the Week Notification</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Following Day as another Notification' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/notification/#following-day-another-notification'>Following Day as another Notification</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Send Invoice Mail to client' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/notification/#send-Invoice-mail-to-client'>Send Invoice Mail to client</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Timesheet Submission and Approval Notifications' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/notification/#timesheet-submission-and-approval-notifications'>Timesheet Submission and Approval Notifications</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Auto Approve Notifications' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/notification/#auto-approve-notifications'>Auto Approve Notifications</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Tasks Assign Notification' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/notification/#tasks-assign-notification'>Tasks Assign Notification</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Enable Daily Timesheet Report Notificationn' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/notification/#enable-daily-timesheet-report-notification'>Enable Daily Timesheet Report Notification</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Pending Timesheet approval notification to approver' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/notification/#pending-timesheet-approval-notification-to-approver'>Pending Timesheet approval notification to approver</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Send Pending Timesheet Approval Notification' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/notification/#Send-Pending-Timesheet-Approval-Notification'>Send Pending Timesheet Approval Notification</a>" +
        "</li>" +

         "<li data-nav-id='../General' title='Shared Mailbox ID' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/notification/#shared-mailbox-id'>Shared Mailbox ID</a>" +
        "</li>" +

         "<li data-nav-id='../General' title='Local Shared Mailbox ID' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/notification/#local-shared-mailbox-id'>Local Shared Mailbox ID</a>" +
        "</li>" +
        "</li>"+
        "</ul>" +


        "<li data-nav-id='../user' title=Integration class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/online-timesheet-software/modern/admin/settings/integration/'>Integration</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</a>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='Configure SharePoint API Permission' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='../General' title='Configure SharePoint API Permission' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/integration/#Configure-SharePoint-API'>Configure SharePoint API Permission</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Integrate with Time-Off Manager' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/settings/integration/#Integrate-with-Time-Off-Manager'>Integrate with Time-Off Manager</a>" +
        "</li>" +
        "</li>"+
        "</ul>" +
        // "<li>"+
        // "<a class='qwe' href='/online-timesheet-software/modern/admin/settings/general-setting/'>Advance Setting</a>"+
        
        // "</li>"+



               
       
        " </li>"+
        "</ul>"+
        "</li>"+

        
       

       
       
    
        
        
        "</li>"+
        "</ul>"+
        "</ul>"+
        "</li>"+
        "</ul>"+
       
        "<li class='dropdownicon sidelist' title='Help'>" +
        "<a href='/online-timesheet-software/modern/admin/help/'>" +
        "Help" +
        "</a>" +
        "<img src='/online-timesheet-software/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg' class='aside_dropdown_icon' '>" +
        "</li>" +

        "<li data-nav-id='../advanced/' title=Help class='sidelist dropdown_romove_dot'>" +



        "<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
        "<li  data-nav-id='../advanced/' title='Configure SharePoint API permissions' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/help/#feedback'> Feedback</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Configure SharePoint API permissions' class='sidelist'>" +
        "<a href='/online-timesheet-software/modern/admin/help/#product-activation'>Product Activation</a>" +
        "</li>"  )
})

$(document).ready(function () {
    $("#tmpmodernadmin").html("");

    $("#tmpmodernadmin").append("<ul>" +
        "<li data-nav-id='../Introduction' title=Introduction class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/introduction/'>" +
        "Introduction" +
        "</a>" +
        "</li>" +

        "<li data-nav-id='../Home-page' title=Home-page class=sidelist>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/home-page/'>" +
        "Home Page" +
        "</a>" +
        "</li>" +
        "<li data-nav-id='../ArchitectureDiagram' title=ArchitectureDiagram class=sidelist>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/ArchitectureDiagram/'>" +
        "Architecture Diagram" +
        "</a>" +
        "</li>" +
        "<li data-nav-id='../ HR-actions' title= HR-actions class=sidelist>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/hr-actions/'>" +
        "HR actions" +
        "</a>" +
        "</li>" +

        "<li data-nav-id='../holidays' title=holidays class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/holidays/'>" +
        "Public Holidays" +
        "</a>" +
        "</li>" +

        "<li data-nav-id='../user' title=user class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/user/'>" +
        "Users" +
        "</a>" +
        "</li>" +

        "<li data-nav-id='../user' title=user class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/reports/'>" +
        "Reports" +
        "</a>" +
        "</li>" +


        "<li class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/'>" +
        "System Settings" +
        "</a>" +
        "<img src='./down-arrow-svgrepo-com.svg'  class='helpdesk-img aside_dropdown_icon_setting'>" +
        "</li>" +


        "<li data-nav-id='../system-settings' title=system-settings class='sidelist dropdown_romove_dot'>" +
        // "<div class='dropdownicon'>"+   
        //     "<a class='qwe' href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/'>"+
        //     "System Settings"+
        //     "</a>"+
        //     "<img src='./down-arrow-svgrepo-com.svg'  class='imageIconmodernuser aside_dropdown_icon'>"+
        //     "</div>"+
        "<ul class='sidenavSub-topics aside_dropdown_list_setting'>" +
        "<li data-nav-id='../user' title=General class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/general-setting/'> General </a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</a>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='../General' title='Theme' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/general-setting/#themes'>Theme</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Annual leave dates' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/general-setting/#Annualleave'> Annual leave dates </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Date format' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/general-setting/#Dateformat'> Date format </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Define Work Week' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/general-setting/#DefineWorkWeek'> Define Work Week </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Color code in calendar by' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/general-setting/#ColorCode'> Color code in calendar by </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Time off on calendar' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/general-setting/#Timeoffcalendar '> Time off on calendar </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Display organization calendar' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/general-setting/#DisplayOrganization'> Display organization calendar </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Allow all microsoft 365 users' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/general-setting/#microsoftUsers'> Allow all microsoft 365 users </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Show Sample data in Dashboard' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/general-setting/#SampleDataDashboard'>Show Sample data in Dashboard</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Show Favorite icon' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/general-setting/#ShowFavoriteicon'> Show Favorite icon </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Leaves reordering' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/general-setting/#LeavesReordering'> Leaves reordering </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Hide SharePoint page's' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/general-setting/#HideSharePoint'> Hide SharePoint page's </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Display Title' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/general-setting/#Display-Title'> Display Title </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Language' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/general-setting/#Language'> Language </a>" +
        "</li>" +       
        "<li data-nav-id='../General' title='Log settings' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/general-setting/#LogSettings'>Log settings</a>" +
        "</li>" +   
         "<li data-nav-id='../General' title='Make Notes Required' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/general-setting/#_notesrequired'>Make Notes Required</a>" +
        "</li>" +  
         "<li data-nav-id='../General' title='Brand Logo' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/general-setting/#Brand-logo'>Brand Logo</a>" +
        "</li>" +       
        "</ul>" +
        "</li>"+

        "<li data-nav-id='../user' title=Advance Settings class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/advance-setting/'>  Advance Settings</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</a>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='../General' title='Organization' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/advance-setting/#Organization'>Organization</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Leave accrual' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/advance-setting/#Leaveaccrual'> Leave accrual </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='HR approvers' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/advance-setting/#HRapprovers'> HR approvers</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Additional approvers' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/advance-setting/#AdditionalApprovers'> Additional approvers </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Auto Approvals' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/advance-setting/#AutoApprovals'> Auto Approvals </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Second level approval for leave cancellation' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/advance-setting/#Secondlevelapproval '> Second level approval for leave cancellation </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Select the leave type to carry forward' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/advance-setting/#Carryforward'> Select the leave type to carry forward </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Add Comp off (off in lieu) policy (in days)' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/advance-setting/#AddCompoff'> Add Comp off (off in lieu) policy (in days) </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Avail Comp off (off in lieu) policy (in days)' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/advance-setting/#AvailCompoff'>Avail Comp off (off in lieu) policy (in days)</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Enable external users' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/advance-setting/#EnableExternalUsers'> Enable external users </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Show Time off requests in Microsoft outlook calender' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/advance-setting/#MicrosoftoutlookCalender'> Show Time off requests in Microsoft outlook calender </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Enable recurrence of leaves ' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/advance-setting/#EnableRecurrenceOfleaves'> Enable recurrence of leaves  </a>" +
        "</li>" +     
         "<li data-nav-id='../General' title='Enable Team Approval ' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/advance-setting/#teamapproval'>Enable Team Approvals  </a>" +
        "</li>" +     
        "</ul>" +


        "<li data-nav-id='../user' title=Notifications class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/notification/'>Notifications</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</a>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='../General' title='Email Template' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/notification/#EmailTemplate'>Email Template</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Reminder notifications to approvers' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/notification/#Remindernotificationstoapprovers'> Reminder notifications to approvers </a>" +
        "</li>" +
         "<li data-nav-id='../General' title=' Shared Mailbox' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/notification/#SharedMailbox'> Shared Mailbox ID</a>" +
        "</li>" +
       
        "</ul>" +
        "<li data-nav-id='../user' title=Leave Settings class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/leave-setting/'>Leave Settings</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</a>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='../General' title='Calculate leaves include weekends/holidays' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/#Calculateweekends/leave-setting/holidays'>Calculate leaves include weekends/holidays</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Calculate partial leave' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/leave-setting/#Calculatepartialleave'> Calculate partial leave </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Calculate leaves based on' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/leave-setting/#Calculateleaves'> Calculate leaves based on </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Allow backdate leaves' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/leave-setting/#Allowbackdateleaves'> Allow backdate leaves </a>" +
        "</li>" +
         "<li data-nav-id='../General' title='Enable Leave Eligibility Delay' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/leave-setting/#leaveeligibilitydelay'> Enable Leave Eligibility Delay </a>" +
        "</li>" +
        
        "<li data-nav-id='../General' title='LeavesBasedOn' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/leave-setting/#LeavesBasedOn'> Leaves Based On </a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Tenure Based Leaves' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/leave-setting/#TenureBasedLeaves'>Tenure Based Leaves</a>" +
        "</li>" +
       
        "</ul>" +

        "<li data-nav-id='../user' title=Reports class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/report/'>Reports</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</a>" +
        "</li>" +
        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='../General' title='Work report' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/report/#Workreport'>Work report</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='Includetime-offtypes' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/settings/report/#Includetime-offtypes'> Include time-off types </a>" +
        "</li>" +
       
        "</ul>" +
        "</ul>" +
        "</li >" +

        "<li class='dropdownicon sidelist' title='Help'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/help/'>" +
        "Help" +
        "</a>" +
        "<img src='./down-arrow-svgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' '>" +
        "</li>" +

        "<li data-nav-id='../advanced/' title=Help class='sidelist dropdown_romove_dot'>" +



        "<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
        "<li  data-nav-id='../advanced/' title='Configure SharePoint API permissions' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/help/#feedback'>Feedback</a>" +
        "</li>" +
        "<li  data-nav-id='../advanced/' title='Configure SharePoint API permissions' class='sidelist'>" +
        "<a href='/employee-vacation-tracker-time-off-manager/modern/admin/help/#product-activation'>Product Activation</a>" +
        "</li>")

});


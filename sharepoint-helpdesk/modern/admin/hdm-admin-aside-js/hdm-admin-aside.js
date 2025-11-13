$(document).ready(function () {
    $("#hdm-admin-aside").html("");
    $("#hdm-admin-aside").append(
        "<li data-nav-id='./installation/requirments/' title=Introduction class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/introduction/'>Introduction</a>" +
        "</li>" +

        "<li data-nav-id='./installation/requirments/' title='Architecture Diagram' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/architecture-diagram/'>Architecture Diagram</a>" +
        "</li>" +
        "<li data-nav-id='./installation/requirments/' title='Home Page' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/home-page/'>Home Page</a>" +
        "</li>" +


        "<li data-nav-id='./Settings/' title=Dashboard class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/dashboard/'>Dashboard</a>" +
        "</li>" +
        "<li data-nav-id='./Settings/' title=Incident class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/incident/'>Incident</a>" +
        "</li>" +
        "<li data-nav-id='./Settings/' title=Reports class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/reports/'>Reports</a>" +
        "</li>" +
        "<li data-nav-id='./Settings/' title=delegation class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/delegation/'>Delegation</a>" +
        "</li>" +
        "<li data-nav-id='./Settings/' title=Comment Page class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/comment-page/'>Comment Page</a>" +
        "</li>" +




        "<li class='dropdownicon sidelist' title=Settings>" +
        "<a class='qwe' href='/sharepoint-helpdesk/modern/admin/settings/'>Settings</a>" +
        "<img class='helpdesk-img aside_dropdown_icon_setting' src='/sharepoint-helpdesk/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg'>" +
        "</li>" +

        "<li data-nav-id='./Settings/' title='Settings'  class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list_setting'>" +


        "<li class='dropdownicon sidelist' title=general>" +
        "<a class='qwe' href='/sharepoint-helpdesk/modern/admin/settings/general/'>General</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-helpdesk/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li data-nav-id='./General-Settings/' title=General class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='./General-Settings/' title='Date Format' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#date-format'>Date Format</a>" +
        "</li>" +
        "<li data-nav-id='./General-Settings/' title='Time Format' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#timeformat'>Time Format</a>" +
        "</li>" +
        "<li data-nav-id='./General-Settings/' title='Theme' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#theme_id'>Theme</a>" +
        "</li>" +
        "<li data-nav-id='./Ticket-Settings/' title='Show Resolved Ticket in Selected Tabs' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#display-resolved'>Show Resolved Ticket in Selected Tabs</a>" +
        "</li>" +
        "<li data-nav-id='./Integration-Settings/' title='GCC Tenant' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#GCC-Tenant'>GCC Tenant</a>" +
        "</li>" +
        "<li data-nav-id='./Ticket-Settings/' title='Show Resolve Tab in User Home' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#resolvetabs'>Show Resolve Tab in User Home</a>" +
        "</li>" +
        "<li data-nav-id='./Notification-Settings/' title='Disable CC Notifications' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#emailcss'>Disable CC Notifications</a>" +
        "</li>" +
        "<li data-nav-id='./Notification-Settings/' title='Disable Popup Alert' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#Popup-Notification'>Disable Popup Alert</a>" +
        "</li>" +
        "<li data-nav-id='./Ticket-Settings/' title='Reopen Tickets Without Adding Comment' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#reopen'>Reopen Tickets Without Adding Comment</a>" +
        "</li>" +
        "<li data-nav-id='./Ticket-Settings/' title='New Ticket Creation for Users' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#ticket-creation'>New Ticket Creation for Users</a>" +
        "</li>" +
        "<li data-nav-id='./Ticket-Settings/' title='Show Latest Comment with Ticket Title' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#latest-comment'>Show Latest Comment with Ticket Title</a>" +
        "</li>" +
        "<li data-nav-id='./Notification-Settings/' title='Disable Default Approval Email to Admins' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#default-approval'>Disable Default Approval Email to Admins</a>" +
        "</li>" +
        "<li data-nav-id='./General-Settings/' title='Display Help Page' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#DisplayHelpPage'>Display Help Page</a>" +
        "</li>" +
        "<li data-nav-id='./Language-Settings/' title='Language Translation' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#Language-Translation'>Language Translation</a>" +
        "</li>" +
        "<li data-nav-id='./Language-Settings/' title='Language Selection as Browser Default Language' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#languagebrowserdefaultlanguage'>Language Selection as Browser Default Language</a>" +
        "</li>" +
        "<li data-nav-id='./Language-Settings/' title='Language Selection in Case Browser Default Language is Not Detected' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#languageisNotdetected'>Language Selection in Case Browser Default Language is Not Detected</a>" +
        "</li>" +
        "<li data-nav-id='./Integration-Settings/' title='Use SharePoint URL for MS Teams Installed Application' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#SharepointURL'>Use SharePoint URL for MS Teams Installed Application</a>" +
        "</li>" +
        "<li data-nav-id='./Language-Settings/' title='Language' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#Language1'>Language</a>" +
        "</li>" +
        "<li data-nav-id='./General-Settings/' title='Naming Convention' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#naming-convention'>Naming Convention</a>" +
        "</li>" +
        "<li data-nav-id='./Integration-Settings/' title='Hide SharePoint Page’s Default Components' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#update-roles'>Hide SharePoint Page’s Default Components</a>" +
        "</li>" +
        "<li data-nav-id='./Integration-Settings/' title='Configure SharePoint API Permissions' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#Hide-Sharepoint-Pages-Default-Components'>Configure SharePoint API Permissions</a>" +
        "</li>" +
        "<li data-nav-id='./Ticket-Settings/' title='Recycle Bin' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#recycle-bin'>Recycle Bin</a>" +
        "</li>" +
        "<li data-nav-id='./Ticket-Settings/' title='Default Date Range of Tickets on Homepage' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#default-date-range'>Default Date Range of Tickets on Homepage</a>" +
        "</li>" +
        "<li data-nav-id='./System-Settings/' title='Enable Logs Collection' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#enable-logs'>Enable Logs Collection</a>" +
        "</li>" +
        "<li data-nav-id='./General-Settings/' title='Brand Logo' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#brand-logo'>Brand Logo</a>" +
        "</li>" +
        "<li data-nav-id='./General-Settings/' title='Favicon' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/general/#Show-favicon-of-Helpdesk-365'>Favicon</a>" +
        "</li>" +


        "</ul>" +
        "</li>" +


        "<li class='dropdownicon sidelist' title='Ticket Customization'>" +
        "<a class='qwe' href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/'>Ticket Customization</a>" +
        "<img  class='helpdesk-img aside_dropdown_icon' src='/sharepoint-helpdesk/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg'>" +
        "</li>" +

        "<li data-nav-id='../admin Guide/Administration/' title='Ticket Customization' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='./Assign-Assets/' title='Priority Type' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#priority-type'>Priority Type</a>" +
        "</li>" +
        "<li data-nav-id='./Assign-Assets/' title='Request Type' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#request-type'>Request Type</a>" +
        "</li>" +
        "<li data-nav-id='./Assign-Assets/' title=Status class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#status'>Status</a>" +
        "</li>" +
        "<li data-nav-id='./Assign-Assets/' title='Ticket Field' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#ticket-field'>Ticket Field</a>" +
        "</li>" +
        "<li data-nav-id='./modern-view-fields/' title='Modern View Fields' class='sidelist '>" +
        "<ul class='sidenavSub-topics '></ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#modern-view-fields'>Modern View Fields</a>" +
        "</li>" +
        "<li data-nav-id='./Assign-Assets/' title='Ticket Sequence' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#ticket-sequence'>Ticket Sequence</a>" +
        "</li>" +

        "<li data-nav-id='./transfer-ticket/' title='Transfer of Ticket' class='sidelist '>" +
        "<ul class='sidenavSub-topics '></ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#transfer-ticket'>Transfer of Ticket</a>" +
        "</li>" +

        "<li data-nav-id='./reopen-reply/' title='Reopen Tickets on Reply' class='sidelist '>" +
        "<ul class='sidenavSub-topics '></ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#reopen-reply'>Reopen Tickets on Reply</a>" +
        "</li>" +

        "<li data-nav-id='./hide-teams/' title='Hide Teams Option While Creating a Ticket' class='sidelist '>" +
        "<ul class='sidenavSub-topics '></ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#hide-teams'>Hide Teams Option While Creating a Ticket</a>" +
        "</li>" +

        "<li data-nav-id='./ticket-properties/' title='Ticket Properties Configuration' class='sidelist '>" +
        "<ul class='sidenavSub-topics '></ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#ticket-properties'>Ticket Properties Configuration</a>" +
        "</li>" +

        "<li data-nav-id='./hide-ticket-title/' title='Hide Ticket Title' class='sidelist '>" +
        "<ul class='sidenavSub-topics '></ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#hide-ticket-title'>Hide Ticket Title</a>" +
        "</li>" +

        "<li data-nav-id='./hide-consult/' title='Hide Consult Button' class='sidelist '>" +
        "<ul class='sidenavSub-topics '></ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#hide-consult'>Hide Consult Button</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Enable ticket closed justification' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#Enable-ticket-closed-justification'>Enable ticket closed justification</a>" +
        "</li>" +
        "<li data-nav-id='./Assign-Assets/' title=Tickets Comments page class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#Tickets-comments-page'>Tickets Comments page</a>" +
        "</li>" +

        "<li data-nav-id='./custom-filters/' title='Custom Filters' class='sidelist '>" +
        "<ul class='sidenavSub-topics '></ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#custom-filters'>Custom Filters</a>" +
        "</li>" +


        "<li data-nav-id='./Assign-Assets/' title='Custom Forms' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#custom-form'>Custom Forms</a>" +
        "</li>" +

        // "<li data-nav-id='./Add Assets/ ' title='Allow Members To Edit Ticket Properties Without Reopening The Ticket.' class='sidelist '>" +
        // "<ul class='sidenavSub-topics '>" +
        // "</ul>" +
        // "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#Ticket-Properties-Without-Reopening'>Allow Members To Edit Ticket Properties Without Reopening The Ticket.</a>" +
        // "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Merge Tickets' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#merge-tickets'>Merge Tickets</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Split Tickets' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#split-tickets'>Split Tickets</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Review Tickets' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#review-tickets'>Review Tickets</a>" +
        "</li>" +

        "<li data-nav-id='./Add Assets/ ' title='Escalate Tickets' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>"
        +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#escalate-tickets'>Escalate Tickets</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Create ticket automatically' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#create-ticket'>Create ticket automatically</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Auto close Tickets' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#auto-close'>Auto close Tickets</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Auto Assign Tickets' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#auto-assign'>Auto Assign Tickets</a>" +
        " </li><li data-nav-id='./Add Assets/ ' title='Sub Tickets' class='sidelist '>" +
        " <ul class='sidenavSub-topics '>" +
        "</ul>" +
        " <a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#sub-tickets'>Sub Tickets</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Ticket Aging reports' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/ticket-customization/#ticket-aging-reports'>Ticket Aging Reports</a>" +
        " </li>" +
        "</ul>" +
        "</li>" +


        "<li class='dropdownicon sidelist' title='Users, Roles, Permissions'>" +
        "<a class='qwe'  href='/sharepoint-helpdesk/modern/admin/settings/role/'>Users, Roles, Permissions</a>" +
        "<img  class='helpdesk-img aside_dropdown_icon' src='/sharepoint-helpdesk/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg'>" +
        "</li>" +

        "<li data-nav-id='./Add Assets/' title='Users/Roles/Permissions' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='./Assign-Assets/ ' title='Add/Edit Users' class='sidelist '>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/role/#users'>Add/Edit Users</a>" +
        "</li>" +
        // "<li data-nav-id='./Assign-Assets/' title=Add/EditEnd class='sidelist'>" +
        // "<a href='/sharepoint-helpdesk/modern/admin/settings/role/#endUsers'>Add/Edit End Users</a>" +
        // "</li>" +
        "<li data-nav-id='./Assign-Assets/ ' title='Add/Edit Teams' class='sidelist '>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/role/#teams'>Add/Edit Teams</a>" +
        "</li>" +
        "<li data-nav-id='./Assign-Assets/ ' title='Escalation Teams' class='sidelist '>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/role/#Escalation-Teams'>Escalation Teams</a>" +
        "</li>" +
        "<li data-nav-id='./Assign-Assets/ ' title='Add Lite Users' class='sidelist '>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/role/#Add-Lite-Users'>Add Lite Users</a>" +
        "</li>" +
        "<li data-nav-id='./Assign-Assets/' title=Service class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/role/#service'>Service</a>" +
        "</li>" +
        "<li data-nav-id='./Assign-Assets/' title=Sub Service class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/role/#sub-service'>Sub-Service</a>" +
        "</li>" +
        "<li data-nav-id='./Assign-Assets/ ' title='Advance Permissions' class='sidelist '>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/role/#advance'>Advance Permissions </a>" +
        "</li>" +
        "</ul>" +
        "</li>" +


        "<li class='dropdownicon sidelist' title=Integration>" +
        "<a class='qwe'  href='/sharepoint-helpdesk/modern/admin/settings/integration/'>Integrations</a>" +
        "<img  class='helpdesk-img aside_dropdown_icon' src='/sharepoint-helpdesk/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Integrations' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='./Assign-Assets/ ' title='Phone' class='sidelist '>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/integration/#phone'>Phone</a>" +
        "<li data-nav-id='./Add Assets/ ' title='Helpdesk Mailbox' class='sidelist '>" +
        "<li data-nav-id='./Assign-Assets/ ' title='Agentic Ticket' class='sidelist '>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/integration/#_agentic-tickets'>Agentic Ticket</a>" +
        "<li data-nav-id='./Add Assets/ ' title='Helpdesk Mailbox' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/integration/#helpdesk-mailbox'>Helpdesk Mailbox</a>" +
        "</li>" +
        // "<li data-nav-id='./Add Assets/ ' title='Microsoft Graph API' class='sidelist '>"+
        // "<ul class='sidenavSub-topics '>"+
        // "</ul>"+
        // "<a href='/sharepoint-helpdesk/modern/admin/settings/integration/#graph-api'>Microsoft Graph API</a>"+
        // "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Integrate with Apps365 Asset Management' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/integration/#integrateMicrosoft'>Integrate with Apps365 Asset Management</a>" +
        "<li data-nav-id='./Add Assets/ ' title='Integrate Microsoft Form with Helpdesk' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +

        "<li data-nav-id='./Add Assets/ ' title='Azure Open AI Integration' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/integration/#AI-Integration'>Azure Open AI Integration</a>" +
        "<li data-nav-id='./Add Assets/ ' title='Integrate Microsoft Form with Helpdesk' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +


        "<li data-nav-id='./Add Assets/ ' title='Copilot Integeration' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/integration/#Copilot-Integeration'>Copilot Integeration</a>" +
        "<li data-nav-id='./Add Assets/ ' title='Integrate Microsoft Form with Helpdesk' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/integration/#integrateMicrosoft'>Integrate Microsoft Form with Helpdesk</a>" +
        "</li>" +
        "<li data-nav-id='./Assign-Assets/ ' title='Integrating Mail Tracker with Helpdesk 365' class='sidelist '>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/integration/#email-tracker'>Integrating Mail Tracker with Helpdesk 365</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='DevOps Integrations' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/integration/#DevOps-Integrations'>DevOps Integrations</a>" +
        "</li>" +
        "</ul>" +
        "</li>" +


        "<li class='dropdownicon sidelist' title='Notification'>" +
        "<a class='qwe' href='/sharepoint-helpdesk/modern/admin/settings/notification/'>Notification</a>" +
        "<img  class='helpdesk-img aside_dropdown_icon' src='/sharepoint-helpdesk/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg'>" +
        "</li>" +

        "<li data-nav-id='./Add Assets/  title='Notification' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='./Assign-Assets/ ' title='Requester' class='sidelist '>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/notification/#requester'>Requester</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Assignee' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/notification/#assignee'>Assignee</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Supervisor' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/notification/#supervisor'>Supervisor</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Admin' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/notification/#admin'>Admin</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Approver' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/notification/#approver'>Approver</a>" +
        "</li>" +
        "</ul>" +
        "</li>" +


        "<li class='dropdownicon sidelist' Title=Features>" +
        "<a class='qwe' href='/sharepoint-helpdesk/modern/admin/settings/features/'>Features</a>" +
        "<img  class='helpdesk-img aside_dropdown_icon' src='/sharepoint-helpdesk/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Features' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='./Assign-Assets/ ' title='Canned Responses' class='sidelist '>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#canned-responses'>Canned Responses</a>" +

        "<li data-nav-id='./Add Assets/ ' title='Column Indexing' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#Column_Indexing'>Column Indexing</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Customer Satisfaction' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#customer-satisfaction'>Customer Satisfaction </a>" +
        "</li>" +

        "<li data-nav-id='./Add Assets/ ' title='Custom Columns'class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#custom-column'>Custom Columns</a>" +
        "</li>" +


        "<li data-nav-id='./Add Assets/ ' title='Analytics Report'class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#analytics-report'>Analytics Report</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Business Hours' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +

        

        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#business-hours'>Business Hours</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Column Setting' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#column-setting'>Column Setting</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Define SLA Polices' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#sla-policies'>Define SLA Polices</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Apply SLA Polices' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#apply-sla-policies'>Apply SLA Polices</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Approver Workflow' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#Approver-Workflow'>Approver Workflow</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Rules & Automation' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#Rules-Automation'>Rules & Automation</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Incident Module' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#Incident-Module'>Incident Module</a>" +
        "</li>" +
        // "<li data-nav-id='./Add Assets/ ' title='Dashboard Settings' class='sidelist '>" +
        // "<ul class='sidenavSub-topics '>" +
        // "</ul>" +
        // "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#dashboard-settings'>Dashboard Settings</a>" +
        // "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Chatbot Bubble 365 setting' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +


        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#Chatbot-Bubble-365-setting'>Chatbot Bubble 365 setting</a>" +
        "</li>" +

        "<li data-nav-id='./Add Assets/ ' title='Multiple Mailbox Configuration' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#Configure-different-mailboxes-for-different-team'>Multiple Mailbox Configuration</a>" +
        "</li>" +

        "<li data-nav-id='./Add Assets/ ' title='Service Entitlement' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#Service-Entitlement'>Service Entitlement</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Enable MS Teams live chat integration' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#EnableMSTeamslivechatintegeration'>Enable MS Teams live chat integration</a>" +
        "</li>" +

        "<li data-nav-id='./Add Assets/ ' title='Enable Archival of ticket' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#Enable-Archival-of-ticket'>Enable Archival of ticket</a>" +
        "</li>" +


        "<li data-nav-id='./Add Assets/ ' title='Archive Tickets after days' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#ArchiveTicketsafte'>Archive Tickets after days</a>" +
        "</li>" +

        "<li data-nav-id='./Add Assets/ ' title='Retain data in Helpdesk 365 till days' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#RetaindatainHelpdesk365till'>Retain data in Helpdesk 365 till days</a>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Time Tracking' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#time-tracking'>Time Tracking</a>" +
        "</li>" +
        "</li>" +

        "<li data-nav-id='./Add Assets/ ' title='Enable comments in the ticket reply thread' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#Enablecommentsintheticketreplthread'>Enable comments in the ticket reply thread</a>" +
        "</li>" +
        "</li>" +




        "<li data-nav-id='./Add Assets/ ' title='Knowledgebase' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +
        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#Knowledgebase'>Knowledgebase</a>" +
        "</li>" +

        "<li data-nav-id='./Add Assets/ ' title='HD365 Migration' class='sidelist '>" +
        "<ul class='sidenavSub-topics '>" +
        "</ul>" +

        "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#HD365Migration'>HD365 Migration</a>" +
        "</li>" +


        // "<li data-nav-id='./Add Assets/ ' title='Time Tracking' class='sidelist '>" +
        // "<ul class='sidenavSub-topics '>" +
        // "</ul>" +


        // "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#Show-sample-data-in-dashboard'>Show sample data in dashboard</a>" +
        // "</li>" +


        // "<li data-nav-id='./Add Assets/ ' title='Time Tracking' class='sidelist '>" +
        // "<ul class='sidenavSub-topics '>" +
        // "</ul>" +
        // "<a href='/sharepoint-helpdesk/modern/admin/settings/features/#show'>Show favicon of Helpdesk365</a>" +
        // "</li>" +
        "</li>" +

        "</ul>" +
        "</ul>" +
        "</li>" +
        "</ul>" +
        "<li data-nav-id='./Settings/ ' title=knowledgebase class='sidelist '>" +
        "<a href='/sharepoint-helpdesk/modern/admin/knowledgebase/'>Knowledgebase</a>" +
        "</li>" +



        "<li class='dropdownicon sidelist' title='Help'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/help/'>" +
        "Help" +
        "</a>" +
        "<img src='/sharepoint-helpdesk/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' '>" +
        "</li>" +

        "<li data-nav-id='../advanced/' title=Help class='sidelist dropdown_romove_dot'>" +



        "<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
        "<li  data-nav-id='../advanced/' title='Product Activation' class='sidelist'>" +
        "<a href='/sharepoint-helpdesk/modern/admin/help/#product-activation'>Product Activation</a>" +
        "</li>")
})

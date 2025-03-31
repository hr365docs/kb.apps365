$(document).ready(function () {
    $("#hdp-admin-aside").html("");
    $("#hdp-admin-aside").append(
        "<li data-nav-id='./installation/requirments/' title=Introduction class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/introduction/'>Introduction</a>"+
        "</li>"+

        "<li data-nav-id='./installation/requirments/' title='Architecture Diagram' class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/architecture-diagram/'>Architecture Diagram</a>"+
        "</li>"+


       

        "<li class='dropdownicon sidelist' title='Home Page'>"+
        "<a class='qwe' href='/sharepoint-helpdesk/classic/admin/home-page/'>Home Page</a>"+
        "<img  class='helpdesk-img aside_dropdown_icon' src='/sharepoint-helpdesk/classic/admin/hdp-admin-aside-js/down-arrow-svgrepo-com.svg'>"+
        "</li>"+

        "<li data-nav-id='./Settings/'   class='sidelist dropdown_romove_dot'>"+
        "<ul class='sidenavSub-topics aside_dropdown_list'>"+
        "<li data-nav-id='./Settings/' title='Kanban' class='sidelist'>"+
        " <a href='/sharepoint-helpdesk/classic/admin/home-page/#kanban-view'>Kanban</a>"+
        " </li>"+
        "<li data-nav-id='./Settings/' title=Table class='sidelist'>"+
        " <a href='/sharepoint-helpdesk/classic/admin/home-page/#table-view'>Table</a>"+
        " </li>"+
        "</ul>"+


        "</li>"+

        "<li data-nav-id='./Settings/' title=Dashboard class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/dashboard/'>Dashboard</a>"+
        "</li>"+
        "<li data-nav-id='./Settings/' title=Reports class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/reports/'>Reports</a>"+
        "</li>"+
        "<li data-nav-id='./Settings/' title=Comment Page class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/comment-page/'>Comment Page</a>"+
        "</li>"+

        

        
        "<li class='dropdownicon sidelist' title='Settings'>"+
        "<a class='qwe' href='/sharepoint-helpdesk/classic/admin/settings/'>Settings</a>"+
        "<img class='helpdesk-img aside_dropdown_icon_setting' src='/sharepoint-helpdesk/classic/admin/hdp-admin-aside-js/down-arrow-svgrepo-com.svg'>"+
        "</li>"+

       "<li data-nav-id='./Settings/'   class='sidelist dropdown_romove_dot'>"+
        "<ul class='sidenavSub-topics aside_dropdown_list_setting'>"+

        "<li class='dropdownicon sidelist' title=General>"+
        "<a class='qwe' href='/sharepoint-helpdesk/classic/admin/settings/general/'>General</a>"+
        "<img  class='helpdesk-img aside_dropdown_icon' src='/sharepoint-helpdesk/classic/admin/hdp-admin-aside-js/down-arrow-svgrepo-com.svg'>"+
        "</li>"+
        "<li data-nav-id='./User/'    class='sidelist dropdown_romove_dot'>"+
        "<ul class='sidenavSub-topics aside_dropdown_list'>"+

        "<li data-nav-id='./General-Settings/' title='Date Format' class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/general/#date-format'>Date Format</a>"+
        "</li>"+
        "<li data-nav-id='./Email-Notification/' title=Theme class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/general/#theme'>Theme</a>"+
        "<li data-nav-id='./Email-Notification/' title='Teams Option' class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/general/#teams-option'>Teams Option on New Ticket Form</a>"+
                                                                    "</li>"+
                                                                    "<li data-nav-id='./Email-Notification/' title='Home Page Table Sorting' class='sidelist'>"+
                                                                    "<a href='/sharepoint-helpdesk/classic/admin/settings/general/#home-page-table-sorting'>Home Page Table Sorting</a>"+
                                                                                                                                "</li>"+
        "</li><li data-nav-id='./Column-Setting/' title='Display Resolved Tab On Homepage' class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/general/#display-resolved'>Display Resolved Tab on Home Page</a>"+
        "</li>"+
        "<li data-nav-id='./Dashboard-Settings/' title='Display Help Page' Help Page class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/general/#display-help'> Display Help Page</a>"+
        "</li>"+
        "<li data-nav-id='./Dashboard-Settings/' title='Allow All to Comment on Tickets' Help Page class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/general/#allow-comment-ticket'>Allow All to Comment on Tickets</a>"+
        "</li>"+
        "<li data-nav-id='./Dashboard-Settings/' title='SharePoint Site Collection Home Link' Help Page class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/general/#sharepoint-site-link'>SharePoint Site Collection Home Link</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Open Tickets in New Tab' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/general/#open-tickets'>Open Tickets in New Tab</a>"+
        "</li>"+
        "<li data-nav-id='./Custom-Emails/' title=Naming Convention class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/general/#naming-convention'>Naming Convention</a>"+
        "</li>"+
        "<li data-nav-id='./Assign-Assets/' title='Recycle Bin' class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/general/#recycle-bin'>Recycle Bin</a>"+
        "</li>"+
        "<li data-nav-id='./Dashboard-Settings/' title=Brand Logo class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/general/#brand-logo'>Brand Logo</a>"+
        "</li>"+
        "<li data-nav-id='./Dashboard-Settings/' title=Language class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/general/#language'>Language</a>"+
        "</li>"+
        "</li>"+
        "</li>"+
        "</ul>"+

       
        "<li class='dropdownicon sidelist' title='Ticket Customization' >"+
        "<a class='qwe' href='/sharepoint-helpdesk/classic/admin/settings/ticket-customization/'>Ticket Customization</a>"+
        "<img  class='helpdesk-img aside_dropdown_icon' src='/sharepoint-helpdesk/classic/admin/hdp-admin-aside-js/down-arrow-svgrepo-com.svg'>"+
        "</li>"+

        "<li data-nav-id='../Admin-Guide/Administration/' class='sidelist dropdown_romove_dot'>"+
        "<ul class='sidenavSub-topics aside_dropdown_list'>"+
        "<li data-nav-id='./Assign-Assets/' title='Priority Type' class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/ticket-customization/#priority-type'>Priority Type</a>"+
        "</li>"+
        "<li data-nav-id='./Assign-Assets/' title=Request Type class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/ticket-customization/#request-type'>Request Type</a>"+
        "</li>"+
        "<li data-nav-id='./Assign-Assets/' title=Status class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/ticket-customization/#status'>Status</a>"+
        "</li>"+
        "<li data-nav-id='./Assign-Assets/' title=Ticket Field class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/ticket-customization/#ticket-field'>Ticket Field</a>"+
        "</li>"+
        "<li data-nav-id='./Assign-Assets/' title=Ticket-Sequence class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/ticket-customization/#ticket-sequence'>Ticket Sequence</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Merge Tickets' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/ticket-customization/#merge-tickets'>Merge Tickets</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Split Tickets' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/ticket-customization/#split-tickets'>Split Tickets</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Review Tickets' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/ticket-customization/#review-tickets'>Review Tickets</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Escalate Tickets' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"
       +
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/ticket-customization/#escalate-tickets'>Escalate Tickets</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Create ticket automatically' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/ticket-customization/#create-ticket'>Create ticket automatically</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Auto close Tickets' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/ticket-customization/#auto-close'>Auto close Tickets</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Auto Assign Tickets' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/ticket-customization/#auto-assign'>Auto Assign Tickets</a>"+
        " </li><li data-nav-id='./Add Assets/ ' title='Sub Tickets' class='sidelist '>"+
        " <ul class='sidenavSub-topics '>"+
        "</ul>"+
        " <a href='/sharepoint-helpdesk/classic/admin/settings/ticket-customization/#sub-tickets'>Sub Tickets</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Ticket Aging reports' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/ticket-customization/#ticket-aging-reports'>Ticket Aging Reports</a>"+
        " </li>"+
        "<li data-nav-id='./Add Assets/ ' title='Auto close Tickets' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/ticket-customization/#reopen-tickets-on-reply'>Reopen Tickets on Reply</a>"+
        "</li>"+
        "</ul>"+
        "</li>"+

        
        "<li class='helpdesk-dropdown sidelist' title='Users,Roles,Permissions'>"+
        "<a class='qwe' href='/sharepoint-helpdesk/classic/admin/settings/role/'>Users, Roles, Permissions</a>"+
        "<img  class='helpdesk-img aside_dropdown_icon' src='/sharepoint-helpdesk/classic/admin/hdp-admin-aside-js/down-arrow-svgrepo-com.svg'>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/'  class='sidelist dropdown_romove_dot'>"+
        "<ul class='sidenavSub-topics aside_dropdown_list'>"+
        "<li data-nav-id='./Assign-Assets/ ' title=Add/Edit class='sidelist '>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/role/#users'>Add/Edit Users</a>"+
        "<li data-nav-id='./Assign-Assets/ ' title='Teams' class='sidelist '>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/role/#endUsers'>Add/Edit End Users</a>"+
        "</li>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/role/#teams'>Add/Edit Teams</a>"+
        "</li>"+
        "<li data-nav-id='./Assign-Assets/' title=Service class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/role/#service'>Service</a>"+
        "</li>"+
        "<li data-nav-id='./Assign-Assets/' title=Sub Service class='sidelist'>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/role/#sub-service'>Sub-Service</a>"+
        "</li>"+
        "<li data-nav-id='./Assign-Assets/ ' title='Advance Permissions' class='sidelist '>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/role/#advance'>Advance Permissions </a>"+
        "</li>"+
        "</ul>"+
        "</li>"+

       
        "<li class='dropdownicon sidelist' title='Integrations'>"+
        "<a class='qwe'  href='/sharepoint-helpdesk/classic/admin/settings/integration/'>Integrations</a>"+
        "<img  class='helpdesk-img aside_dropdown_icon' src='/sharepoint-helpdesk/classic/admin/hdp-admin-aside-js/down-arrow-svgrepo-com.svg'>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ '  class='sidelist dropdown_romove_dot'>"+
        "<ul class='sidenavSub-topics aside_dropdown_list'>"+
        "<li data-nav-id='./Assign-Assets/ ' title='Phone' class='sidelist '>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/integration/#phone'>Phone</a>"+
        "<li data-nav-id='./Add Assets/ ' title='Helpdesk Mailbox' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/integration/#helpdesk-mailbox'>Helpdesk Mailbox</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Microsoft Graph API' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/integration/#graph-api'>Microsoft Graph API</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Integrate with HR365 Asset Management' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/integration/#integrate'>Integrate with HR365 Asset Management</a>"+
        "<li data-nav-id='./Add Assets/ ' title='Integrate Microsoft Form with Helpdesk' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/integration/#integrateMicrosoft'>Integrate Microsoft Form with Helpdesk</a>"+
        "</li>"+
        "</ul>"+
        "</li>"+

       
        "<li class='dropdownicon sidelist' title='Notification'>"+
        "<a class='qwe' href='/sharepoint-helpdesk/classic/admin/settings/notification/'>Notification</a>"+
        "<img  class='helpdesk-img aside_dropdown_icon' src='/sharepoint-helpdesk/classic/admin/hdp-admin-aside-js/down-arrow-svgrepo-com.svg'>"+
        "</li>"+

        "<li data-nav-id='./Add Assets/   class='sidelist dropdown_romove_dot'>"+
        "<ul class='sidenavSub-topics aside_dropdown_list'>"+
        "<li data-nav-id='./Assign-Assets/ ' title='Requester' class='sidelist '>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/notification/#requester'>Requester</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Assignee' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/notification/#assignee'>Assignee</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Supervisor' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/notification/#supervisor'>Supervisor</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Admin' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/notification/#admin'>Admin</a>"+
        "</li>"+
        "</ul>"+
        "</li>"+
        
        
        "<li class='dropdownicon sidelist' title='Features'>"+
        "<a class='qwe' href='/sharepoint-helpdesk/classic/admin/settings/features/'>Features</a>"+
        "<img  class='helpdesk-img aside_dropdown_icon' src='/sharepoint-helpdesk/classic/admin/hdp-admin-aside-js/down-arrow-svgrepo-com.svg'>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ '  class='sidelist dropdown_romove_dot'>"+
        "<ul class='sidenavSub-topics aside_dropdown_list'>"+
        "<li data-nav-id='./Assign-Assets/ ' title='Canned Responses' class='sidelist '>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/features/#canned-responses'>Canned Responses</a>"+
        "<li data-nav-id='./Add Assets/ ' title='Customer Satisfaction' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/features/#customer-satisfaction'>Customer Satisfaction </a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='CustomvColumns'class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/features/#custom-column'>Custom Columns</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Business Hours' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/features/#business-hours'>Business Hours</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Column Setting' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/features/#column-setting'>Column Setting</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Define SLA Polices' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/features/#sla-policies'>Define SLA Polices</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Apply SLA Polices' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/features/#apply-sla-policies'>Apply SLA Polices</a>"+
        "</li>"+
        "<li data-nav-id='./Add Assets/ ' title='Time Tracking' class='sidelist '>"+
        "<ul class='sidenavSub-topics '>"+
        "</ul>"+
        "<a href='/sharepoint-helpdesk/classic/admin/settings/features/#time-tracking'>Time Tracking</a>"+
        "</li>"+
        "</ul>"+
        "</ul>"+
        "</li>"+
        "</ul>"+
        "<li data-nav-id='./Settings/ ' title=Help class='sidelist '>"+
        "<a href='/sharepoint-helpdesk/classic/admin/help/'>Help</a>"+
        "</li>")
})

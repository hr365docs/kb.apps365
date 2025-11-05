$(document).ready(function () {
    $("#hdm-admin-aside").html("");
    $("#hdm-admin-aside").append(
        "<li data-nav-id='./installation/requirments/' title=Introduction class='sidelist'>"+
        "<a href='/Civic365/modern/admin/introduction/'>Introduction</a>"+
        "</li>"+

        "<li data-nav-id='./installation/requirments/' title='Architecture Diagram' class='sidelist'>"+
        "<a href='/Civic365/modern/admin/architecture-diagram/'>Architecture Diagram</a>"+
        "</li>"+
        "<li data-nav-id='./installation/requirments/' title='Home Page' class='sidelist'>"+
        "<a href='/Civic365/modern/admin/home-page/'>Home Page</a>"+
        "</li>"+
        // "<li class='dropdownicon sidelist'>"+
        // "<a class='qwe' href='/Civic365/modern/admin/home-page/'>Home Page</a>"+
        // "<img  class='helpdesk-img aside_dropdown_icon' src='/Civic365/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg'>"+
        // "</li>"+

        // "<li data-nav-id='./Settings/' title='Home Page'  class='sidelist dropdown_romove_dot'>"+
        // "<ul class='sidenavSub-topics aside_dropdown_list'>"+
        // "<li data-nav-id='./Settings/' title='Kanban' class='sidelist'>"+
        // " <a href='/Civic365/modern/admin/home-page/#kanban-view'>Kanban</a>"+
        // " </li>"+
        // "<li data-nav-id='./Settings/' title=Table class='sidelist'>"+
        // " <a href='/Civic365/modern/admin/home-page/#table-view'>Table</a>"+
        // " </li>"+
        // "</ul>"+

        // "</li>"+

        "<li data-nav-id='./Settings/' title=Dashboard class='sidelist'>"+
        "<a href='/Civic365/modern/admin/dashboard/'>Dashboard</a>"+
        "</li>"+
        "<li data-nav-id='./Settings/' title=Incident class='sidelist'>"+
        "<a href='/Civic365/modern/admin/incident/'>Incident</a>"+
        "</li>"+
        "<li data-nav-id='./Settings/' title=Reports class='sidelist'>"+
        "<a href='/Civic365/modern/admin/reports/'>Reports</a>"+
        "</li>"+
        "<li data-nav-id='./Settings/' title='Comment Page' class='sidelist'>"+
        "<a href='/Civic365/modern/admin/comment-page/'>Comment Page</a>"+
        "</li>"+

        

        
      
"<li class='dropdownicon sidelist' title=settigs>" +
    "<a class='qwe' href='/Civic365/modern/admin/settings/'>Settings</a>" +
    "<img class='helpdesk-img aside_dropdown_icon_setting' src='/Civic365/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg'>" +
"</li>" +

"<li data-nav-id='./Settings/' title='Settings' class='sidelist dropdown_romove_dot'>" +
    "<ul class='sidenavSub-topics aside_dropdown_list_setting'>" +

        "<li class='dropdownicon sidelist' title='General'>" +
            "<a class='qwe' href='/Civic365/modern/admin/settings/general/'>General</a>" +
            "<img class='helpdesk-img aside_dropdown_icon' src='/Civic365/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li data-nav-id='./User/' title='General' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +

                "<li data-nav-id='./General-Settings/' title='Date Format' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/general/#date-format'>Date Format</a>" +
                "</li>" +
                "<li data-nav-id='./General-Settings/' title='Time Format' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/general/#timeformat'>Time Format</a>" +
                "</li>" +
                "<li data-nav-id='./Email-Notification/' title='Theme' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/general/#theme'>Theme</a>" +
                "</li>" +
                // "<li data-nav-id='./Email-Notification/' title='Teams Option' class='sidelist'>" +
                //     "<a href='/Civic365/modern/admin/settings/general/#teams-option'>Teams Option on New Ticket Form</a>" +
                // "</li>" +
                // "<li data-nav-id='./Email-Notification/' title='Home Page Table Sorting' class='sidelist'>" +
                //     "<a href='/Civic365/modern/admin/settings/general/#home-page-table-sorting'>Home Page Table Sorting</a>" +
                // "</li>" +

                "<li data-nav-id='./Column-Setting/' title='Display Resolved Tab On Homepage' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/general/#display-resolved'>Display Resolved Tab on Home Page</a>" +
                "</li>" +
                "<li data-nav-id='./Dashboard-Settings/' title='Display Help Page' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/general/#display-help'>Display Help Page</a>" +
                "</li>" +
                "<li data-nav-id='./Column-Setting/' title='Display Select Teams and priority as dropdown in new ticket page' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/general/#Select-Teams-and-priority-as-dropdown-in-new-ticket-page'>Select Teams and priority as dropdown in new ticket page</a>" +
                "</li>" +
                "<li data-nav-id='./Column-Setting/' title='Show resolved ticket in resolved tab only' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/general/#Show-resolved-ticket-in-resolved-tab-only'>Show resolved ticket in resolved tab only</a>" +
                "</li>" +
                "<li data-nav-id='./Column-Setting/' title='Show resolved ticket in selected tabs' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/general/#Show-resolved-ticket-in-selected-tabs'>Show resolved ticket in selected tabs</a>" +
                "</li>" +
                "<li data-nav-id='./Column-Setting/' title='GCC Tenant' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/general/#GCC-Tenant'>GCC Tenant</a>" +
                "</li>" +
                "<li data-nav-id='./Column-Setting/' title='Create tickets on behalf of Non-M365 User' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/general/#Create'>Create tickets on behalf of Non-M365 User</a>" +
                "</li>" +
                "<li data-nav-id='./Column-Setting/' title='Show Favicon of Civic 365' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/general/#Show-favicon-of-Civic-365'>Show Favicon of Civic 365</a>" +
                "</li>" +
                "<li data-nav-id='../General' title='Use Sharepoint URL for MS Teams installed application' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/general/#SharepointURL'>Use Sharepoint URL for MS Teams installed application</a>" +
                "</li>" +
                "<li data-nav-id='./Column-Setting/' title='Language selection as browser default language' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/general/#language'>Language</a>" +
                "</li>" +
                "<li data-nav-id='./Custom-Emails/' title='Naming Convention' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/general/#naming-convention'>Naming Convention</a>" +
                "</li>" +
                "<li data-nav-id='./Custom-Emails/' title='Hide Sharepoint Page&apos;s Default Components' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/general/#Hide-Sharepoint-Pages-Default-Components'>Hide Sharepoint Page&apos;s Default Components</a>" +
                "</li>" +
                "<li data-nav-id='./Assign-Assets/' title='Recycle Bin' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/general/#recycle-bin'>Recycle Bin</a>" +
                "</li>" +
                "<li data-nav-id='./Dashboard-Settings/' title='Brand Logo' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/general/#brand-logo'>Brand Logo</a>" +
                "</li>" +

            "</ul>" +
        "</li>" +

        "<li class='dropdownicon sidelist' title='Ticket Customization'>" +
            "<a class='qwe' href='/Civic365/modern/admin/settings/ticket-customization/'>Ticket Customization</a>" +
            "<img class='helpdesk-img aside_dropdown_icon' src='/Civic365/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li data-nav-id='../admin Guide/Administration/' title='Ticket Customization' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li data-nav-id='./Assign-Assets/' title='Priority Type' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/ticket-customization/#priority-type'>Priority Type</a>" +
                "</li>" +
                "<li data-nav-id='./Assign-Assets/' title='Request Type' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/ticket-customization/#request-type'>Request Type</a>" +
                "</li>" +
                "<li data-nav-id='./Assign-Assets/' title='Status' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/ticket-customization/#status'>Status</a>" +
                "</li>" +
                "<li data-nav-id='./Assign-Assets/' title='Ticket Field' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/ticket-customization/#ticket-field'>Ticket Field</a>" +
                "</li>" +
                "<li data-nav-id='./Assign-Assets/' title='Ticket Sequence' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/ticket-customization/#ticket-sequence'>Ticket Sequence</a>" +
                "</li>" +
                "<li data-nav-id='./Assign-Assets/' title='Custom Forms' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/ticket-customization/#custom-form'>Custom Forms</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Merge Tickets' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/ticket-customization/#merge-tickets'>Merge Tickets</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Split Tickets' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/ticket-customization/#split-tickets'>Split Tickets</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Review Tickets' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/ticket-customization/#review-tickets'>Review Tickets</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Escalate Tickets' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/ticket-customization/#escalate-tickets'>Escalate Tickets</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Create ticket automatically' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/ticket-customization/#create-ticket'>Create ticket automatically</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Auto close Tickets' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/ticket-customization/#auto-close'>Auto close Tickets</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Auto Assign Tickets' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/ticket-customization/#auto-assign'>Auto Assign Tickets</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Sub Tickets' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/ticket-customization/#sub-tickets'>Sub Tickets</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Ticket Aging Reports' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/ticket-customization/#ticket-aging-reports'>Ticket Aging Reports</a>" +
                "</li>" +
            "</ul>" +
        "</li>" +

        "<li class='dropdownicon sidelist' title='Role'>" +
            "<a class='qwe' href='/Civic365/modern/admin/settings/role/'>Roles</a>" +
            "<img class='helpdesk-img aside_dropdown_icon' src='/Civic365/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/' title='Users/Roles/Permissions' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li data-nav-id='./Assign-Assets/ ' title='Add/Edit Users' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/role/#users'>Add/Edit Users</a>" +
                "</li>" +
                "<li data-nav-id='./Assign-Assets/' title='Add/Edit End Users' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/role/#endUsers'>Add/Edit End Users</a>" +
                "</li>" +
                "<li data-nav-id='./Assign-Assets/ ' title='Add/Edit Teams' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/role/#teams'>Add/Edit Teams</a>" +
                "</li>" +
                "<li data-nav-id='./Assign-Assets/' title='Service' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/role/#service'>Service</a>" +
                "</li>" +
                "<li data-nav-id='./Assign-Assets/' title='Sub-Service' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/role/#sub-service'>Sub-Service</a>" +
                "</li>" +
                "<li data-nav-id='./Assign-Assets/ ' title='Advance Permissions' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/role/#advance'>Advance Permissions</a>" +
                "</li>" +
            "</ul>" +
        "</li>" +

        "<li class='dropdownicon sidelist' title='Integration'>" +
            "<a class='qwe' href='/Civic365/modern/admin/settings/integration/'>Integrations</a>" +
            "<img class='helpdesk-img aside_dropdown_icon' src='/Civic365/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Integrations' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li data-nav-id='./Assign-Assets/ ' title='Phone' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/integration/#phone'>Phone</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Civic Mailbox' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/integration/#helpdesk-mailbox'>Civic Mailbox</a>" +
                "</li>" +
                // "<li data-nav-id='./Add Assets/ ' title='Microsoft Graph API' class='sidelist'>" +
                //     "<a href='/Civic365/modern/admin/settings/integration/#graph-api'>Microsoft Graph API</a>" +
                // "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Integrate with HR365 Asset Management' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/integration/#integrateMicrosoft'>Integrate with HR365 Asset Management</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Integrate Microsoft Form with Civic' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/integration/#integrateMicrosoft'>Integrate Microsoft Form with Civic</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Azure Open AI Integration' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/integration/#AI-Integration'>Azure Open AI Integration</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Copilot Integration' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/integration/#Copilot-Integeration'>Copilot Integration</a>" +
                "</li>" +
            "</ul>" +
        "</li>" +

        "<li class='dropdownicon sidelist' title='notification'>" +
            "<a class='qwe' href='/Civic365/modern/admin/settings/notification/'>Notification</a>" +
            "<img class='helpdesk-img aside_dropdown_icon' src='/Civic365/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/' title='Notification' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li data-nav-id='./Assign-Assets/ ' title='Requester' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/notification/#requester'>Requester</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Assignee' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/notification/#assignee'>Assignee</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Supervisor' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/notification/#supervisor'>Supervisor</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Admin' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/notification/#admin'>Admin</a>" +
                "</li>" +
                  "<li data-nav-id='./Add Assets/ ' title='Approver' class='sidelist '>" +       
                "<a href='/Civic365/modern/admin/settings/notification/#approver'>Approver</a>" +
                "</li>" +
            "</ul>" +
        "</li>" +

        "<li class='dropdownicon sidelist' title='Features'>" +
            "<a class='qwe' href='/Civic365/modern/admin/settings/features/'>Features</a>" +
            "<img class='helpdesk-img aside_dropdown_icon' src='/Civic365/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li data-nav-id='./Add Assets/ ' title='Features' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li data-nav-id='./Assign-Assets/ ' title='Canned Responses' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#canned-responses'>Canned Responses</a>" +
                "</li>" +
                
         "<li data-nav-id='./Add Assets/ ' title='Column Indexing' class='sidelist '>" +
        "<a href='/Civic365/modern/admin/settings/features/#Column_Indexing'>Column Indexing</a>" +
        "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Customer Satisfaction' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#customer-satisfaction'>Customer Satisfaction</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Custom Columns' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#custom-column'>Custom Columns</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Business Hours' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#business-hours'>Business Hours</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Column Setting' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#column-setting'>Column Setting</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Define SLA Polices' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#sla-policies'>Define SLA Polices</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Apply SLA Polices' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#apply-sla-policies'>Apply SLA Polices</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Approver Workflow' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#Approver-Workflow'>Approver Workflow</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Rules & Automation' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#Rules-Automation'>Rules & Automation</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Dashboard Settings' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#dashboard-settings'>Dashboard Settings</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Chatbot Bubble 365 setting' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#Chatbot-Bubble-365-setting'>Chatbot Bubble 365 setting</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Knowledgebase' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#Knowledgebase'>Knowledgebase</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='HD365 Migration' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#HD365Migration'>HD365 Migration</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Show sample data in dashboard' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#Show-sample-data-in-dashboard'>Show sample data in dashboard</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Incident Module' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#Incident Module'>Incident Module</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Configure different mailboxes for different team' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#Configure-different-mailboxes-for-different-team'>Configure different mailboxes for different team</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Service Entitlement' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#Service-Entitlement'>Service Entitlement</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Enable MS Teams live chat integration' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#EnableMSTeamslivechatintegeration'>Enable MS Teams live chat integration</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Enable Archival of ticket' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#Enable-Archival-of-ticket'>Enable Archival of ticket</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Archive Tickets after days' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#ArchiveTicketsafte'>Archive Tickets after days</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Retain data in Civic 365 till days' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#RetaindatainHelpdesk365till'>Retain data in Civic 365 till days</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Time Tracking' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#time-tracking'>Time Tracking</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Enable comments in the ticket reply thread' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#Enablecommentsintheticketreplthread'>Enable comments in the ticket reply thread</a>" +
                "</li>" +
                "<li data-nav-id='./Add Assets/ ' title='Show favicon of Helpdesk365' class='sidelist'>" +
                    "<a href='/Civic365/modern/admin/settings/features/#show'>Show favicon of Helpdesk365</a>" +
                "</li>" +
            "</ul>" +
        "</li>" +

    "</ul>" +
"</li>"+
        "<li data-nav-id='./Settings/ ' title=knowledgebase class='sidelist '>"+
        "<a href='/Civic365/modern/admin/knowledgebase/'>Knowledgebase</a>"+
        "</li>"+
        
        
        
        "<li class='dropdownicon sidelist' title='Help'>" +
        "<a href='/Civic365/modern/admin/help/'>" +
        "Help" +
        "</a>" +
        "<img src='/Civic365/modern/admin/hdm-admin-aside-js/down-arrow-svgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' '>" +
        "</li>" +

        "<li data-nav-id='../advanced/' title=Help class='sidelist dropdown_romove_dot'>" +



        "<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
        "<li  data-nav-id='../advanced/' title='Product Activation' class='sidelist'>" +
        "<a href='/Civic365/modern/admin/help/#product-activation'>Product Activation</a>" +
        "</li>" )
})

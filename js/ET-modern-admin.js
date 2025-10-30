$(document).ready(function () {
    $("#ETmodernadmin").html("");

    $("#ETmodernadmin").append("<li data-nav-id='./Settings/' title=Introduction class=sidelist>" +

        "<a href='/Expense-tracker/modern/admin/introduction/'>" +
        " Introduction" +
        " </a>" +
        "</li>" +
        "<li data-nav-id='./Settings/' title='Architecture Diagram' class=sidelist>" +

        "<a href='/Expense-tracker/modern/admin/architecture-diagram/'>" +
        "Architecture Diagram" +
        "</a>" +

        "</li>" +
        "<li data-nav-id='./Settings/' title='Home Page' class=sidelist>" +

        "<a href='/Expense-tracker/modern/admin/home-page/'>" +
        "Home Page" +
        "</a>" +

        "</li>" +
         "<li data-nav-id='./Settings/' title='Dashboard' class=sidelist>" +

        "<a href='/Expense-tracker/modern/admin/dashboard/'>" +
        "Dashboard" +
        "</a>" +

        "</li>" +


        "<li data-nav-id='./Settings/' title='Reports' class=sidelist>" +

        "<a href='/Expense-tracker/modern/admin/reports/'>" +
        "Report" +
        "</a>" +

        "</li>" +







        "<li data-nav-id='./Settings/' title=Administration class=sidelist>" +

        "<a href='/Expense-tracker/modern/admin/administration/'>" +
        " Administration" +
        "</a>" +
        "</li>" +



        "<li class='dropdownicon sidelist' title='settings'>" +
        "<a class='qwe' href='/Expense-tracker/modern/admin/settings/'>" +
        "Settings" +
        "</a>" +
        "<img src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'  class='helpdesk-img aside_dropdown_icon_setting'>" +
        "</li>" +


       "<li data-nav-id='../system-settings' title='system-settings' class='sidelist dropdown_romove_dot'>" +
    "<ul class='sidenavSub-topics aside_dropdown_list_setting'>" +
        "<li data-nav-id='../user' title='General Settings' class='dropdownicon sidelist'>" +
            "<a class='qwe' href='/Expense-tracker/modern/admin/settings/general-setting/'> General Settings </a>" +
            "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +

        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +

                "<li data-nav-id='../General' title='Theme' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#themes'>Theme</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Date Format' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#Dateformat'>Date Format</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Currency' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#Currency'>Currency</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Currency Separator' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#CurrencySeperator'>Currency Separator</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Language' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#Language'>Language</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Display Project' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#DisplayProject'>Display Project</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Display Location' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#DisplayLocation'>Display Location</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Expense Tracking Number' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#ExpenseTrackingID'>Expense Tracking Number</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Reimbursable' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#Reimbursable'>Reimbursable</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Sample Dashboard Data' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#SampleDashboardData'>Sample Dashboard Data</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Sample Expense Data' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#SampleExpenseData'>Sample Expense Data</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Paid Expenses' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#PaidExpenses'>Paid Expenses</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Expense Attachments' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#ExpenseAttachments'>Expense Attachments</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Expense Type Code' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#ExpenseTypeCode'>Expense Type Code</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Multiple Cost Center' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#MultipleCostCenter'>Multiple Cost Center</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Draft Expense ID' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#DraftExpenseID'>Draft Expense ID</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Self-Declaration' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#SelfDeclaration'>Self-Declaration</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Expense Time' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#ExpenseTime'>Expense Time</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Clone Multiple Expense' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#CloneMultipleExpense'>Clone Multiple Expense</a>" +
                "</li>" +

                 "<li data-nav-id='../General' title='Use Sharepoint URL for MS Teams installed application' class='sidelist'>" +
      "<a class='qwe' href='/Expense-tracker/modern/admin/settings/general-setting/#SharepointURL'>Use Sharepoint URL for MS Teams installed application</a>" +
    "</li>" +

                "<li data-nav-id='../General' title='SharePoint Page Configuration' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#SharepointPageConfiguration'>SharePoint Page Configuration</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Logo' class='sidelist'>" +
                    "<a href='/Expense-tracker/modern/admin/settings/general-setting/#Logo'>Logo</a>" +
                "</li>" +

            "</ul>" +
        "</li>" +

        "<li data-nav-id='../General' title='User Roles and Permissions' class='sidelist'>" +
            "<a class='qwe' href='/Expense-tracker/modern/admin/settings/user-role/'>User Roles and Permissions</a>" +
        "</li>" +

        "<li data-nav-id='../General' title='Notifications' class='sidelist'>" +
            "<a class='qwe' href='/Expense-tracker/modern/admin/settings/notification/'>Notifications</a>" +
        "</li>" +
    


"<li data-nav-id='../General' title='Integration' class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/Expense-tracker/modern/admin/settings/integration/'>Integration</a>" +
         " <img src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'  class='imageIconmodernuser aside_dropdown_icon'>" +
     "<li data-nav-id='./Settings/'  class='sidelist dropdown_romove_dot'>" +

        "<ul class='sidenavSub-topics aside_dropdown_list active'>" +
         "<li data-nav-id='../General' title='Quickbooks Integration' class='sidelist'>" +
        "<a class='qwe' href='/Expense-tracker/modern/admin/settings/integration/#_quickbooks'>   Quickbooks Integration</a>" +
        "</li>" +
         "<li data-nav-id='../General' title='XeroAccount Integration' class='sidelist'>" +
        "<a class='qwe' href='/Expense-tracker/modern/admin/settings/integration/#XeroAccount'>   XeroAccount Integration</a>" +
        "</li>" +
 "<li data-nav-id='../General' title='Zoho Books Integration' class='sidelist'>" +
        "<a class='qwe' href='/Expense-tracker/modern/admin/settings/integration/#ZohoBooks'>   Zoho Books Integration</a>" +
        "</li>" +
         "<li data-nav-id='../General' title='AI API Integration' class='sidelist'>" +
        "<a class='qwe' href='/Expense-tracker/modern/admin/settings/integration/#_aiapiintegration'>AI API Integration</a>" +
        "</li>" +
        "</ul>"+
        "</li>"+
        "</li>" +




       "<li data-nav-id='../user' title='Feature' class='dropdownicon sidelist'>" +
    "<a class='qwe' href='/Expense-tracker/modern/admin/settings/feature/'>Features</a>" +
    "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
    "</a>" +
"</li>" +
"<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
    "<ul class='sidenavSub-topics aside_dropdown_list'>" +

    "<li data-nav-id='../General' title='Custom Fields' class='sidelist'>" +
    "<a href='/Expense-tracker/modern/admin/settings/feature/#Custom-Fields'>Custom Fields</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Cost Center' class='sidelist'>" +
    "<a href='/Expense-tracker/modern/admin/settings/feature/#Cost-Center'>Cost Center</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Departments' class='sidelist'>" +
    "<a href='/Expense-tracker/modern/admin/settings/feature/#Department'>Departments</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Job Title' class='sidelist'>" +
    "<a href='/Expense-tracker/modern/admin/settings/feature/#Job-Title'>Job Title</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Location' class='sidelist'>" +
    "<a href='/Expense-tracker/modern/admin/settings/feature/#Location'>Location</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Budget Limit' class='sidelist'>" +
    "<a href='/Expense-tracker/modern/admin/settings/feature/#Approver-Budget-Limit'>Budget Limit</a>" +
    "</li>" +
      "<li data-nav-id='../General' title='Distance' class='sidelist'>" +
    "<a href='/Expense-tracker/modern/admin/settings/feature/#Distance'>Distance</a>" +
    "</li>" +
      "<li data-nav-id='../General' title='Time' class='sidelist'>" +
    "<a href='/Expense-tracker/modern/admin/settings/feature/#Time'>Time</a>" +
    "</li>" +


  

    "<li data-nav-id='../General' title='Manage Expenses' class='sidelist'>" +
    "<a href='/Expense-tracker/modern/admin/settings/feature/#Manage-Expenses'>Manage Expenses</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Custom Forex Rate' class='sidelist'>" +
    "<a href='/Expense-tracker/modern/admin/settings/feature/#Custom-Forex-Rate'>Custom Forex Rate</a>" +
    "</li>" +
    
    "<li data-nav-id='../General' title=' Mileage' class='sidelist'>" +
    "<a href='/Expense-tracker/modern/admin/settings/feature/#Mileage'> Mileage</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Employee Grades' class='sidelist'>" +
    "<a href='/Expense-tracker/modern/admin/settings/feature/#Employee-Grades'>Employee Grades</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Delete Expense' class='sidelist'>" +
    "<a href='/Expense-tracker/modern/admin/settings/feature/#Delete-Expense'>Delete Expense</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Import Cards' class='sidelist'>" +
    "<a href='/Expense-tracker/modern/admin/settings/feature/#Import-Cards'>Import Cards</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Expense Future Days' class='sidelist'>" +
    "<a href='/Expense-tracker/modern/admin/settings/feature/#Expense-Future-Days'>Expense Future Days</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Logs Collection' class='sidelist'>" +
    "<a href='/Expense-tracker/modern/admin/settings/feature/#Logs-Collection'>Logs Collection</a>" +
    "</li>" +



        "</ul>" +
        "</ul>" +
        "</li >" +






        "</ul>" +
        "</ul>" +

        "</li>" +



        "<li class='dropdownicon sidelist' title='Help'>" +
        "<a href='/Expense-tracker/modern/admin/help/'>" +
        "Help" +
        "</a>" +
        "<img src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' '>" +
        "</li>" +

        "<li data-nav-id='../advanced/' title=Help class='sidelist dropdown_romove_dot'>" +



        "<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
        "<li  data-nav-id='../advanced/' title='Product Activation' class='sidelist'>" +
        "<a href='/Expense-tracker/modern/admin/help/#product-activation'>Product Activation</a>" +
        "</li>")

});

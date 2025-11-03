$(document).ready(function () {
    $("#revmodernadmin").html("");

    $("#revmodernadmin").append(
        "<li data-nav-id='./Settings/' title='Introduction' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/introduction/'>Introduction</a>" +
        "</li>" +

        "<li data-nav-id='./Settings/' title='Architecture Diagram' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/architecture-diagram/'>Architecture Diagram</a>" +
        "</li>" +

        "<li data-nav-id='./Settings/' title='Home Page' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/homepage/'>Home Page</a>" +
        "</li>" +

         "<li data-nav-id='./Settings/' title='Buyers' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/buyers/'>Buyers</a>" +
        "</li>" +

         "<li data-nav-id='./Settings/' title='Dashboard' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/dashboard/'>Dashboard</a>" +
        "</li>" +

        "<li data-nav-id='./Settings/' title='Reports' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/reports/'>Reports</a>" +
        "</li>" +


        "<li data-nav-id='./Settings/' title='Administration' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/administration/'>Administration</a>" +
        "</li>" +

         "<li data-nav-id='./Settings/' title='Catalog' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/catalog/'>Catalog</a>" +
        "</li>" +

         "<li data-nav-id='./Settings/' title='Costomer ' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/costomerjourney/'>Customer Journey</a>" +
        "</li>" +

        // Settings with arrow
       "<li class='dropdownicon sidelist' title='Settings'>" +
        "<a class='qwe' href='/Revenue365/modern/admin/settings/'>Settings</a>" +
        "<img src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'' class='helpdesk-img aside_dropdown_icon_setting'>" +
        "</li>" +

        "<li data-nav-id='../system-settings' title='system-settings' class='sidelist dropdown_romove_dot'>" +
    "<ul class='sidenavSub-topics aside_dropdown_list_setting'>" +

        "<li data-nav-id='../user' title='General Setting' class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/Revenue365/modern/admin/settings/generalsetting/'>General Settings</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +

        "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
       "<li data-nav-id='../user' title='Theme' class='sidelist'>" +
        "<a class='qwe' href='/Revenue365/modern/admin/settings/generalsetting/#Theme'>Theme</a>" +
        "</li>" +

        "<li data-nav-id='../DateFormat' title='Date Format' class='sidelist'>" +
            "<a class='qwe' href='/Revenue365/modern/admin/settings/generalsetting/#DateFormat'>Date Format</a>" +
        "</li>" +

        "<li data-nav-id='../DefaultCurrency' title='Default Currency' class='sidelist'>" +
            "<a class='qwe' href='/Revenue365/modern/admin/settings/generalsetting/#DefaultCurrency'>Default Currency</a>" +
        "</li>" +

        "<li data-nav-id='../Language' title='Language' class='sidelist'>" +
            "<a class='qwe' href='/Revenue365/modern/admin/settings/generalsetting/#Langauge'>Language</a>" +
        "</li>" +

        "<li data-nav-id='../Sharepoint-page' title='SharePoint Page Components' class='sidelist'>" +
            "<a class='qwe' href='/Revenue365/modern/admin/settings/generalsetting/#Sharepoint-page'>SharePoint Page Components</a>" +
        "</li>" +

        "<li data-nav-id='../Dashboards' title='Sample Dashboard Data' class='sidelist'>" +
            "<a class='qwe' href='/Revenue365/modern/admin/settings/generalsetting/#_dashboards2'>Sample Dashboard Data</a>" +
        "</li>" +
         "<li data-nav-id='../Dashboards' title='Revenue 365 Sample Data' class='sidelist'>" +
            "<a class='qwe' href='/Revenue365/modern/admin/settings/generalsetting/#Revenue365SampleData'>Revenue 365 Sample Data</a>" +
        "</li>" +

        "<li data-nav-id='../BrowserDefaultLanguage' title='Language Selection as Browser Default Language' class='sidelist'>" +
            "<a class='qwe' href='/Revenue365/modern/admin/settings/generalsetting/#LanguageSelection'>Language Selection as Browser Default Language</a>" +
        "</li>" +

        "<li data-nav-id='../EnableLogs' title='Enable Logs Collection' class='sidelist'>" +
            "<a class='qwe' href='/Revenue365/modern/admin/settings/generalsetting/#Enable_Logs'>Enable Logs Collection</a>" +
        "</li>" +

        "<li data-nav-id='../LogsType' title='Logs Types' class='sidelist'>" +
            "<a class='qwe' href='/Revenue365/modern/admin/settings/generalsetting/#Logs_Type'>Logs Types</a>" +
        "</li>" +

        "<li data-nav-id='../SharepointURL' title='Use SharePoint URL for MS Teams Installed Application' class='sidelist'>" +
            "<a class='qwe' href='/Revenue365/modern/admin/settings/generalsetting/#SharepointURL'>Use SharePoint URL for MS Teams Installed Application</a>" +
        "</li>" +

        "<li data-nav-id='../BrandLogo' title='Brand Logo' class='sidelist'>" +
            "<a class='qwe' href='/Revenue365/modern/admin/settings/generalsetting/#Brand-logo'>Brand Logo</a>" +
        "</li>" +






            "</ul>"+
            "</li>"+

        "<li data-nav-id='../user' title='Users' class='sidelist'>" +
        "<a class='qwe' href='/Revenue365/modern/admin/settings/users/'>Users</a>" +
        "</li>" +

     
"<li data-nav-id='../user' title='Advance Settings' class='dropdownicon sidelist'>" +
    "<a class='qwe' href='/Revenue365/modern/admin/settings/Advancesettings/'>Advance Settings</a>" +
    "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
"</li>" +

"<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
    "<ul class='sidenavSub-topics aside_dropdown_list'>" +

    

        "<li data-nav-id='../AllowSameProjectNames' title='Allow Same Project Names for Different Clients' class='sidelist'>" +
            "<a class='qwe' href='/Revenue365/modern/admin/settings/Advancesettings/#AllowSameProjectNames'>Allow Same Project Names for Different Clients</a>" +
        "</li>" +

        "<li data-nav-id='../ShowPaidOverdue' title='Show Paid and Overdue on Invoice PDF' class='sidelist'>" +
            "<a class='qwe' href='/Revenue365/modern/admin/settings/Advancesettings/#ShowPaidOverdue'>Show Paid and Overdue on Invoice PDF</a>" +
        "</li>" +

        "<li data-nav-id='../AllowInvoiceManagerEdit' title='Allow Invoice Manager to Edit the Invoice' class='sidelist'>" +
            "<a class='qwe' href='/Revenue365/modern/admin/settings/Advancesettings/#AllowInvoiceManagerEdit'>Allow Invoice Manager to Edit the Invoice</a>" +
        "</li>" +
        "<li data-nav-id='../AllowInvoiceTransactionEdit' title='Allow Invoice Manager to Edit the Transaction' class='sidelist'>" +
    "<a class='qwe' href='/Revenue365/modern/admin/settings/Advancesettings/#AllowInvoiceTransactionEdit'>Allow Invoice Manager to Edit the Transaction</a>" +
"</li>" +

"<li data-nav-id='../DirectBilling' title='Allow Direct Billing to Partner Client' class='sidelist'>" +
    "<a class='qwe' href='/Revenue365/modern/admin/settings/Advancesettings/#DirectBilling'>Allow Direct Billing to Partner Client</a>" +
"</li>" +

"<li data-nav-id='../CustomerSuccess' title='Allow Customer Success Module for Partner Client' class='sidelist'>" +
    "<a class='qwe' href='/Revenue365/modern/admin/settings/Advancesettings/#CustomerSuccess'>Allow Customer Success Module for Partner Client</a>" +
"</li>" +

"<li data-nav-id='../DeleteInvoice' title='Delete Invoice' class='sidelist'>" +
    "<a class='qwe' href='/Revenue365/modern/admin/settings/Advancesettings/#DeleteInvoice'>Delete Invoice</a>" +
"</li>" +

"<li data-nav-id='../EmailPaymentComplete' title='Email Need to Send When Payment is Completed' class='sidelist'>" +
    "<a class='qwe' href='/Revenue365/modern/admin/settings/Advancesettings/#EmailPaymentComplete'>Email Need to Send When Payment is Completed</a>" +
"</li>" +

"<li data-nav-id='../AlignSubscription' title='Align Addon/New Subscription Renewal with Existing Client Subscription' class='sidelist'>" +
    "<a class='qwe' href='/Revenue365/modern/admin/settings/Advancesettings/#AlignSubscription'>Align Addon/New Subscription Renewal with Existing Client Subscription</a>" +
"</li>" +

"<li data-nav-id='../StandardCycle' title='Set Addon/New Subscription Renewal Based on Standard Frequency Cycle' class='sidelist'>" +
    "<a class='qwe' href='/Revenue365/modern/admin/settings/Advancesettings/#StandardCycle'>Set Addon/New Subscription Renewal Based on Standard Frequency Cycle</a>" +
"</li>" +

"<li data-nav-id='../MultiCurrency' title='Enable Multi-Currency Partner Invoices' class='sidelist'>" +
    "<a class='qwe' href='/Revenue365/modern/admin/settings/Advancesettings/#MultiCurrency'>Enable Multi-Currency Partner Invoices</a>" +
"</li>"+


    "</ul>" +
"</li>" +


"<li data-nav-id='../Notification' title='Notifications' class='dropdownicon sidelist'>" +
  "<a class='qwe' href='/Revenue365/modern/admin/settings/Notification/'>Notifications</a>" +
  "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
"</li>" +

"<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
  "<ul class='sidenavSub-topics aside_dropdown_list'>" +

    "<li data-nav-id='../EmailTemplate' title='Email Template' class='sidelist'>" +
      "<a class='qwe' href='/Revenue365/modern/admin/settings/Notification/#EmailTemplate'>Email Template</a>" +
    "</li>" +

    "<li data-nav-id='../NotificationEmailID' title='Notification Email ID' class='sidelist'>" +
      "<a class='qwe' href='/Revenue365/modern/admin/settings/Notification/#NotificationEmailID'>Notification Email ID</a>" +
    "</li>" +

    "<li data-nav-id='../CSJEmailID' title='CSJ Email ID' class='sidelist'>" +
      "<a class='qwe' href='/Revenue365/modern/admin/settings/Notification/#CSJEmailID'>CSJ Email ID</a>" +
    "</li>" +

  "</ul>" +
"</li>" +




         "<li data-nav-id='../user' title='Integration' class='sidelist'>" +
        "<a class='qwe' href='/Revenue365/modern/admin/settings/integration/'>Integration</a>" +
        "</li>" +

    
"<li data-nav-id='../features' title='Features' class='dropdownicon sidelist'>" +
  "<a class='qwe' href='/Revenue365/modern/admin/settings/Features/'>Features</a>" +
  "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
"</li>" +

"<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
  "<ul class='sidenavSub-topics aside_dropdown_list'>" +

   

    "<li data-nav-id='../Organization' title='Organization' class='sidelist'>" +
      "<a class='qwe' href='/Revenue365/modern/admin/settings/Features/#Organization'>Organization</a>" +
    "</li>" +

    "<li data-nav-id='../Categories' title='Categories' class='sidelist'>" +
      "<a class='qwe' href='/Revenue365/modern/admin/settings/Features/#Categories'>Categories</a>" +
    "</li>" +

    "<li data-nav-id='../Department' title='Department' class='sidelist'>" +
      "<a class='qwe' href='/Revenue365/modern/admin/settings/Features/#Department'>Department</a>" +
    "</li>" +

    "<li data-nav-id='../CustomFields' title='Custom Fields' class='sidelist'>" +
      "<a class='qwe' href='/Revenue365/modern/admin/settings/Features/#custom-fields'>Custom Fields</a>" +
    "</li>" +

    "<li data-nav-id='../Catalog' title='Catalog' class='sidelist'>" +
      "<a class='qwe' href='/Revenue365/modern/admin/settings/Features/#Catalog'>Catalog</a>" +
    "</li>" +

    "<li data-nav-id='../InvoiceModule' title='Invoice Module' class='sidelist'>" +
      "<a class='qwe' href='/Revenue365/modern/admin/settings/Features/#Invoice-Module'>Invoice Module</a>" +
    "</li>" +

    "<li data-nav-id='../StageConfiguration' title='Stage Configuration' class='sidelist'>" +
      "<a class='qwe' href='/Revenue365/modern/admin/settings/Features/#Stage-Configuration'>Stage Configuration</a>" +
    "</li>" +

    "<li data-nav-id='../Source' title='Source' class='sidelist'>" +
      "<a class='qwe' href='/Revenue365/modern/admin/settings/Features/#Source'>Source</a>" +
    "</li>" +

    "<li data-nav-id='../LeadSource' title='Lead Source' class='sidelist'>" +
      "<a class='qwe' href='/Revenue365/modern/admin/settings/Features/#Lead-Source'>Lead Source</a>" +
    "</li>" +

    "<li data-nav-id='../PaymentTerms' title='Payment Terms' class='sidelist'>" +
      "<a class='qwe' href='/Revenue365/modern/admin/settings/Features/#Payment-Tearms'>Payment Terms</a>" +
    "</li>" +

    "<li data-nav-id='../PaymentMethod' title='Payment Method' class='sidelist'>" +
      "<a class='qwe' href='/Revenue365/modern/admin/settings/Features/#Payment-Method'>Payment Method</a>" +
    "</li>" +
      "<li data-nav-id='../PaymentMethod' title='Partner Payment Method' class='sidelist'>" +
      "<a class='qwe' href='/Revenue365/modern/admin/settings/Features/#Partner-Payment-Method'>Partner Payment Method</a>" +
    "</li>" +

  "</ul>" +
"</li>" +


        "</ul>" +
        "</li>" +

        // Help section (no arrow)
        "<li class='sidelist' title='Help'>" +
        "<a href='/Revenue365/modern/admin/help/'>Help</a>" +
        "</li>" +

        "<li data-nav-id='../advanced/' title='Help' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
        "<li data-nav-id='../advanced/' title='Configure SharePoint API permissions' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/help/#product-activation'>Product Activation</a>" +
        "</li>" +
        "</ul>" +
        "</li>"
    );
});

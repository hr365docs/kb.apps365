$(document).ready(function () {
    $("#contadmin").html("");

    $("#contadmin").append(
        // ✅ Introduction
        "<li class='sidelist' data-nav-id='./Settings/' title='Introduction'>" +
            "<a href='/Contracts-365/modern/admin/introduction/'>Introduction</a>" +
        "</li>" +

        // ✅ Home Page
        "<li class='sidelist' data-nav-id='./Settings/' title='Home Page'>" +
            "<a href='/Contracts-365/modern/admin/homepage/'>Home Page</a>" +
        "</li>" +
   // ✅ Settings
        "<li class='dropdownicon sidelist' title='Settings'>" +
    "<a href='/Contracts-365/modern/admin/settings/'>Settings</a>" +
      "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
"</li>" +
"<li class='sidelist dropdown_romove_dot'>" +
    "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li class='sidelist' title='Theme'>" +
            "<a href='/Contracts-365/modern/admin/settings/#_theme_option'>Theme</a>" +
        "</li>" +
        "<li class='sidelist' title='Date Format'>" +
            "<a href='/Contracts-365/modern/admin/settings/#_date_format'>Date Format</a>" +
        "</li>" +
        "<li class='sidelist' title='Users'>" +
            "<a href='/Contracts-365/modern/admin/settings/#_users'>Users</a>" +
        "</li>" +
        "<li class='sidelist' title='Contract Type'>" +
            "<a href='/Contracts-365/modern/admin/settings/#_contract_type'>Contract Type</a>" +
        "</li>" +
        "<li class='sidelist' title='Counterparty'>" +
            "<a href='/Contracts-365/modern/admin/settings/#_counterparty'>Counterparty</a>" +
        "</li>" +
        "<li class='sidelist' title='Currency'>" +
            "<a href='/Contracts-365/modern/admin/settings/#_currency'>Currency</a>" +
        "</li>" +
        "<li class='sidelist' title='Approver Roles'>" +
            "<a href='/Contracts-365/modern/admin/settings/#_approver_roles'>Approver Roles</a>" +
        "</li>" +
       
    "</ul>" +
"</li>" +


        // ✅ Help
        "<li class='dropdownicon sidelist' title='Help'>" +
            "<a href='/Contracts-365/modern/admin/help/'>Help</a>" +
              "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li class='sidelist' title='Product Activation'>" +
                    "<a href='/Contracts-365/modern/admin/help/#product'>Product Activation</a>" +
                "</li>" +
            "</ul>" +
        "</li>"
    );
});

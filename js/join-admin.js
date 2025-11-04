$(document).ready(function () {
    $("#polladmin").html("");

    $("#polladmin").append(
        // ✅ Introduction
        "<li class='sidelist' data-nav-id='./Settings/' title='Introduction'>" +
            "<a href='/JoiningCard-365/modern/admin/introduction/'>Introduction</a>" +
        "</li>" +

        // ✅ Home Page
        "<li class='sidelist' data-nav-id='./Settings/' title='Home Page'>" +
            "<a href='/JoiningCard-365/modern/admin/homepage/'>Home Page</a>" +
        "</li>" +

        // ✅ Settings
        "<li class='dropdownicon sidelist' title='Settings'>" +
            "<a href='/JoiningCard-365/modern/admin/settings/'>Settings</a>" +
              "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li class='sidelist' title='Theme'>" +
                    "<a href='/JoiningCard-365/modern/admin/settings/#_theme_option'>Theme</a>" +
                "</li>" +
                "<li class='sidelist' title='Hide SharePoint Settings'>" +
                    "<a href='/JoiningCard-365/modern/admin/settings/#_hide_sharepoint_settings'>Hide SharePoint Settings</a>" +
                "</li>" +
                "<li class='sidelist' title='Users'>" +
                    "<a href='/JoiningCard-365/modern/admin/settings/#_users'>Users</a>" +
                "</li>" +
                "<li class='sidelist' title='Customize Card'>" +
                    "<a href='/JoiningCard-365/modern/admin/settings/#customize-card'>Customize Card</a>" +
                "</li>" +
                
            "</ul>" +
        "</li>" +

        // ✅ Help
        "<li class='dropdownicon sidelist' title='Help'>" +
            "<a href='/JoiningCard-365/modern/admin/help/'>Help</a>" +
              "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li class='sidelist' title='Product Activation'>" +
                    "<a href='/JoiningCard-365/modern/admin/help/#product'>Product Activation</a>" +
                "</li>" +
            "</ul>" +
        "</li>"
    );
});

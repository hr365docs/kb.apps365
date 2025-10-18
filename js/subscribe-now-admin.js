$(document).ready(function () {
    $("#subscribenowadmin").html("");

    $("#subscribenowadmin").append(
        // ✅ Introduction
        "<li class='sidelist' data-nav-id='./Settings/' title='Introduction'>" +
            "<a href='/SubscribeNow-365/modern/admin/introduction/'>Introduction</a>" +
        "</li>" +

        // ✅ Home Page
        "<li class='sidelist' data-nav-id='./Settings/' title='Home Page'>" +
            "<a href='/SubscribeNow-365/modern/admin/homepage/'>Home Page</a>" +
        "</li>" +

        // ✅ Settings
        "<li class='dropdownicon sidelist' title='Settings'>" +
            "<a href='/SubscribeNow-365/modern/admin/settings/'>Settings</a>" +
              "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li class='sidelist' title='Theme'>" +
                    "<a href='/SubscribeNow-365/modern/admin/settings/#_theme_option'>Theme</a>" +
                "</li>" +
                "<li class='sidelist' title='Users'>" +
                    "<a href='/SubscribeNow-365/modern/admin/settings/#_users'>Users</a>" +
                "</li>" +
                 "<li class='sidelist' title='Hide SharePoint Settings'>" +
                    "<a href='/SubscribeNow-365/modern/admin/settings/#hide-sharepoint-settings'>Hide SharePoint Settings</a>" +
                "</li>" +
                "<li class='sidelist' title='Appearance'>" +
            "<a href='/SubscribeNow-365/modern/admin/settings/#_appearance'>Appearance</a>" +
        "</li>" +

            "</ul>" +
        "</li>" +

        // ✅ Help
        "<li class='dropdownicon sidelist' title='Help'>" +
            "<a href='/SubscribeNow-365/modern/admin/help/'>Help</a>" +
              "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li class='sidelist' title='Product Activation'>" +
                    "<a href='/SubscribeNow-365/modern/admin/help/#product'>Product Activation</a>" +
                "</li>" +
            "</ul>" +
        "</li>"
    );
});

$(document).ready(function () {
    $("#PIPadmin").html("");

    $("#PIPadmin").append(
        // ✅ Introduction
        "<li class='sidelist' data-nav-id='./Settings/' title='Introduction'>" +
            "<a href='/PIP-365/modern/admin/introduction/'>Introduction</a>" +
        "</li>" +

        // ✅ Home Page
        "<li class='sidelist' data-nav-id='./Settings/' title='Home Page'>" +
            "<a href='/PIP-365/modern/admin/homepage/'>Home Page</a>" +
        "</li>" +

        // ✅ Settings
        "<li class='dropdownicon sidelist' title='Settings'>" +
            "<a href='/PIP-365/modern/admin/settings/'>Settings</a>" +
              "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li class='sidelist' title='General Settings'>" +
                    "<a href='/PIP-365/modern/admin/settings/#general-settings'>General</a>" +
                "</li>" +
                "<li class='sidelist' title='Notifications'>" +
                    "<a href='/PIP-365/modern/admin/settings/#notifications'>Notifications</a>" +
                "</li>" +
                "<li class='sidelist' title='User's'>" +
                    "<a href='/PIP-365/modern/admin/settings/#users'>User's</a>" +
                "</li>" +
            "</ul>" +
        "</li>" +

        // ✅ Help
        "<li class='dropdownicon sidelist' title='Help'>" +
            "<a href='/PIP-365/modern/admin/help/'>Help</a>" +
              "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li class='sidelist' title='Product Activation'>" +
                    "<a href='/PIP-365/modern/admin/help/#product'>Product Activation</a>" +
                "</li>" +
            "</ul>" +
        "</li>"
    );
});

$(document).ready(function () {
    $("#polladmin").html("");

    $("#polladmin").append(
        // ✅ Introduction
        "<li class='sidelist' data-nav-id='./Settings/' title='Introduction'>" +
            "<a href='/Count-Down-Calendar-365/modern/admin/introduction/'>Introduction</a>" +
        "</li>" +

        // ✅ Home Page
        "<li class='sidelist' data-nav-id='./Settings/' title='Home Page'>" +
            "<a href='/Count-Down-Calendar-365/modern/admin/homepage/'>Home Page</a>" +
        "</li>" +

        // ✅ Settings
        "<li class='dropdownicon sidelist' title='Settings'>" +
            "<a href='/Count-Down-Calendar-365/modern/admin/settings/'>Settings</a>" +
              "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li class='sidelist' title='Theme'>" +
                    "<a href='/Count-Down-Calendar-365/modern/admin/settings/#theme'>Theme</a>" +
                "</li>" + 
                
                "<li class='sidelist' title='Hide SharePoint Settings'>" +
                    "<a href='/Count-Down-Calendar-365/modern/admin/settings/#hide-sharepoint-settings'>Hide SharePoint Settings</a>" +
                "</li>" +


                 "<li class='sidelist' title='Users'>" +
                    "<a href='/Count-Down-Calendar-365/modern/admin/settings/#users'>Users</a>" +
                "</li>" +

                 "<li class='sidelist' title='Theme'>" +
                    "<a href='/Count-Down-Calendar-365/modern/admin/settings/#_calendar_config'>Calendar Configuration</a>" +
                "</li>" +
                 "<li class='sidelist' title='Theme'>" +
                    "<a href='/Count-Down-Calendar-365/modern/admin/settings/#_door_customization'>Door Customization</a>" +
                "</li>" +
               
            "</ul>" +
        "</li>" +

        // ✅ Help
        "<li class='dropdownicon sidelist' title='Help'>" +
            "<a href='/Count-Down-Calendar-365/modern/admin/help/'>Help</a>" +
              "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li class='sidelist' title='Product Activation'>" +
                    "<a href='/Count-Down-Calendar-365/modern/admin/help/#product'>Product Activation</a>" +
                "</li>" +
            "</ul>" +
        "</li>"
    );
});

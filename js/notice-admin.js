$(document).ready(function () {
    $("#notadmin").html("");

    $("#notadmin").append(
        // ✅ Introduction
        "<li class='sidelist' data-nav-id='./Settings/' title='Introduction'>" +
            "<a href='/NoticeBoard-365/modern/admin/introduction/'>Introduction</a>" +
        "</li>" +

        // ✅ Home Page
        "<li class='sidelist' data-nav-id='./Settings/' title='Home Page'>" +
            "<a href='/NoticeBoard-365/modern/admin/homepage/'>Home Page</a>" +
        "</li>" +

        // ✅ Settings
        "<li class='dropdownicon sidelist' title='Settings'>" +
    "<a href='/NoticeBoard-365/modern/admin/settings/'>Settings</a>" +
    "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
"</li>" +
"<li class='sidelist dropdown_romove_dot'>" +
    "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li class='sidelist' title='Theme'>" +
            "<a href='/NoticeBoard-365/modern/admin/settings/#theme-option'>Theme</a>" +
        "</li>" +
        "<li class='sidelist' title='Categories'>" +
            "<a href='/NoticeBoard-365/modern/admin/settings/#category'>Category</a>" +
        "</li>" +
        "<li class='sidelist' title='Users'>" +
            "<a href='/NoticeBoard-365/modern/admin/settings/#users'>Users</a>" +
        "</li>" +
        "<li class='sidelist' title='Hide SharePoint Componenets'>" +
            "<a href='/NoticeBoard-365/modern/admin/settings/#hide-sharepoint-settings'>Hide SharePoint Components</a>" +
        "</li>" +
    "</ul>" +
"</li>"+


        // ✅ Help
        "<li class='dropdownicon sidelist' title='Help'>" +
            "<a href='/NoticeBoard-365/modern/admin/help/'>Help</a>" +
              "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li class='sidelist' title='Product Activation'>" +
                    "<a href='/NoticeBoard-365/modern/admin/help/#product'>Product Activation</a>" +
                "</li>" +
            "</ul>" +
        "</li>"
    );
});

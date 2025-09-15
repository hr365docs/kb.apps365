$(document).ready(function () {
    $("#orgadmin").html("");

    $("#orgadmin").append(
        // ✅ Introduction
        "<li class='sidelist' data-nav-id='./Settings/' title='Introduction'>" +
            "<a href='/OrgChart-365/modern/admin/introduction/'>Introduction</a>" +
        "</li>" +

        // ✅ Home Page
        "<li class='sidelist' data-nav-id='./Settings/' title='Home Page'>" +
            "<a href='/OrgChart-365/modern/admin/homepage/'>Home Page</a>" +
        "</li>" +

         "<li class='sidelist' data-nav-id='./Settings/' title='Customize Chart'>" +
            "<a href='/OrgChart-365/modern/admin/settings/'>Customize Chart</a>" +
        "</li>" +

        

        // ✅ Help
        "<li class='dropdownicon sidelist' title='Help'>" +
            "<a href='/OrgChart-365/modern/admin/help/'>Help</a>" +
              "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li class='sidelist' title='Product Activation'>" +
                    "<a href='/OrgChart-365/modern/admin/help/#product'>Product Activation</a>" +
                "</li>" +
            "</ul>" +
        "</li>"
    );
});

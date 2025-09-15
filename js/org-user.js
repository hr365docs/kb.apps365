$(document).ready(function () {
    $("#orguser").html("");

    $("#orguser").append(
        // ✅ Introduction
        "<li class='sidelist' data-nav-id='./Introduction/' title='Introduction'>" +
            "<a href='/OrgChart-365/modern/user/introduction/'>Introduction</a>" +
        "</li>" +

        // ✅ Home Page
        "<li class='sidelist' data-nav-id='./Home/' title='Home Page'>" +
            "<a href='/OrgChart-365/modern/user/homepage/'>Home Page</a>" +
        "</li>" +

        // ✅ Help
        "<li class='dropdownicon sidelist' title='Help'>" +
            "<a href='/OrgChart-365/modern/user/help/'>Help</a>" +
              "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>" +
        "<li class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                "<li class='sidelist' title='Product Activation'>" +
                    "<a href='/OrgChart-365/modern/user/help/#product'>Product Activation</a>" +
                "</li>" +
            "</ul>" +
        "</li>"
    );
});

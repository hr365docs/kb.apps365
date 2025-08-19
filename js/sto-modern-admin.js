$(document).ready(function () {
    $("#stockmodernadmin").html("");

    $("#stockmodernadmin").append(
        // ✅ Introduction
        "<li class='sidelist' data-nav-id='./Settings/' title='Introduction'>" +
            "<a href='/Stock365/modern/admin/introduction/'>Introduction</a>" +
        "</li>" +
        "<li data-nav-id='./Settings/' title='Architecture Diagram' class='sidelist'>" +
        "<a href='/Stock365/modern/admin/architecture-diagram/'>Architecture Diagram</a>" +
        "</li>" +

        // ✅ Home Page
        "<li class='sidelist' data-nav-id='./Settings/' title='Home Page'>" +
            "<a href='/Stock365/modern/admin/homepage/'>Home Page</a>" +
        "</li>" +

        // ✅ Settings (with only General Settings)
        
 "<li class='dropdownicon sidelist' title='Settings'>" +
            "<a href='/Stock365/modern/admin/settings/'>Settings</a>" +
              "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>"+
         "<li class='sidelist dropdown_romove_dot'>" +
                    "<ul class='sidenavSub-topics aside_dropdown_list'>" +
  "<li class='sidelist' title='Theme'>" +
"<a href='/Stock365/modern/admin/settings/#default-stock'>Enter Stock Symbol</a>" +
 "</li>" +// ✅ Date format
            "<li class='sidelist' title='Date format'>" +
              "<a href='/Stock365/modern/admin/settings/#default-filter'>Filters</a>" +
            "</li>" +
            "<li class='sidelist' title='Date format'>" +
              "<a href='/Stock365/modern/admin/settings/#theme-option'>Theme</a>" +
            "</li>" +
            "<li class='sidelist' title='Date format'>" +
              "<a href='/Stock365/modern/admin/settings/#interval-setting'>Interval (valid for 1D Chart)</a>" +
            "</li>" +
            "<li class='sidelist' title='Date format'>" +
              "<a href='/Stock365/modern/admin/settings/#chart-height-setting'>Enter Chart Height (px)</a>" +
            "</li>" +
            "<li class='sidelist' title='Date format'>" +
              "<a href='/Stock365/modern/admin/settings/#layout-option'>Layout</a>" +
            "</li>" +
            "<li class='sidelist' title='Date format'>" +
              "<a href='/Stock365/modern/admin/settings/#data-to-show'>Data To Display</a>" +
            "</li>" +
            "<li class='sidelist' title='Date format'>" +
              "<a href='/Stock365/modern/admin/settings/#sharepoint-config'>SharePoint Page Configuration</a>" +
            "</li>" +
                    "</ul>"+
                    "</li>"+

           

        // ✅ Help
        "<li class='dropdownicon sidelist' title='Help'>" +
            "<a href='/Stock365/modern/admin/help/'>Help</a>" +
              "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
        "</li>"+
         "<li class='sidelist dropdown_romove_dot'>" +
                    "<ul class='sidenavSub-topics aside_dropdown_list'>" +
  "<li class='sidelist' title='Product Activation'>" +
                            "<a href='/Stock365/modern/admin/help/#product'>Product Activation</a>" +
                        "</li>" +
                    "</ul>"+
                    "</li>"
    );
});

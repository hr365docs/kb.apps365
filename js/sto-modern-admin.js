$(document).ready(function () {
  $("#stockmodernadmin").html("");

  $("#stockmodernadmin").append(
    // ✅ Introduction
    "<li class='sidelist' data-nav-id='./introduction/' title='Introduction'>" +
      "<a href='/Stock365/modern/admin/introduction/'>Introduction</a>" +
    "</li>" +

    // ✅ Architecture Diagram
    "<li class='sidelist' data-nav-id='./architecture-diagram/' title='Architecture Diagram'>" +
      "<a href='/Stock365/modern/admin/architecture-diagram/'>Architecture Diagram</a>" +
    "</li>" +

    // ✅ Home Page
    "<li class='sidelist' data-nav-id='./homepage/' title='Home Page'>" +
      "<a href='/Stock365/modern/admin/homepage/'>Home Page</a>" +
    "</li>" +

    // ✅ Settings
    "<li class='dropdownicon sidelist' title='Settings'>" +
      "<a href='/Stock365/modern/admin/settings/'>Settings</a>" +
      "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
    "</li>" +

    "<li class='sidelist dropdown_romove_dot'>" +
      "<ul class='sidenavSub-topics aside_dropdown_list'>" +

        "<li class='sidelist' title='Enter Stock Symbol'>" +
          "<a href='/Stock365/modern/admin/settings/#default-stock'>Enter Stock Symbol</a>" +
        "</li>" +

        "<li class='sidelist' title='Filters'>" +
          "<a href='/Stock365/modern/admin/settings/#default-filter'>Filters</a>" +
        "</li>" +

        "<li class='sidelist' title='Theme Options'>" +
          "<a href='/Stock365/modern/admin/settings/#theme-option'>Theme Options</a>" +
        "</li>" +

        "<li class='sidelist' title='Interval Setting (valid for 1D Chart)'>" +
          "<a href='/Stock365/modern/admin/settings/#interval-setting'>Interval (valid for 1D Chart)</a>" +
        "</li>" +

        "<li class='sidelist' title='Chart Height'>" +
          "<a href='/Stock365/modern/admin/settings/#chart-height-setting'>Enter Chart Height (px)</a>" +
        "</li>" +

        "<li class='sidelist' title='Layout Option'>" +
          "<a href='/Stock365/modern/admin/settings/#layout-option'>Layout</a>" +
        "</li>" +

        "<li class='sidelist' title='Data to Display'>" +
          "<a href='/Stock365/modern/admin/settings/#data-to-show'>Data To Display</a>" +
        "</li>" +

        "<li class='sidelist' title='SharePoint Page Configuration'>" +
          "<a href='/Stock365/modern/admin/settings/#sharepoint-config'>SharePoint Page Configuration</a>" +
        "</li>" +

      "</ul>" +
    "</li>" +

    // ✅ Help
    "<li class='dropdownicon sidelist' title='Help'>" +
      "<a href='/Stock365/modern/admin/help/'>Help</a>" +
      "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
    "</li>" +

    "<li class='sidelist dropdown_romove_dot'>" +
      "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li class='sidelist' title='Product Activation'>" +
          "<a href='/Stock365/modern/admin/help/#product'>Product Activation</a>" +
        "</li>" +
      "</ul>" +
    "</li>"
  );
});

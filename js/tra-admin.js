$(document).ready(function () {
    $("#ETmodernadmin").html("");

    $("#ETmodernadmin").append("<li data-nav-id='./Settings/' title=Introduction class=sidelist>" +

        "<a href='/MailTracker-365/modern/admin/introduction/'>" +
        " Introduction" +
        " </a>" +
        "</li>" +
        "<li data-nav-id='./Settings/' title='Architecture Diagram' class=sidelist>" +

        "<a href='/MailTracker-365/modern/admin/architecture-diagram/'>" +
        "Architecture Diagram" +
        "</a>" +

        "</li>" +
        "<li data-nav-id='./Settings/' title='Home Page' class=sidelist>" +

        "<a href='/MailTracker-365/modern/admin/home-page/'>" +
        "Home Page" +
        "</a>" +

        "</li>" +
         "<li data-nav-id='./Settings/' title='Dashboard' class=sidelist>" +

        "<a href='/MailTracker-365/modern/admin/dashboard/'>" +
        "Dashboard" +
        "</a>" +

        "</li>" +


        // "<li data-nav-id='./Settings/' title='Reports' class=sidelist>" +

        // "<a href='/MailTracker-365/modern/admin/reports/'>" +
        // "Report" +
        // "</a>" +

        // "</li>" +







        // "<li data-nav-id='./Settings/' title=Administration class=sidelist>" +

        // "<a href='/MailTracker-365/modern/admin/administration/'>" +
        // " Administration" +
        // "</a>" +
        // "</li>" +



       "<li class='dropdownicon sidelist' title='Settings'>" +
  "<a class='qwe' href='/MailTracker-365/modern/admin/settings/'>" +
    "Settings" +
  "</a>" +
  "<img src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg' class='helpdesk-img aside_dropdown_icon_setting'>" +
"</li>" +

"<li data-nav-id='../system-settings' title='system-settings' class='sidelist dropdown_romove_dot'>" +
  "<ul class='sidenavSub-topics aside_dropdown_list_setting'>" +

    // ✅ General Settings
    "<li data-nav-id='../general' title='General Settings' class='dropdownicon sidelist'>" +
      "<a class='qwe' href='/MailTracker-365/modern/admin/settings/general-setting/'>General Settings</a>" +
      "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
    "</li>" +
    "<li class='sidelist dropdown_romove_dot'>" +
      "<ul class='sidenavSub-topics aside_dropdown_list'>" +
         // ✅ Date Format
    "<li class='sidelist' title='Date Format'>" +
      "<a href='/MailTracker-365/modern/admin/settings/general-setting/#DateFormat'>Date Format</a>" +
    "</li>" +

    // ✅ Side Navigation Theme
    "<li class='sidelist' title='Side Navigation Theme'>" +
      "<a href='/MailTracker-365/modern/admin/settings/general-setting/#SideNavigationTheme'>Side Navigation Theme</a>" +
    "</li>" +

    // ✅ Enable GCC Tenant
    "<li class='sidelist' title='Enable GCC Tenant'>" +
      "<a href='/MailTracker-365/modern/admin/settings/general-setting/#EnableGCCTenant'>Enable GCC Tenant</a>" +
    "</li>" +

    // ✅ Enable Favorite Icon
    "<li class='sidelist' title='Enable Favorite Icon'>" +
      "<a href='/MailTracker-365/modern/admin/settings/general-setting/#EnableFavoriteIcon'>Enable Favorite Icon</a>" +
    "</li>" +

    // ✅ Language Selection
    "<li class='sidelist' title='Language Selection'>" +
      "<a href='/MailTracker-365/modern/admin/settings/general-setting/#LanguageSelection'>Language Selection</a>" +
    "</li>" +

    // ✅ Brand Logo
    "<li class='sidelist' title='Brand Logo'>" +
      "<a href='/MailTracker-365/modern/admin/settings/general-setting/#Brand-Logo'>Brand Logo</a>" +
    "</li>" +
      "</ul>" +
    "</li>" +

    // ✅ feature
    "<li data-nav-id='../feature' title='feature' class='dropdownicon sidelist'>" +
      "<a class='qwe' href='/MailTracker-365/modern/admin/settings/feature/'>feature</a>" +
      "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
    "</li>" +
    "<li class='sidelist dropdown_romove_dot'>" +
      "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li class='sidelist' title='Remove Custom Webpart CSS'>" +
          "<a href='/MailTracker-365/modern/admin/settings/feature/#RemoveCustomWebpartCSS'>Remove Custom Webpart CSS</a>" +
        "</li>" +
        "<li class='sidelist' title='Hide Webpart Title in SharePoint Page'>" +
          "<a href='/MailTracker-365/modern/admin/settings/feature/#HideWebpartTitle'>Hide Webpart Title in SharePoint Page</a>" +
        "</li>" +
        "<li class='sidelist' title='Hide Side Navigation Panel in SharePoint Page'>" +
          "<a href='/MailTracker-365/modern/admin/settings/feature/#HideSideNavigationPanel'>Hide Side Navigation Panel in SharePoint Page</a>" +
        "</li>" +
        "<li class='sidelist' title='Hide Top Command Bar in SharePoint Page'>" +
          "<a href='/MailTracker-365/modern/admin/settings/feature/#HideTopCommandBar'>Hide Top Command Bar in SharePoint Page</a>" +
        "</li>" +
        "<li class='sidelist' title='Hide Top Site Header'>" +
          "<a href='/MailTracker-365/modern/admin/settings/feature/#HideTopSiteHeader'>Hide Top Site Header</a>" +
        "</li>" +
        "<li class='sidelist' title='Hide Comments Wrapper'>" +
          "<a href='/MailTracker-365/modern/admin/settings/feature/#HideCommentsWrapper'>Hide Comments Wrapper</a>" +
        "</li>" +
        "<li class='sidelist' title='Hide Side Navbar'>" +
          "<a href='/MailTracker-365/modern/admin/settings/feature/#HideSideNavbar'>Hide Side Navbar</a>" +
        "</li>" +
      "</ul>" +
    "</li>" +

    // ✅ Users, Roles, and Permissions
    "<li data-nav-id='../users' title='Users, Roles and Permissions' class='dropdownicon sidelist'>" +
      "<a class='qwe' href='/MailTracker-365/modern/admin/settings/user-role/'>Users, Roles and Permissions</a>" +
      "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
    "</li>" +
    "<li class='sidelist dropdown_romove_dot'>" +
      "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li class='sidelist' title='Users'>" +
          "<a href='/MailTracker-365/modern/admin/settings/user-role/#Users'>Users</a>" +
        "</li>" +
        "<li class='sidelist' title='Exclude Domains'>" +
          "<a href='/MailTracker-365/modern/admin/settings/user-role/#ExcludeDomains'>Exclude Domains</a>" +
        "</li>" +
      "</ul>" +
    "</li>" +

  "</ul>" +
"</li>"
+



        "<li class='dropdownicon sidelist' title='Help'>" +
        "<a href='/MailTracker-365/modern/admin/help/'>" +
        "Help" +
        "</a>" +
        "<img src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' '>" +
        "</li>" +

        "<li data-nav-id='../advanced/' title=Help class='sidelist dropdown_romove_dot'>" +



        "<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
        "<li  data-nav-id='../advanced/' title='Product Activation' class='sidelist'>" +
        "<a href='/MailTracker-365/modern/admin/help/#product-activation'>Product Activation</a>" +
        "</li>")

});

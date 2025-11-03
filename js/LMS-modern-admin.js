$(document).ready(function () {
  $("#lmsmodernadmin").html("");

  $("#lmsmodernadmin").append(
    "<li data-nav-id='./Settings/' title='Introduction' class='sidelist'>" +
      "<a href='/LMS/modern/admin/introduction/'>" +
      "Introduction" +
      "</a>" +
      "</li>" +

    "<li data-nav-id='./Settings/' title='Home Page' class='sidelist'>" +
      "<a href='/LMS/modern/admin/home/'>" +
      "Home Page" +
      "</a>" +
      "</li>" +

    "<li data-nav-id='/LMS/modern/admin/Theme/' title='Theme' class='sidelist'>" +
      "<a href='/LMS/modern/admin/Theme/'>" +
      "Theme" +
      "</a>" +
      "</li>" +

    "<li data-nav-id='/LMS/modern/admin/setting/' class='dropdownicon sidelist' title='Settings'>" +
      "<a class='qwe' href='/LMS/modern/admin/setting/'>" +
      "Settings" +
      "</a>" +
      "<img src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg' class='helpdesk-img aside_dropdown_icon_setting'>" +
      "</li>" +

    "<li data-nav-id='../system-settings' title='System Settings' class='sidelist dropdown_romove_dot'>" +
      "<ul class='sidenavSub-topics aside_dropdown_list_setting'>" +

      "<li data-nav-id='../user' title='General Settings' class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/LMS/modern/admin/setting/general-setting/'>General Settings</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
      "</li>" +

      "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
          "<li data-nav-id='../General' title='Date Format' class='sidelist'>" +
            "<a href='/LMS/modern/admin/setting/general-setting/#Date-Format'>Date Format</a>" +
          "</li>" +
          "<li data-nav-id='../General' title='Show Fav Icon' class='sidelist'>" +
            "<a href='/LMS/modern/admin/setting/general-setting/#Show-FavIcon'>Show Fav Icon</a>" +
          "</li>" +
          "<li data-nav-id='../General' title='Language' class='sidelist'>" +
            "<a href='/LMS/modern/admin/setting/general-setting/#Language'>Language</a>" +
          "</li>" +
          "<li data-nav-id='../General' title=\"Hide SharePoint Page's Default Components\" class='sidelist'>" +
            "<a href='/LMS/modern/admin/setting/general-setting/#hide'>Hide SharePoint Page's Default Components</a>" +
          "</li>" +
          "<li data-nav-id='../General' title='Side Navigation User Permission' class='sidelist'>" +
            "<a href='/LMS/modern/admin/setting/general-setting/#Overall-Rating-Method'>Side Navigation User Permission</a>" +
          "</li>" +
          "<li data-nav-id='../General' title='Naming Convention' class='sidelist'>" +
            "<a href='/LMS/modern/admin/setting/general-setting/#Naming-Convention'>Naming Convention</a>" +
          "</li>" +
          "<li data-nav-id='../General' title='Company Details' class='sidelist'>" +
            "<a href='/LMS/modern/admin/setting/general-setting/#Company-Details'>Company Details</a>" +
          "</li>" +
          "<li data-nav-id='../General' title='Brand Logo' class='sidelist'>" +
            "<a href='/LMS/modern/admin/setting/general-setting/#Brand-Logo'>Brand Logo</a>" +
          "</li>" +
        "</ul>" +
      "</li>" +

      "<li data-nav-id='../General' title='App User' class='sidelist'>" +
        "<a class='qwe' href='/LMS/modern/admin/setting/App-Users/'>App User</a>" +
      "</li>" +

      "<li data-nav-id='../General' title='Notification' class='sidelist'>" +
        "<a class='qwe' href='/LMS/modern/admin/setting/Notification/'>Notification</a>" +
      "</li>" +

      "<li data-nav-id='../user' title='Assessments' class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/LMS/modern/admin/setting/Assessment/'>Assessments</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
      "</li>" +

      "<li data-nav-id='./Setting/' title='Assessment Sections' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
          "<li data-nav-id='../General' title='Question' class='sidelist'>" +
            "<a href='/LMS/modern/admin/setting/Assessment/#Question'>Question</a>" +
          "</li>" +
          "<li data-nav-id='../General' title='Section' class='sidelist'>" +
            "<a href='/LMS/modern/admin/setting/Assessment/#Section'>Section</a>" +
          "</li>" +
          "<li data-nav-id='../General' title='Assessment' class='sidelist'>" +
            "<a href='/LMS/modern/admin/setting/Assessment/#Assessment'>Assessment</a>" +
          "</li>" +
        "</ul>" +
      "</li>" +

      "<li data-nav-id='../user' title='Courses' class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/LMS/modern/admin/setting/Courses/'>Courses</a>" +
        "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
      "</li>" +

      "<li data-nav-id='./Setting/' title='Course Sections' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
          "<li data-nav-id='../General' title='Section' class='sidelist'>" +
            "<a href='/LMS/modern/admin/setting/Courses/#Section'>Section</a>" +
          "</li>" +
          "<li data-nav-id='../General' title='Chapters' class='sidelist'>" +
            "<a href='/LMS/modern/admin/setting/Courses/#Chapters'>Chapters</a>" +
          "</li>" +
          "<li data-nav-id='../General' title='Survey' class='sidelist'>" +
            "<a href='/LMS/modern/admin/setting/Courses/#Survey'>Survey</a>" +
          "</li>" +
          "<li data-nav-id='../General' title='Courses' class='sidelist'>" +
            "<a href='/LMS/modern/admin/setting/Courses/#Courses1'>Courses</a>" +
          "</li>" +
          "<li data-nav-id='../General' title='Certificate Template' class='sidelist'>" +
            "<a href='/LMS/modern/admin/setting/Courses/#CertificateTemplate'>Certificate Template</a>" +
          "</li>" +
          "<li data-nav-id='../General' title='Course Workflow' class='sidelist'>" +
            "<a href='/LMS/modern/admin/setting/Courses/#CourseWorkflow'>Course Workflow</a>" +
          "</li>" +
          "<li data-nav-id='../General' title='Roles' class='sidelist'>" +
            "<a href='/LMS/modern/admin/setting/Courses/#Roles'>Roles</a>" +
          "</li>" +
        "</ul>" +
      "</li>" +

      "</ul>" +
    "</li>" +

    "<li data-nav-id='/LMS/modern/admin/help/' class='dropdownicon sidelist' title='Help'>" +
      "<a class='qwe' href='/LMS/modern/admin/help/'>" +
      "Help" +
      "</a>" +
      "<img src='/LMS/modern/admin/down-arrow-svgrepo-com.svg' class='imageIconmodernuser aside_dropdown_icon'>" +
    "</li>" +

    "<li data-nav-id='./Settings/' class='sidelist dropdown_romove_dot'>" +
      "<ul class='sidenavSub-topics aside_dropdown_list active'>" +
        "<li data-nav-id='./General-Settings/' title='Product Activation' class='sidelist'>" +
          "<a href='/LMS/modern/admin/help/#product-activation'>" +
          "Product Activation" +
          "</a>" +
        "</li>" +
      "</ul>" +
    "</li>"
  );
});

$(document).ready(function () {
    $("#BTmodernadmin").html("");

    $("#BTmodernadmin").append(
         "<li data-nav-id='./Settings/' title='introduction' class='sidelist'>" +
        "<a href='/BookTime-365/modern/admin/introduction/'>Introduction</a>" +
        "</li>" +
        "<li data-nav-id='./Settings/' title='Architecture Diagram' class='sidelist'>" +
        "<a href='/BookTime-365/modern/admin/architecture-diagram/'>Architecture Diagram</a>" +
        "</li>" +



        "<li data-nav-id='./Settings/' title='Home' class='sidelist'>" +
        "<a href='/BookTime-365/modern/admin/homepage/'>Home Page</a>" +
        "</li>" +

        "<li data-nav-id='./Settings/' title='Reports' class='sidelist'>" +
        "<a href='/BookTime-365/modern/admin/reports/'>Reports</a>" +
        "</li>" +

        "<li data-nav-id='./Settings/' title='Theme' class='sidelist'>" +
        "<a href='/BookTime-365/modern/admin/theme/'>Theme</a>" +
        "</li>" +

        "<li class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/BookTime-365/modern/admin/settings/'>Settings</a>" +
        "<img src='../../down-arrow-svgrepo-com.svg' class='helpdesk-img aside_dropdown_icon_setting'>" +
        "</li>" +

        "<li data-nav-id='../system-settings' title='system-settings' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list_setting'>" +

        "<li data-nav-id='../General' title='General Settings' class='dropdownicon sidelist'>" +
        "<a href='/BookTime-365/modern/admin/settings/general-setting/'>General Settings</a>" +
        "<img src='../../down-arrow-svgrepo-com.svg' class='helpdesk-img aside_dropdown_icon'>" +
        "</li>" +
         "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='../Date-Format' title='Date Format' class='sidelist'>" +
  "<a href='/BookTime-365/modern/admin/settings/general-setting/#Date-Format'>Date Format</a>" +
"</li>" +
"<li data-nav-id='../Custom-Time-Zone' title='Enable Custom Time Zone' class='sidelist'>" +
  "<a href='/BookTime-365/modern/admin/settings/general-setting/#Custom-Time-Zone'>Enable Custom Time Zone</a>" +
"</li>" +
"<li data-nav-id='../Theme' title='Theme' class='sidelist'>" +
  "<a href='/BookTime-365/modern/admin/settings/general-setting/#Theme'>Theme</a>" +
"</li>" +
"<li data-nav-id='../GCC-Tenant' title='GCC Tenant' class='sidelist'>" +
  "<a href='/BookTime-365/modern/admin/settings/general-setting/#GCC-Tenant'>GCC Tenant</a>" +
"</li>" +
"<li data-nav-id='../Favicon' title='Favicon' class='sidelist'>" +
  "<a href='/BookTime-365/modern/admin/settings/general-setting/#Favicon'>Favicon</a>" +
"</li>" +
"<li data-nav-id='../Language' title='Language' class='sidelist'>" +
  "<a href='/BookTime-365/modern/admin/settings/general-setting/#Language'>Language</a>" +
"</li>" +
"<li data-nav-id='../Hide-SharePoint-Page' title='Hide SharePoint Page' class='sidelist'>" +
  "<a href='/BookTime-365/modern/admin/settings/general-setting/#Hide-SharePoint-Page'>Hide SharePoint Page</a>" +
"</li>" +
"</ul>"+
"</li>"+


        "<li data-nav-id='../General' title='General Administration' class='dropdownicon sidelist'>" +
        "<a href='/BookTime-365/modern/admin/settings/general-administration/'>General Administration</a>" +
             "<img src='../../down-arrow-svgrepo-com.svg' class='helpdesk-img aside_dropdown_icon'>" +
        "</li>" +
         "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
        "<li data-nav-id='../Date-Format' title='Date Format' class='sidelist'>" +
        "<li data-nav-id='../Language' title='Services' class='sidelist'>" +
  "<a href='/BookTime-365/modern/admin/settings/general-administration/#Services'>Services</a>" +
"</li>" +
"<li data-nav-id='../Hide-SharePoint-Page' title='Non-Working Days' class='sidelist'>" +
  "<a href='/BookTime-365/modern/admin/settings/general-administration/#Non-Working-Days'>Non-Working Days</a>" +
"</li>" +



        "</ul>"+
        "</li>"+

        "<li data-nav-id='../General' title='Users, Roles & Permissions' class='sidelist'>" +
        "<a href='/BookTime-365/modern/admin/settings/userroles/'>Users, Roles & Permissions</a>" +
        "</li>" +

        "<li data-nav-id='../General' title='Notifications' class='dropdownicon sidelist'>" +
        "<a href='/BookTime-365/modern/admin/settings/notifications/'>Notifications</a>" +
        "<img src='../../down-arrow-svgrepo-com.svg' class='helpdesk-img aside_dropdown_icon'>" +
        "</li>" +
         "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
 "<li data-nav-id='../General' title='email template' class='sidelist'>" +
        "<a href='/BookTime-365/modern/admin/settings/notifications/#email-template'>Email Template</a>" +
        "</li>" +
        "<li data-nav-id='../General' title='shared-mailbox' class='sidelist'>" +
        "<a href='/BookTime-365/modern/admin/settings/notifications/#shared-mailbox'>Shared Mailbox</a>" +
        "</li>" +


        
        "</ul>"+
        "</li>"+

        "<li data-nav-id='../General' title='Features' class='dropdownicon sidelist'>" +
        "<a href='/BookTime-365/modern/admin/settings/features/'>Features</a>" +
         "<img src='../../down-arrow-svgrepo-com.svg' class='helpdesk-img aside_dropdown_icon'>" +
        "</li>" +
         "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
 "<li data-nav-id='../General' title='custom-columns' class='sidelist'>" +
"<a href='/BookTime-365/modern/admin/settings/features/#_customcolumn'>Custom Columns</a>" +
"</li>" +
"<li data-nav-id='../General' title='select-services' class='sidelist'>" +
"<a href='/BookTime-365/modern/admin/settings/features/#_services'>Allow Customer to Select Services</a>" +
"</li>" +
"<li data-nav-id='../General' title='select-staff' class='sidelist'>" +
"<a href='/BookTime-365/modern/admin/settings/features/#_staff'>Allow Customer to Select Staff Member</a>" +
"</li>" +
"<li data-nav-id='../General' title='fetch-calendar' class='sidelist'>" +
"<a href='/BookTime-365/modern/admin/settings/features/#staff-calendar'>Fetch Staff Calendar</a>" +
"</li>" +
"<li data-nav-id='../General' title='audit-logs' class='sidelist'>" +
"<a href='/BookTime-365/modern/admin/settings/features/#audit-logs'>Audit Logs</a>" +
"</li>"
+


        
        "</ul>"+
        "</li>"+

        "<li data-nav-id='../General' title='Business Information' class='dropdownicon sidelist'>" +
        "<a href='/BookTime-365/modern/admin/settings/business-information/'>Business Information</a>" +
         "<img src='../../down-arrow-svgrepo-com.svg' class='helpdesk-img aside_dropdown_icon'>" +
        "</li>" +
         "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list'>" +
"<li data-nav-id='../General' title='basic-details' class='sidelist'>" +
"<a href='/BookTime-365/modern/admin/settings/business-information/#Basic-Details'>Basic Details</a>" +
"</li>" +

"<li data-nav-id='../General' title='privacy-policy' class='sidelist'>" +
"<a href='/BookTime-365/modern/admin/settings/business-information/#Privacy-Policy-and-Terms-&-Conditions'>Privacy Policy and Terms & Conditions</a>" +
"</li>" +

"<li data-nav-id='../General' title='business-hours' class='sidelist'>" +
"<a href='/BookTime-365/modern/admin/settings/business-information/#Business-Hours'>Business Hours</a>" +
"</li>" +

"<li data-nav-id='../General' title='brand-logo' class='sidelist'>" +
"<a href='/BookTime-365/modern/admin/settings/business-information/#Brand-Logo'>Brand Logo</a>" +
"</li>"
+
        "</ul>"+
        "</ul>"+

        "</ul>" +
        "</li>" +

        "<li class='dropdownicon sidelist' title='Help'>" +
        "<a href='/BookTime-365/modern/admin/help/'>Help</a>" +
        "<img src='../../down-arrow-svgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon'>" +
        "</li>" +

        "<li data-nav-id='../advanced/' title='Help' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list' id='btsettingedm'>" +
        "<li data-nav-id='../advanced/' title='Feedback' class='sidelist'>" +
        "<a href='/BookTime-365/modern/admin/help/#feedback'>Feedback</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Product Activation' class='sidelist'>" +
        "<a href='/BookTime-365/modern/admin/help/#product-activation'>Product Activation</a>" +
        "</li>" +
        "</ul>" +
        "</li>"
    );
});

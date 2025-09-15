$(document).ready(function () {
    $("#clmmodernadmin").html("");

    $("#clmmodernadmin").append("<li data-nav-id='./Settings/' title=Introduction class=sidelist>"+

    "<a href='/contract-management/modern/admin/introduction/'>"+
       " Introduction"+
   " </a>"+
"</li>"+
"<li data-nav-id='./Settings/' title='Architecture Diagram' class=sidelist>"+

    "<a href='/contract-management/modern/admin/architecture-diagram/'>"+
        "Architecture Diagram"+
  "</a>"+

"</li>"+
"<li data-nav-id='./Settings/' title='Home Page' class=sidelist>"+

    "<a href='/contract-management/modern/admin/home-page/'>"+
        "Home Page"+
  "</a>"+

"</li>"+


"</li>"+
"<li class='dropdownicon sidelist' title='dashboard'>" +
"<a href='/contract-management/modern/admin/dashboard/'>" +
"Dashboard" +
"</a>" +
"<img src='../../down-arrow-svgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' '>" +
"</li>" +

"<li data-nav-id='../advanced/' title=Help class='sidelist dropdown_romove_dot'>" +



"<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
"<li  data-nav-id='../advanced/' title='Configure SharePoint API permissions' class='sidelist'>" +
"<a href='/contract-management/modern/admin/dashboard/#Contract'>Contract</a>" +
"</li>"+
"<li  data-nav-id='../advanced/' title='Configure SharePoint API permissions' class='sidelist'>" +
"<a href='/contract-management/modern/admin/dashboard/#Request'>Request</a>" +
"</li>"+
"</ul>"+

"<li data-nav-id='./Settings/' title=Reports class=sidelist>"+

"<a href='/contract-management/modern/admin/reports/'>"+
" Reports"+
    "</a>"+
"</li>"+



"<li data-nav-id='./Settings/' title=Reports class=sidelist>"+

"<a href='/contract-management/modern/admin/administration/'>"+
" Administration"+
    "</a>"+
"</li>"+
"<li data-nav-id='./Settings/' title=counterparty class=sidelist>"+

"<a href='/contract-management/modern/admin/counterparty/'>"+
" Counterparty"+
    "</a>"+
"</li>"+



"<li data-nav-id='./Settings/' title='Themes' class=sidelist>"+

    "<a href='/contract-management/modern/admin/theme/'>"+
        "Themes"+
  "</a>"+
  "<li data-nav-id='./Settings/' title=delegation class=sidelist>"+

"<a href='/contract-management/modern/admin/delegation/'>"+
" Delegation"+
    "</a>"+
"</li>"+

   
"<li class='dropdownicon sidelist' title='Settings'>" +
  "<a class='qwe' href='/contract-management/modern/admin/settings/'>" +
    "Settings" +
  "</a>" +
  "<img src='../../down-arrow-svgrepo-com.svg' class='imageIconmodernuser aside_dropdown_icon'>" +
"</li>" +

"<li data-nav-id='./Settings/' class='sidelist dropdown_romove_dot'>" +
  "<ul class='sidenavSub-topics aside_dropdown_list active'>" +

    // 1) Users, Roles and Permissions (no dropdown)
    "<li data-nav-id='./users-roles-permissions/' title='Users, Roles and Permissions' class='sidelist'>" +
      "<a href='/contract-management/modern/admin/settings/userroles/'>" +
        "Users, Roles and Permissions" +
      "</a>" +
    "</li>" +
    

    // 2) Integrations & Auto Numbering (no dropdown)
    "<li data-nav-id='./integrations/' title='Integrations and Auto Numbering' class='sidelist'>" +
      "<a href='/contract-management/modern/admin/settings/integrations/'>" +
        "Integrations " +
      "</a>" +
    "</li>" +
    "<li data-nav-id='./users-roles-permissions/' title='Auto Numbering' class='sidelist'>" +
      "<a href='/contract-management/modern/admin/settings/autonumbering/'>" +
        "Auto Numbering" +
      "</a>" +
    "</li>" +

    // 3) General Settings (no dropdown)
    "<li data-nav-id='./general/' title='General Settings' class='sidelist'>" +
      "<a href='/contract-management/modern/admin/settings/general/'>" +
        "General Settings" +
      "</a>" +
    "</li>" +

    // 4) Notifications (no dropdown)
    "<li data-nav-id='./notifications/' title='Notifications' class='sidelist'>" +
      "<a href='/contract-management/modern/admin/settings/notification/'>" +
        "Notifications" +
      "</a>" +
    "</li>" +

    // 5) Features (no dropdown)
    "<li data-nav-id='./features/' title='Features' class='sidelist'>" +
      "<a href='/contract-management/modern/admin/settings/features/'>" +
        "Features" +
      "</a>" +
    "</li>" +

  "</ul>" +
"</li>"+



       
        "</ul>"+
    "</ul>"+

"</li>"+



"<li class='dropdownicon sidelist' title='Help'>" +
"<a href='/contract-management/modern/admin/help/'>" +
"Help" +
"</a>" +
"<img src='../../down-arrow-svgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon' '>" +
"</li>" +

"<li data-nav-id='../advanced/' title=Help class='sidelist dropdown_romove_dot'>" +



"<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
"<li  data-nav-id='../advanced/' title='feedback' class='sidelist'>" +
"<a href='/contract-management/modern/admin/help/#feedback'>Feedback</a>" +
"</li>"+
"<li  data-nav-id='../advanced/' title='Product Activation' class='sidelist'>" +
"<a href='/contract-management/modern/admin/help/#product-activation'>Product Activation</a>" +
"</li>" )
                                           
});

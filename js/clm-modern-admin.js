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
"<li data-nav-id='./Settings/' title='Negotiation' class=sidelist>"+

    "<a href='/contract-management/modern/admin/negotiation/'>"+
        "Negotiation"+
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



"<li data-nav-id='./Settings/' title=Administration class=sidelist>"+

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

   
"<li class='dropdownicon sidelist'>" +
        "<a class='qwe' href='/contract-management/modern/admin/settings/'>" +
        "Settings" +
        "</a>" +
        "<img src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'  class='helpdesk-img aside_dropdown_icon_setting'>" +
        "</li>" +

"<li data-nav-id='../system-settings' title=system-settings class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list_setting'>" +

    // 1) Users, Roles and Permissions (no dropdown)
  // Users, Roles and Permissions
"<li data-nav-id='./users-roles-permissions/' title='Users, Roles and Permissions' class='dropdownicon sidelist'>" +
  "<a class='qwe' href='/contract-management/modern/admin/settings/userroles/'>Users, Roles and Permissions</a>" +
  "<img src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg' class='helpdesk-img aside_dropdown_icon'>" +
"</li>" +

"<li data-nav-id='./Settings/' class='sidelist dropdown_romove_dot'>" +
  "<ul class='sidenavSub-topics aside_dropdown_list active'>" +

    "<li data-nav-id='../UserRoles' title='Add/Edit User' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/userroles/#AddEditUser'>Add/Edit User</a>" +
    "</li>" +

    "<li data-nav-id='../UserRoles' title='Add/Edit Group' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/userroles/#AddEditGroup'>Add/Edit Group</a>" +
    "</li>" +

  "</ul>" +
"</li>"+

    

    // 2) Integrations & Auto Numbering (no dropdown)
// Integrations
"<li data-nav-id='./integrations/' title='Integrations' class='dropdownicon sidelist'>" +
  "<a class='qwe' href='/contract-management/modern/admin/settings/integrations/'>Integrations</a>" +
  "<img src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg' class='helpdesk-img aside_dropdown_icon'>" +
"</li>" +

"<li data-nav-id='./Settings/'  class='sidelist dropdown_romove_dot'>" +

        "<ul class='sidenavSub-topics aside_dropdown_list active'>" +

    "<li data-nav-id='../Integration' title='Mailbox' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/integrations/#mailbox'>Mailbox</a>" +
    "</li>" +

    "<li data-nav-id='../Integration' title='E-Signature' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/integrations/#_esignature'>E-Signature</a>" +
    "</li>" +

    "<li data-nav-id='../Integration' title='AI Integration' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/integrations/#_aiintegration'>AI Integration</a>" +
    "</li>" +

    "<li data-nav-id='../Integration' title='AI Summary' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/integrations/#AISummary'>AI Summary</a>" +
    "</li>" +

    "<li data-nav-id='../Integration' title='AI Agent' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/integrations/#AIAgent'>AI Agent</a>" +
    "</li>" +
    "<li data-nav-id='../Integration' title='AI Obligation' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/integrations/#_ai_obligation'>AI Obligation</a>" +
    "</li>" +
    "<li data-nav-id='../Integration' title='AI Clause' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/integrations/#_ai_clause'>AI Clause</a>" +
    "</li>" +
    "<li data-nav-id='../Integration' title='AI Risk' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/integrations/#_ai_risk'>AI Risk</a>" +
    "</li>" +
        "</ul>"+
        "</li>"+
        "</li>" +



  // Auto Numbering
"<li data-nav-id='./users-roles-permissions/' title='Auto Numbering' class='dropdownicon sidelist'>" +
  "<a class='qwe' href='/contract-management/modern/admin/settings/autonumbering/'>Auto Numbering</a>" +
  "<img src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg' class='helpdesk-img aside_dropdown_icon'>" +
"</li>" +

"<li data-nav-id='./Settings/' class='sidelist dropdown_romove_dot'>" +
  "<ul class='sidenavSub-topics aside_dropdown_list active'>" +

    "<li data-nav-id='../Autonumbering' title='Contract Auto Numbering' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/autonumbering/#ContractAuto'>Contract Auto Numbering</a>" +
    "</li>" +

    "<li data-nav-id='../Autonumbering' title='Request Auto Numbering' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/autonumbering/#RequestAuto'>Request Auto Numbering</a>" +
    "</li>" +

    "<li data-nav-id='../Autonumbering' title='Review Auto Numbering' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/autonumbering/#ReviewAuto'>Review Auto Numbering</a>" +
    "</li>" +

    "<li data-nav-id='../Autonumbering' title='Consult Auto Numbering' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/autonumbering/#ConsultAuto'>Consult Auto Numbering</a>" +
    "</li>" +

  "</ul>" +
"</li>"+


    // 3) General Settings (no dropdown)
  // General Settings
"<li data-nav-id='./general/' title='General Settings' class='dropdownicon sidelist'>" +
  "<a class='qwe' href='/contract-management/modern/admin/settings/general/'>General Settings</a>" +
  "<img src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg' class='helpdesk-img aside_dropdown_icon'>" +
"</li>" +

"<li data-nav-id='./Settings/' class='sidelist dropdown_romove_dot'>" +
  "<ul class='sidenavSub-topics aside_dropdown_list active'>" +

    "<li data-nav-id='../General' title='Date Format' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/general/#Date-Format'>Date Format</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Theme' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/general/#Theme'>Theme</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Sample Dashboard Data' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/general/#Sample-Dashboard-Data'>Sample Dashboard Data</a>" +
    "</li>" +
    "<li data-nav-id='../General' title='currency separator' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/general/#currency-separator'>Currency Separator</a>" +
    "</li>" +
    "<li data-nav-id='../General' title='Use Sharepoint URL for MS Teams installed application' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/general/#SharepointURL'>Use Sharepoint URL for MS Teams installed application</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Sample Contract/Request Data' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/general/#Sample-Contract-Data'>Sample Contract/Request Data</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Home Dashboard Theme' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/general/#Home-Dashboard-Theme'>Home Dashboard Theme</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='CLM365 Favicon' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/general/#CLM365-Favicon'>CLM365 Favicon</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='GCC Tenant' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/general/#GCC-Tenant'>GCC Tenant</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Expiring Contract' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/general/#Expiring-Contract'>Expiring Contract</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Enable Logs' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/general/#Enable_Logs'>Enable Logs</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Logs Types' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/general/#Logs_Type'>Logs Types</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Languages' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/general/#Languages'>Languages</a>" +
    "</li>" +

    "<li data-nav-id='../General' title='Brand Logo' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/general/#brand-logo'>Brand Logo</a>" +
    "</li>" +

  "</ul>" +
"</li>"+


    // 4) Notifications (no dropdown)
  // Notifications
"<li data-nav-id='./notifications/' title='Notifications' class='dropdownicon sidelist'>" +
  "<a class='qwe' href='/contract-management/modern/admin/settings/notification/'>Notifications</a>" +
  "<img src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg' class='helpdesk-img aside_dropdown_icon'>" +
"</li>" +

"<li data-nav-id='./Settings/' class='sidelist dropdown_romove_dot'>" +
  "<ul class='sidenavSub-topics aside_dropdown_list active'>" +

    "<li data-nav-id='../Notifications' title='Email Templates' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/notification/#email-template'>Email Templates</a>" +
    "</li>" +

   
    "<li data-nav-id='../Notifications' title='Email Tracker' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/notification/#_email_tracker'>Email Tracker</a>" +
    "</li>" +

  "</ul>" +
"</li>"
+

    // 5) Features (no dropdown)
   "<li data-nav-id='./features/' title='Features' class='dropdownicon sidelist'>" +
  "<a class='qwe' href='/contract-management/modern/admin/settings/features/'>Features</a>" +
  "<img src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg' class='helpdesk-img aside_dropdown_icon'>" +
"</li>" +

"<li data-nav-id='./Settings/' class='sidelist dropdown_romove_dot'>" +
  "<ul class='sidenavSub-topics aside_dropdown_list active'>" +

    "<li data-nav-id='../Features' title='Business Unit' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/features/#business-unit'>Business Unit</a>" +
    "</li>" +

    "<li data-nav-id='../Features' title='Request, Contract Settings' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/features/#request-contract-settings'>Request, Contract Settings</a>" +
    "</li>" +

    "<li data-nav-id='../Features' title='Linked Contracts' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/features/#LinkedContractsGuide'>Linked Contracts</a>" +
    "</li>" +

    "<li data-nav-id='../Features' title='Deviation' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/features/#deviation'>Deviation</a>" +
    "</li>" +

    "<li data-nav-id='../Features' title='Risk' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/features/#risk'>Risk</a>" +
    "</li>" +

    "<li data-nav-id='../Features' title='Word Add-In' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/features/#word-addin'>Word Add-In</a>" +
    "</li>" +

    "<li data-nav-id='../Features' title='Review Consult Settings' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/features/#review-consult-settings'>Review Consult Settings</a>" +
    "</li>" +

    "<li data-nav-id='../Features' title='SharePoint Page Configuration' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/features/#sharepoint-page-configuration'>SharePoint Page Configuration</a>" +
    "</li>" +

    "<li data-nav-id='../Features' title='Custom Fields' class='sidelist'>" +
      "<a class='qwe' href='/contract-management/modern/admin/settings/features/#custom-fields'>Custom Fields</a>" +
    "</li>" +

  "</ul>" +
"</li>"+


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

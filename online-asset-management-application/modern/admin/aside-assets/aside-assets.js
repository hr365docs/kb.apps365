$(document).ready(function() {
    $("#asset-asidebar").html("");
    $("#asset-asidebar").append(
    "<li data-nav-id='./Settings/' title='Introduction' class='sidelist'>"+
    "<a href='/online-asset-management-application/modern/admin/introduction/'>Introduction </a>"+
    "</li>"+
    "<li data-nav-id='./Settings/' title='Architecture Diagram' class='sidelist'>"+
    ""+
    "<a href='/online-asset-management-application/modern/admin/architecture-diagram/'> Architecture Diagram </a>"+
    "</li>"+
    "<li data-nav-id='./Settings/' title='Home Page' class='sidelist'>"+
    "<a href='/online-asset-management-application/modern/admin/home-page/'> Home Page </a>"+
    "</li>"+

    
    "<li class='dropdownicon sidelist' title='Assets'>"+
     "<a + href='/online-asset-management-application/modern/admin/assets/'> Assets </a>"+
     "<img   class='helpdesk-img aside_dropdown_icon' src='/online-asset-management-application/modern/user/amm-user-assets/down-arrow-svgrepo-com.svg'>"+
     "</li>"+
     
     "<li data-nav-id='./Settings/'   class='sidelist dropdown_romove_dot'>"+
     "<ul class='sidenavSub-topics aside_dropdown_list'>"+
       "<li data-nav-id='./Email-Notification/' title='Add Assets' class='sidelist'>"+
       "<a href='/online-asset-management-application/modern/admin/assets/#add-assets'>Add Asset</a>"+
        "</li>"+
        "<li data-nav-id='./Custom-Emails/' title='Multiple Assets' class='sidelist'> "+
        "<a href='/online-asset-management-application/modern/admin/assets/#Multiple-assets'>Multiple Assets</a>"+
        " </li>"+
        "<li data-nav-id='./Custom-Emails/' title='Bulk Assets' class='sidelist'> "+
        "<a href='/online-asset-management-application/modern/admin/assets/#bulk-assets'>Bulk Assets</a>"+
        " </li>"+
        // "<li data-nav-id='./Custom-Emails/' title='Bulk Assets' class='sidelist'> "+
        // "<a href='/online-asset-management-application/modern/admin/assets/#multiple-assets'>Bulk Assets</a>"+
        // " </li>"+
         "<li data-nav-id='./User/' title='Assign_Assets' class='sidelist'>"+
         "<a href='/online-asset-management-application/modern/admin/assets/#assign-assets'>Assign Assets</a>"+
         " </li>"+
         " <li data-nav-id='./General-Settings/' title='Return Assets' class='sidelist'>"+
          "<a href='/online-asset-management-application/modern/admin/assets/#return-assets'>Return Assets </a>"+
          " </li>"+
          " <li data-nav-id='./General-Settings/' title='Book Assets' class='sidelist'>"+
          "<a href='/online-asset-management-application/modern/admin/assets/#book-assets'>Book Assets </a>"+
          " </li>"+
           "<li data-nav-id='./Dashboard-Settings/' title='Booking Details' class='sidelist'>"+
           "<a href='/online-asset-management-application/modern/admin/assets/#booking-details'> Booking Details</a>"+
            "</li>"+
            "<li data-nav-id='./Dashboard-Settings/' title='Approve/Reject Assets' class='sidelist'>"+
            "<a href='/online-asset-management-application/modern/admin/assets/#approve-reject-assets'> Approve/Reject Assets</a>"+
            "</li>"+
              "</ul>"+
              "</li>"+
           
              "<li class='dropdownicon sidelist' title='Inventory'>"+
               "<a  href='/online-asset-management-application/modern/admin/consumable/'> Inventory </a>"+
               "<img   class='helpdesk-img aside_dropdown_icon' src='/online-asset-management-application/modern/user/amm-user-assets/down-arrow-svgrepo-com.svg'>"+
               "</li>"+

               "<li data-nav-id='./Settings/'   class='sidelist dropdown_romove_dot'>"+
               "<ul class='sidenavSub-topics aside_dropdown_list'>"+
                "<li data-nav-id='./Dashboard-Settings/' title='Add Inventory Item' class='sidelist'>"+
                "<a href='/online-asset-management-application/modern/admin/consumable/#add-consumable-item'>Add Inventory Item</a>"+
                 "</li>"+
                 "<li data-nav-id='./Column-Setting/' title='Bulk Consumable' class='sidelist'>"+
                 "<a href='/online-asset-management-application/modern/admin/consumable/#bulk-consumable'>Bulk Inventory</a>"+
                 "</li>"+
                 "<li data-nav-id='./Dashboard-Settings/' title='Assign Inventory' class='sidelist'>"+
                 "<a href='/online-asset-management-application/modern/admin/consumable/#consumable-items'> Assign Inventory</a>"+
                  "</li>"+
                  "<li data-nav-id='./Dashboard-Settings/' title='Assigned' class='sidelist'>"+
                 "<a href='/online-asset-management-application/modern/admin/consumable/#Assigned'>Assigned</a>"+
                  "</li>"+
                 "<li data-nav-id='./Dashboard-Settings/' title='Bulk Assign Inventory' class='sidelist'>"+
                 "<a href='/online-asset-management-application/modern/admin/consumable/#request-consumable'> Bulk Assign Inventory</a>"+
                  "</li>"+
                  "<li data-nav-id='./Dashboard-Settings/' title='Approve/Reject Inventory' class='sidelist'>"+
                  "<a href='/online-asset-management-application/modern/admin/consumable/#approve-reject-consumable'> Approve/Reject Inventory </a>"+
                  "</li>"+
                  "</ul>"+
  "</li>"+

                   "<li data-nav-id='./Software/' title='Software' class='sidelist'>"+
                    "<a href='/online-asset-management-application/modern/admin/software/'> Software </a>"+
                    "</li>"+

                   
                    "<li class='dropdownicon sidelist' title='Settings'>"+
                    "<a class='qwe' href='/online-asset-management-application/modern/admin/settings/'>Settings</a>"+
                    "<img class='helpdesk-img aside_dropdown_icon_setting' src='/online-asset-management-application/modern/user/amm-user-assets/down-arrow-svgrepo-com.svg'>"+
                    "</li>"+
            
                   "<li data-nav-id='./Settings/'   class='sidelist dropdown_romove_dot'>"+
                    "<ul class='sidenavSub-topics aside_dropdown_list_setting'>"+
            
                    "<li class='dropdownicon sidelist'>"+
                    "<a class='qwe' href='/online-asset-management-application/modern/admin/settings/general/'>General</a>"+
                    "<img  class='helpdesk-img aside_dropdown_icon' src='/online-asset-management-application/modern/user/amm-user-assets/down-arrow-svgrepo-com.svg'>"+
                    "</li>"+
                    "<li data-nav-id='./User/'  title=General  class='sidelist dropdown_romove_dot'>"+
                    "<ul class='sidenavSub-topics aside_dropdown_list'>"+
            
                    "<li data-nav-id='./General-Settings/' title='API Permissions' class='sidelist'>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/general/#api-permissions'>API Permissions</a>"+
                    "</li>"+
                    "<li data-nav-id='./Email-Notification/' title='Currency' class='sidelist'>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/general/#currency'>Currency</a>"+
               
                    "</li><li data-nav-id='./Column-Setting/' title='Date Format' class='sidelist'>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/general/#date-format'>Date Format</a>"+
                    "</li>"+
                    "<li data-nav-id='./Dashboard-Settings/' title='Asset ID Prefix' Help Page class='sidelist'>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/general/#asset-id-prefix'>Asset ID Prefix</a>"+
                    "</li>"+
                   
                    "<li data-nav-id='./Custom-Emails/' title='First Asset ID' class='sidelist'>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/general/#first-asset-id'>First Asset ID</a>"+
                    "</li>"+
                    // "<li data-nav-id='./Assign-Assets/' title='Organization Name' class='sidelist'>"+
                    // "<a href='/online-asset-management-application/modern/admin/settings/general/#organization-name'>Organization Name</a>"+
                    // "</li>"+
                    "<li data-nav-id='./Dashboard-Settings/' title='Email Template' class='sidelist'>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/general/#email-template'>Email Template</a>"+
                    "</li>"+
                    "<li data-nav-id='./Dashboard-Settings/' title='Email Notifications' class='sidelist'>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/general/#email-notifications'>Email Notifications</a>"+
                    "</li>"+
                    "<li data-nav-id='./Dashboard-Settings/' title='Naming Conventions' class='sidelist'>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/general/#Naming-Conventions'>Naming Conventions</a>"+
                    "</li>"+
                   
                    "</li>"+
                    "</li>"+
                    "</ul>"+
            
                   
                    "<li class='dropdownicon sidelist' title='Views'>"+
                    "<a class='qwe' href='/online-asset-management-application/modern/admin/settings/views'>Views</a>"+
                    "<img  class='helpdesk-img aside_dropdown_icon' src='/online-asset-management-application/modern/user/amm-user-assets/down-arrow-svgrepo-com.svg'>"+
                    "</li>"+
            
                    "<li data-nav-id='../Admin-Guide/Administration/' title='Theme' class='sidelist dropdown_romove_dot'>"+
                    "<ul class='sidenavSub-topics aside_dropdown_list'>"+
                    "<li data-nav-id='./Assign-Assets/' title='Theme' class='sidelist'>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/views/#theme'>Theme</a>"+
                    "</li>"+
                    "<li data-nav-id='./Assign-Assets/' title=Projects While Assigning Assets class='sidelist'>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/views/#projects-while-assigning-assets'>Projects While Assigning Assets</a>"+
                    "</li>"+
                    // "<li data-nav-id='./Assign-Assets/' title=Side Navigation Panel class='sidelist'>"+
                    // "<a href='/online-asset-management-application/modern/admin/settings/views/#side-navigation-panel'>Side Navigation Panel</a>"+
                    // "</li>"+
                    // "<li data-nav-id='./Assign-Assets/' title=WebPart Title class='sidelist'>"+
                    // "<a href='/online-asset-management-application/modern/admin/settings/views/#webpart-title'>WebPart Title </a>"+
                    // "</li>"+
                    "<li data-nav-id='./Assign-Assets/' title='Hide Asset ID Prefix' class='sidelist'>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/views/#Hide-Asset-ID-Prefix'>Hide Asset ID Prefix </a>"+
                    "</li>"+
                    "<li data-nav-id='./Assign-Assets/' title='Language' class='sidelist'>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/views/#Language'>Language </a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Assign Assets and Return Assets Options' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/views/#assign-assets-and-return-assets-options'>Assign Assets and Return Assets Options</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Sample Data In Dashboard' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/views/#Sample'>Sample Data In Dashboard</a>"+
                    "<li data-nav-id='./Add Assets/ ' title='Column Views' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/views/#column-views'>Column Views</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Sharepoint Page Views' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/views/#Sharepoint-Page-Views'>Sharepoint Page Views</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Dashboard Views' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/views/#dashboard-views'>Dashboard Views</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Brand Logo' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"
                   +
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/views/#brand-logo'>Brand Logo</a>"+
                    "</li>"+
                 
                    "</ul>"+
                    "</li>"+
            
                    
                    "<li class='dropdownicon sidelist'title='Users/Roles/Permissions' >"+
                    "<a class='qwe' href='/online-asset-management-application/modern/admin/settings/role/'>Users, Roles, Permissions</a>"+
                    "<img  class='helpdesk-img aside_dropdown_icon' src='/online-asset-management-application/modern/user/amm-user-assets/down-arrow-svgrepo-com.svg'>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/'  class='sidelist dropdown_romove_dot'>"+
                    "<ul class='sidenavSub-topics aside_dropdown_list'>"+
                    "<li data-nav-id='./Assign-Assets/ ' title='Users' class='sidelist '>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/role/#users'>Users</a>"+
                    "<li data-nav-id='./Assign-Assets/ ' title='Asset Manager to Add Assets' class='sidelist '>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/role/#asset-manager-to-add-assets'>Asset Manager to Add Assets</a>"+
                    "</li>"+
                    "<li data-nav-id='./Assign-Assets/' title='Asset Manager to Delete Assets' class='sidelist'>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/role/#asset-manager-to-delete-assets'>Asset Manager to Delete Assets</a>"+
                    "</li>"+
                    "<li data-nav-id='./Assign-Assets/' title='User to Book Assets' class='sidelist'>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/role/#user-to-book-assets'>User to Book Assets</a>"+
                    "</li>"+
                    "<li data-nav-id='./Assign-Assets/ ' title='User to Select Approver to Book Assets' class='sidelist '>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/role/#allow-user-to-select-approver'>Allow User to Select Approver</a>"+
                    "</li>"+
                    "<li data-nav-id='./Assign-Assets/ ' title='User to Select Approver to Book Assets' class='sidelist '>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/role/#Allow-Users-to-Return-Assets'>Allow Users to Return Assets</a>"+
                    "</li>"+
                    "</ul>"+
                    "</li>"+
            
                   
                    "<li class='dropdownicon sidelist' title='Integrations'>"+
                    "<a class='qwe'  href='/online-asset-management-application/modern/admin/settings/integration/'>Integrations</a>"+
                    "<img  class='helpdesk-img aside_dropdown_icon' src='/online-asset-management-application/modern/user/amm-user-assets/down-arrow-svgrepo-com.svg'>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ '  class='sidelist dropdown_romove_dot'>"+
                    "<ul class='sidenavSub-topics aside_dropdown_list'>"+
                    "<li data-nav-id='./Assign-Assets/ ' title='Intune' class='sidelist '>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/integration/#intune'>Intune</a>"+
                    "<li data-nav-id='./Add Assets/ ' title='MS Intune Filter' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/integration/#ms-intune'>MS Intune Filter</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='MS Intune Filter' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/integration/#Customized-Platform-Title'>Customized Platform Title</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='SCCM Integration' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/integration/#SCCM-integration'>SCCM Integration</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Alloc8 Integration' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/integration/#alloc8-integration'>Alloc8 Integration</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Kace Integration' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/integration/#kace-integration'>Kace Integration</a>"+
                    "</li>"+
                    "</li>"+
                    
                  
                    // "<li data-nav-id='./Add Assets/ ' title='Integrate with HR365 Asset Management' class='sidelist '>"+
                    // "<ul class='sidenavSub-topics '>"+
                    // "</ul>"+
                    // "<a href='/online-asset-management-application/modern/admin/settings/integration/#integrate'>Integrate with HR365 Asset Management</a>"+
                    "</li>"+
                    "</ul>"+
                    "</li>"+
            
                   
                    
                    
                    "<li class='dropdownicon sidelist' title='Features'>"+
                    "<a class='qwe' href='/online-asset-management-application/modern/admin/settings/features/'>Features</a>"+
                    "<img  class='helpdesk-img aside_dropdown_icon' src='/online-asset-management-application/modern/user/amm-user-assets/down-arrow-svgrepo-com.svg'>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ '  class='sidelist dropdown_romove_dot'>"+
                    "<ul class='sidenavSub-topics aside_dropdown_list'>"+
                    "<li data-nav-id='./Assign-Assets/ ' title='Depreciation Method' class='sidelist '>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#depreciation-method'>Depreciation Method</a>"+
                    "<li data-nav-id='./Assign-Assets/ ' title='Depreciation Method' class='sidelist '>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#Default-camera-scanner'>Default camera scanner for edit assets</a>"+
                    "<li data-nav-id='./Assign-Assets/ ' title='Depreciation Settings' class='sidelist '>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#Depreciation-Settings'>Depreciation Settings</a>"+
                    "<li data-nav-id='./Add Assets/ ' title='System Generated Barcode' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#Configure-Barcode-Field'>Configure-Barcode-Field(s)</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='System Generated Barcode' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#system-generated-barcode'>System Generated Barcode</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='External User'class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#external-user'>External User</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Retain Asset's Last Location' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#retain-assets-last-location'>Retain Asset's Last Location</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Assign Assets to Location' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#assign-assets-to-location'>Assign Assets to Location</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Assign Assets to Non M365 Users' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#assign-assets-to-Non-M365-users'>Assign Assets to Non M365 Users</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Advance Booking of Assets' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#advance-booking-of-assets'>Advance Booking of Assets</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Software' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#software'>Software</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Software' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#Hide-the-Assign-and-Return-Assets-in-Home-Page'>Hide the Assign and Return Assets in Home Page</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Software' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#Hide/Show-Thumbnail'>Hide/Show Thumbnail</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Quick Action' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#quick-action'>Quick Action</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Show Only User Asset in Asset Acknowledgement' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#Show-Only-User-Asset-Asset-Acknowledgement'>Show Only User Asset in Asset Acknowledgement</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Hide And Show Dashboard' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#hide_and_show_dashboard'>Hide And Show Dashboard</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Quick Action' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#GCC-Tenant'>GCC Tenant</a>"+
                    "</li>"+
                    
                    "<li data-nav-id='./Add Assets/ ' title='Asset's Location' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#assets-location'>Asset's Location</a>"+
                    "<li data-nav-id='./Add Assets/ ' title='Camera Scanner' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#camera-scanner'>Camera Scanner</a>"+
                    "<li data-nav-id='./Add Assets/ ' title='Make Category and Subcategory Static' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#make_category_subcategory_static'>Make Category and Subcategory Static</a>"+
                    "<li data-nav-id='./Add Assets/ ' title='Consumable Module' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#consumable-module'>Inventory Module</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Inventory Module Title Text' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#inventory_module_title_text'>Inventory Module Title Text</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Enable logs collection' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#Enable_Logs'>Enable logs collection</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title=Logs Types' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#Logs_Type'>Logs Types</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Maintenance Module' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#maintenance-module'>Maintenance Module</a>"+
                    "</li>"+
                    "<li data-nav-id='./Add Assets/ ' title='Advance Booking Filter' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#advance_booking_filter'>Advance Booking Filter</a>"+
                    "</li>"+
                   
                    "<li data-nav-id='./Add Assets/ ' title='Asset Acknowledgement' class='sidelist '>"+
                    "<ul class='sidenavSub-topics '>"+
                    "</ul>"+
                    "<a href='/online-asset-management-application/modern/admin/settings/features/#asset-acknowledgement'>Asset Acknowledgement</a>"+
                    "</li>"+
                    "</li>"+
                    "</li>"+
                    "</ul>"+
                    "</ul>"+
                    "</li>"+
                    "</ul>"+
                       "<li class='dropdownicon sidelist' title='Administration'>"+
                        "<a  href='/online-asset-management-application/modern/admin/administration/'> Administration </a>"+
                        "<img   class='helpdesk-img aside_dropdown_icon'  src='/online-asset-management-application/modern/user/amm-user-assets/down-arrow-svgrepo-com.svg'>"+
                        "</li>"+
                        "<li data-nav-id='./Settings/'  class='sidelist dropdown_romove_dot'>"+
                        "<ul class='sidenavSub-topics aside_dropdown_list'>"+
                       
                         "<li data-nav-id='./User/' title='Custom Columns' class='sidelist'>"+
                         "<a href='/online-asset-management-application/modern/admin/administration/#custom-columns'>Custom Columns</a>"+
                         "</li>"+
                         "<li data-nav-id='./User/' title='Custom Columns' class='sidelist'>"+
                         "<a href='/online-asset-management-application/modern/admin/administration/#custom-Form'>Custom Form</a>"+
                         "</li>"+
                         "<li data-nav-id='./Email-Notification/' title='Add Assets' class='sidelist'>"+
                         "<a href='/online-asset-management-application/modern/admin/administration/#add-assets'> Add Assets </a>"+
                          "</li>"+
                         "<li data-nav-id='./Custom-Emails/' title='Add Status' class='sidelist'>"+
                         "<a href='/online-asset-management-application/modern/admin/administration/#add-status'>Add Status</a>"+
                         "</li>"+
                         "<li data-nav-id='./Column-Setting/' title='Add_Asset_Type' class='sidelist'>"+
                         "<a href='/online-asset-management-application/modern/admin/administration/#add-asset-type'>Add Asset Type</a>"+
                         "</li>"+
                         "<li data-nav-id='./Dashboard-Settings/' title='Add_Project' class='sidelist'>"+
                         "<a href='/online-asset-management-application/modern/admin/administration/#add-project'>Add Project</a>"+
                          "</li>"+
                         "<li data-nav-id='./Dashboard-Settings/' title='Add Model Number' class='sidelist'>"+
                         "<a href='/online-asset-management-application/modern/admin/administration/#add-model-number'>Add Model Number</a>"+ 
                         "</li>"+
                         "<li data-nav-id='./Dashboard-Settings/' title='Add Vendor' class='sidelist'>"+
                         "<a href='/online-asset-management-application/modern/admin/administration/#add-vendor'>Add Vendor</a>"+
                         "</li>"+
                         "<li data-nav-id='./Dashboard-Settings/' title='Add_Catagory' class='sidelist'>"+
                         "<a href='/online-asset-management-application/modern/admin/administration/#add-catagory'>Add Category</a>"+ 
                         "</li>"+
                         "<li data-nav-id='./Dashboard-Settings/' title='Add Sub Category' class='sidelist'>"+
                         "<a href='/online-asset-management-application/modern/admin/administration/#add-sub-catagory'>Add Sub Cateogry</a>"+ 
                         "</li>"+
                        "<li data-nav-id='./Dashboard-Settings/' title='Add Location' class='sidelist'>"+
                         "<a href='/online-asset-management-application/modern/admin/administration/#add-location'>Add Location</a>"+
                          "</li>"+
                        "<li data-nav-id='./Dashboard-Settings/' title='Add Sub Location' class='sidelist'>"+
                         "<a href='/online-asset-management-application/modern/admin/administration/#add-sub-location'>Add Sub Location</a>"+
                          "</li>"+
                          "<li data-nav-id='./Dashboard-Settings/' title='Add_Pickup_Location' class='sidelist'>"+
                          "<a href='/online-asset-management-application/modern/admin/administration/#add-pickup-location'>Add Pickup Location</a>"+
                           "</li>"+
                          //  "<li data-nav-id='./Dashboard-Settings/' title='Add Search Index' class='sidelist'>"+
                          //  "<a href='/online-asset-management-application/modern/admin/administration/#add-search-index'>Add Search Index</a>"+
                          //   "</li>"+
                            "<li data-nav-id='./Dashboard-Settings/' title='Add Deleted Assets' class='sidelist'>"+
                            "<a href='/online-asset-management-application/modern/admin/administration/#add-deleted-assets'>Add Deleted Assets</a>"+
                            "</li>"+
                            "<li data-nav-id='./Dashboard-Settings/' title='Add Acknowledgment Status' class='sidelist'>"+
                            "<a href='/online-asset-management-application/modern/admin/administration/#acknowledgement-status'>Add Acknowledgment Status</a>"+
                             "</li>"+
                            //  "<li data-nav-id='./Dashboard-Settings/' title='Add Equipments' class='sidelist'>"+
                            //  "<a href='/online-asset-management-application/modern/admin/administration/#add-equipments'>Add Equipments</a>"+ 
                            // "</li>"+
                             "</ul>"+
                             "</li>"+

                             "<li data-nav-id='./Report/' title='Report' class='sidelist'>"+ 
                             "<a href='/online-asset-management-application/modern/admin/report/'> Report </a>"+
                             "</li>"+
                             "<li data-nav-id='./Audit-log/' title='Audit log' class='sidelist'>"+ 
                             "<a href='/online-asset-management-application/modern/admin/audit-log/'> Audit log </a>"+
                             "</li>"+
                             "<li data-nav-id='./Dashboard/' title='Dashboard' class='sidelist'>"+ 
                             "<a href='/online-asset-management-application/modern/admin/dashboard/'> Dashboard </a>"+
                             "</li>"+
                            //  "<li data-nav-id='./MS-Intune-Integration/' title='MS Intune Integration' class='sidelist'>"+
                            //   "<a href='/online-asset-management-application/modern/admin/ms-intune-integration/'> MS Intune Integration </a>"+
                            //   "</li>"+
                              // "<li data-nav-id='./MS-Intune-Integration/' title='API Permissions' class='sidelist'>"+
                              // "<a href='/online-asset-management-application/modern/admin/api-permissions/'>API Permissions</a>"+
                              // "</li>"+
                              // "<li data-nav-id='./Camera-Scanner/' title='Camera Scanner' class='sidelist'>"+
                              // "<a href='/online-asset-management-application/modern/admin/camera-scanner/'> Camera Scanner </a>"+
                              // "</li>"+
                              // "<li data-nav-id='./Barcode-Scanner/' title='Barcode Scanner' class='sidelist'>"+
                              //  "<a href='/online-asset-management-application/modern/admin/barcode-scanner/'> Barcode Scanner </a>"+
                              //  "</li>"+
                               "<li data-nav-id='./Depreciation/' title='Depreciation' class='sidelist'>"+
                                "<a href='/online-asset-management-application/modern/admin/depreciation/'> Depreciation </a>"+
                                "</li>"+
                              //   "<li data-nav-id='./Book-Assets/' title='Book Assets' class='sidelist'>"+
                              //   "<a href='/online-asset-management-application/modern/admin/book-assets/'> Book Assets </a>"+
                              //  "</li>"+
                                // "<li data-nav-id='./Software/' title='QR Code' class='sidelist'>"+
                                // "<a href='/online-asset-management-application/modern/admin/qr-code/'> QR Code </a>"+
                                // "</li>"+
                                "<li class='dropdownicon sidelist' title='Help'>"+
                                "<a + href='/online-asset-management-application/modern/admin/help/'> Help</a>"+
                                "<img   class='helpdesk-img aside_dropdown_icon' src='/online-asset-management-application/modern/user/amm-user-assets/down-arrow-svgrepo-com.svg'>"+
                                "</li>"+
                                
                                "<li data-nav-id='./Settings/'   class='sidelist dropdown_romove_dot'>"+
                                "<ul class='sidenavSub-topics aside_dropdown_list'>"+
                                  "<li data-nav-id='./Email-Notification/' title='Product Activation' class='sidelist'>"+
                                  "<a href='/online-asset-management-application/modern/admin/help/#product-activation'>Product Activation</a>"+
                                   "</li>"+
                                 
                                         "</ul>"+
                                         "</li>"
                                //          +
                                // "<li data-nav-id='./Software/' title='Help' class='sidelist'>"+
                                //  "<a href='/online-asset-management-application/modern/admin/help/'>Help</a>"+
                                //  "</li>"

                                 )
    

})

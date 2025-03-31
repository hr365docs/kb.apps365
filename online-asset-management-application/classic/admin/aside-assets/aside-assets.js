$(document).ready(function() {
    $("#asidebar").html("");
    $("#asidebar").append(
    "<li data-nav-id='./Settings/' title='Introduction' class='sidelist'>"+
    "<a href='/online-asset-management-application/classic/admin/introduction/'>Introduction </a>"+
    "</li>"+
    "<li data-nav-id='./Settings/' title='Architecture Diagram' class='sidelist'>"+
    ""+
    "<a href='/online-asset-management-application/classic/admin/architecture-diagram/'> Architecture Diagram </a>"+
    "</li>"+
    "<li data-nav-id='./Settings/' title='Home Page' class='sidelist'>"+
    "<a href='/online-asset-management-application/classic/admin/home-page/'> Home Page </a>"+
    "</li>"+

    
    "<li class='dropdownicon sidelist' title='Assets'>"+
     "<a + href='/online-asset-management-application/classic/admin/assets/'> Assets </a>"+
     "<img   class='helpdesk-img aside_dropdown_icon' src='/online-asset-management-application/classic/user/user-assets/down-arrow-svgrepo-com.svg'>"+
     "</li>"+
     
     "<li data-nav-id='./Settings/' title='Assets'  class='sidelist dropdown_romove_dot'>"+
     "<ul class='sidenavSub-topics aside_dropdown_list'>"+
       "<li data-nav-id='./Email-Notification/' title='Add Assets' class='sidelist'>"+
       "<a href='/online-asset-management-application/classic/admin/assets/#add-assets'>Add Asset</a>"+
        "</li>"+
        "<li data-nav-id='./Custom-Emails/' title='Bulk Assets' class='sidelist'> "+
        "<a href='/online-asset-management-application/classic/admin/assets/#bulk-assets'>Bulk Assets</a>"+
        " </li>"+
         "<li data-nav-id='./User/' title='Assign_Assets' class='sidelist'>"+
         "<a href='/online-asset-management-application/classic/admin/assets/#assign-assets'>Assign Assets</a>"+
         " </li>"+
         " <li data-nav-id='./General-Settings/' title='Return Assets' class='sidelist'>"+
          "<a href='/online-asset-management-application/classic/admin/assets/#return-assets'>Return Assets </a>"+
          " </li>"+
          
           "<li data-nav-id='./Dashboard-Settings/' title='Booking Details' class='sidelist'>"+
           "<a href='/online-asset-management-application/classic/admin/assets/#booking-details'> Booking Details</a>"+
            "</li>"+
            "<li data-nav-id='./Dashboard-Settings/' title='Approve/Reject Assets' class='sidelist'>"+
            "<a href='/online-asset-management-application/classic/admin/assets/#approve-reject-assets'> Approve/Reject Assets</a>"+
            "</li>"+
              "</ul>"+
              "</li>"+
           
              "<li class='dropdownicon sidelist' title='Consumable'>"+
               "<a + href='/online-asset-management-application/classic/admin/consumable/'> Consumable </a>"+
               "<img   class='helpdesk-img aside_dropdown_icon' src='/online-asset-management-application/classic/user/user-assets/down-arrow-svgrepo-com.svg'>"+
               "</li>"+

               "<li data-nav-id='./Settings/' title='Consumable'  class='sidelist dropdown_romove_dot'>"+
               "<ul class='sidenavSub-topics aside_dropdown_list'>"+
                "<li data-nav-id='./Dashboard-Settings/' title='Add Consumable Item' class='sidelist'>"+
                "<a href='/online-asset-management-application/classic/admin/consumable/#add-consumable-item'>Add Consumable Item</a>"+
                 "</li>"+
                 "<li data-nav-id='./Column-Setting/' title='Bulk Consumable' class='sidelist'>"+
                 "<a href='/online-asset-management-application/classic/admin/consumable/#bulk-consumable'>Bulk Consumable</a>"+
                 "</li>"+
                 "<li data-nav-id='./Dashboard-Settings/' title='Consumable Items' class='sidelist'>"+
                 "<a href='/online-asset-management-application/classic/admin/consumable/#consumable-items'> Consumable Items</a>"+
                  "</li>"+
                 "<li data-nav-id='./Dashboard-Settings/' title='Request Consumable Items' class='sidelist'>"+
                 "<a href='/online-asset-management-application/classic/admin/consumable/#request-consumable'> Request Consumable Items</a>"+
                  "</li>"+
                  "<li data-nav-id='./Dashboard-Settings/' title='Approve/Reject Consumable' class='sidelist'>"+
                  "<a href='/online-asset-management-application/classic/admin/consumable/#approve-reject-consumable'> Approve/Reject Consumable </a>"+
                  "</li>"+
                  "</ul>"+
  "</li>"+

                   "<li data-nav-id='./Software/' title='Software' class='sidelist'>"+
                    "<a href='/online-asset-management-application/classic/admin/software/'> Software </a>"+
                    "</li>"+

                   
                     "<li class='settings-dropdown sidelist' title='Settings'> "+
                     "<a + href='/online-asset-management-application/classic/admin/settings/'> Settings </a>"+
                     "<img   class='helpdesk-img aside_dropdown_icon' src='/online-asset-management-application/classic/user/user-assets/down-arrow-svgrepo-com.svg'>"+
                    "</li>"+

                   "<li data-nav-id='./Settings/' title='Settings'  class='sidelist dropdown_romove_dot'>"+
                   "<ul class='sidenavSub-topics aside_dropdown_list'>"+
                     "<li data-nav-id='./User/' title='User' class='sidelist'>"+
                     "<a href='/online-asset-management-application/classic/admin/settings/#user'>User</a>"+
                     "</li>"+
                     "<li data-nav-id='./General-Settings/' title='General Settings' class='sidelist'>"+
                     "<a href='/online-asset-management-application/classic/admin/settings/#general-setting'>General Settings</a>"+
                      "</li>"+
                     "<li data-nav-id='./Email-Notification/' title='Email Notification' class='sidelist'>"+
                     "<a href='/online-asset-management-application/classic/admin/settings/#email-notification'>Email Notification</a>"+ 
                     "</li>"+
                     "<li data-nav-id='./Custom-Emails/' title='Custom_Emails' class='sidelist'>"+ 
                     "<a href='/online-asset-management-application/classic/admin/settings/#custom-email'>Custom Emails</a>"+ 
                     "</li>"+
                     "<li data-nav-id='./Column-Setting/' title='Column Setting' class='sidelist'>"+
                     "<a href='/online-asset-management-application/classic/admin/settings/#column-setting'>Column Setting</a>"+
                     "</li>"+
                     "<li data-nav-id='./Dashboard-Settings/' title='Dashboard_Settings' class='sidelist'>"+
                     "<a href='/online-asset-management-application/classic/admin/settings/#dashboard-setting'>Dashboard Settings</a>"+
                      "</li>"+
                       "</ul>"+
                       "</li>"+

                       "<li class='dropdownicon sidelist' title='Administration'>"+
                        "<a  href='/online-asset-management-application/classic/admin/administration/'> Administration </a>"+
                        "<img   class='helpdesk-img aside_dropdown_icon'  src='/online-asset-management-application/classic/user/user-assets/down-arrow-svgrepo-com.svg'>"+
                        "</li>"+
                        "<li data-nav-id='./Settings/' title='Administration' class='sidelist dropdown_romove_dot'>"+
                        "<ul class='sidenavSub-topics aside_dropdown_list'>"+
                       
                         "<li data-nav-id='./User/' title='Custom Columns' class='sidelist'>"+
                         "<a href='/online-asset-management-application/classic/admin/administration/#custom-columns'>Custom Columns</a>"+
                         "</li>"+
                         "<li data-nav-id='./Email-Notification/' title='Add Assets' class='sidelist'>"+
                         "<a href='/online-asset-management-application/classic/admin/administration/#add-assets'> Add Assets </a>"+
                          "</li>"+
                         "<li data-nav-id='./Custom-Emails/' title='Add Status' class='sidelist'>"+
                         "<a href='/online-asset-management-application/classic/admin/administration/#add-status'>Add Status</a>"+
                         "</li>"+
                         "<li data-nav-id='./Column-Setting/' title='Add Asset Type' class='sidelist'>"+
                         "<a href='/online-asset-management-application/classic/admin/administration/#add-asset-type'>Add Asset Type</a>"+
                         "</li>"+
                         "<li data-nav-id='./Dashboard-Settings/' title='Add Project' class='sidelist'>"+
                         "<a href='/online-asset-management-application/classic/admin/administration/#add-project'>Add Project</a>"+
                          "</li>"+
                         "<li data-nav-id='./Dashboard-Settings/' title='Add Model Number' class='sidelist'>"+
                         "<a href='/online-asset-management-application/classic/admin/administration/#add-model-number'>Add Model Number</a>"+ 
                         "</li>"+
                         "<li data-nav-id='./Dashboard-Settings/' title='Add Vendor' class='sidelist'>"+
                         "<a href='/online-asset-management-application/classic/admin/administration/#add-vendor'>Add Vendor</a>"+
                         "</li>"+
                         "<li data-nav-id='./Dashboard-Settings/' title='Add Catagory' class='sidelist'>"+
                         "<a href='/online-asset-management-application/classic/admin/administration/#add-catagory'>Add Category</a>"+ 
                         "</li>"+
                         "<li data-nav-id='./Dashboard-Settings/' title='Add Sub Category' class='sidelist'>"+
                         "<a href='/online-asset-management-application/classic/admin/administration/#add-subcatagory'>Add Sub Cateogry</a>"+ 
                         "</li>"+
                        "<li data-nav-id='./Dashboard-Settings/' title='Add Location' class='sidelist'>"+
                         "<a href='/online-asset-management-application/classic/admin/administration/#add-location'>Add Location</a>"+
                          "</li>"+
                          "<li data-nav-id='./Dashboard-Settings/' title='Add Pickup Location' class='sidelist'>"+
                          "<a href='/online-asset-management-application/classic/admin/administration/#add-pickup-location'>Add Pickup Location</a>"+
                           "</li>"+
                           "<li data-nav-id='./Dashboard-Settings/' title='Add Search Index' class='sidelist'>"+
                           "<a href='/online-asset-management-application/classic/admin/administration/#add-search-index'>Add Search Index</a>"+
                            "</li>"+
                            "<li data-nav-id='./Dashboard-Settings/' title='Add Deleted Assets' class='sidelist'>"+
                            "<a href='/online-asset-management-application/classic/admin/administration/#add-deleted-assets'>Add Deleted Assets</a>"+
                            "</li>"+
                            "<li data-nav-id='./Dashboard-Settings/' title='Add Acknowledgment Status' class='sidelist'>"+
                            "<a href='/online-asset-management-application/classic/admin/administration/#acknowledgement-status'>Add Acknowledgment Status</a>"+
                             "</li>"+
                             "<li data-nav-id='./Dashboard-Settings/' title='Add Equipments' class='sidelist'>"+
                             "<a href='/online-asset-management-application/classic/admin/administration/#add-equipments'>Add Equipments</a>"+ 
                            "</li>"+
                             "</ul>"+
                             "</li>"+

                             "<li data-nav-id='./Report/' title='Report' class='sidelist'>"+ 
                             "<a href='/online-asset-management-application/classic/admin/report/'> Report </a>"+
                             "</li>"+
                             "<li data-nav-id='./Audit-log/' title='Audit log' class='sidelist'>"+ 
                             "<a href='/online-asset-management-application/classic/admin/audit-log/'> Audit log </a>"+
                             "</li>"+
                             "<li data-nav-id='./Dashboard/' title='Dashboard' class='sidelist'>"+ 
                             "<a href='/online-asset-management-application/classic/admin/dashboard/'> Dashboard </a>"+
                             "</li>"+
                             "<li data-nav-id='./MS-Intune-Integration/' title='Azure API Configuration' class='sidelist'>"+
                              "<a href='/online-asset-management-application/classic/admin/azure-api-configuration/'>Azure API Configuration </a>"+
                              "</li>"+
                              "<li data-nav-id='./Camera-Scanner/' title='Camera Scanner' class='sidelist'>"+
                              "<a href='/online-asset-management-application/classic/admin/camera-scanner/'> Camera Scanner </a>"+
                              "</li>"+
                              "<li data-nav-id='./Barcode-Scanner/' title='Barcode Scanner' class='sidelist'>"+
                               "<a href='/online-asset-management-application/classic/admin/barcode-scanner/'> Barcode Scanner </a>"+
                               "</li>"+
                               "<li data-nav-id='./Depreciation/' title='Depreciation' class='sidelist'>"+
                                "<a href='/online-asset-management-application/classic/admin/depreciation/'> Depreciation </a>"+
                                "</li>"+
                                "<li data-nav-id='./Book-Assets/' title='Book Assets' class='sidelist'>"+
                                "<a href='/online-asset-management-application/classic/admin/book-assets/'> Book Assets </a>"+
                               "</li>"+
                                "<li data-nav-id='./Software/' title='QR Code' class='sidelist'>"+
                                "<a href='/online-asset-management-application/classic/admin/qr-code/'> QR Code </a>"+
                                "</li>"+
                                "<li data-nav-id='./Software/' title='Help' class='sidelist'>"+
                                 "<a href='/online-asset-management-application/classic/admin/help/'>Help</a>"+
                                 "</li>")
    

})
// window.addEventListener("load", () => {

//     // new page add padding onclick js code
//     function getid() {
//         var baseUrl = (window.location).href;
//         var urlId = baseUrl.substring(baseUrl.lastIndexOf('#') + 1);
//         let getid = document.getElementsByTagName("div");
//         let getancher = document.getElementsByTagName("a");
//         let countlenght = getancher.length
//         for (let i = 0; i < countlenght; i++) {
//             if (getid.length > i) {
//                 if (urlId == getid[i].id) {
//                     let id = getid[i];
//                     id.classList.add("active")
//                     id.setAttribute("style", "padding-top:80px!important");
//                 }
//             }
//             // Active li in dropdown
//             if (getid[0].baseURI == getancher[i].href) {
//                 getancher[i].parentNode.classList.add("active")
//                 let ancherparent =getancher[i].parentElement;
//                 let activeItem = ancherparent.closest(".aside_dropdown_list");
//             // Active ul in dropdown
//                 if(activeItem){
//                     activeItem.classList.add("active");
//                     activeItem.setAttribute("style", "height:initial;opacity: 1;")

//                     let getperentclass = ancherparent.closest(".aside_dropdown_list_setting")
//                     if (getperentclass) {
//                         getperentclass.classList.add("active")
                        
//                     }
//                 } 
//             }
//         }
//     }
//     getid()

//     // common onclick scroll js code 
//     let commonscroll = document.querySelectorAll(".common-scroll")
//     let dropdowmperent = document.querySelectorAll(".aside_dropdown_list");
//     for (let i of dropdowmperent) {
//         let dropdowminneritem = i.querySelectorAll(".aside_dropdown_list li");
//         dropdowminneritem.forEach((element, index) => {
//             element.addEventListener("click", () => {
//                 for (let i of dropdowminneritem) {
//                     i.classList.remove("active")
//                     for (let j of commonscroll) {
//                         j.classList.remove("active")
//                         j.removeAttribute("style")
//                     }
//                 }
//                 element.classList.add("active")
//                 commonscroll[index].classList.add("active")
//                 commonscroll[index].setAttribute("style", "padding-top:80px!important")
//             })
//         })
//     }

//     // Dropdown js Code
//     let dropdowmitems = document.querySelectorAll(".aside_dropdown_icon");
//     let dropdowmlist = document.querySelectorAll(".aside_dropdown_list");

//     for(let i=0; i<dropdowmlist.length; i++){
//         if (dropdowmlist[i].getAttribute("style")=="height:initial;opacity: 1;") {
//             dropdowmitems[i].classList.add("active")
//         }
//     }

//     dropdowmitems.forEach((element, index) => {
//         element.addEventListener("click", () => {
//             let getheight = dropdowmlist[index].scrollHeight;
//             let dropdowmlistactive = document.querySelector(".aside_dropdown_list.active")
//             if (element.classList.contains("active")) {
//                 element.classList.remove("active");
//                 dropdowmlistactive.setAttribute("style", "height:0px;overflow:hidden;opacity:0;")
//             } else {
//                 for (let i of dropdowmitems) {
//                     i.classList.remove("active"); 
//                 }
//                 for (let j of dropdowmlist) {
//                     j.classList.remove("active");
//                     j.setAttribute("style", "height:0px;overflow:hidden;opacity:0;")
//                 }
//                 element.classList.add("active");
//                 localStorage.setItem("Dropdownstate",dropdowmlist[index])
//                 dropdowmlist[index].classList.add("active")
//                 dropdowmlist[index].setAttribute("style", `height:${getheight}px;opacity: 1;`)   
//             }
//         })
//     })


//     // Setting open dropdown js code
//     if (document.querySelector(".aside_dropdown_icon_setting")) {
//         let dropdownsetting = document.querySelector(".aside_dropdown_icon_setting");
//         let dropdownitemssetting = document.querySelector(".aside_dropdown_list_setting");
//         dropdownsetting.addEventListener("click", () => {
//             dropdownsetting.classList.toggle("active")
//             dropdownitemssetting.classList.toggle("active")
//         })
//     }

// })

$(document).ready(function() {
    $("#user-asidebar").html("");
    $("#user-asidebar").append(
        "<ul> <li data-nav-id='./installation/requirments/' title='Introduction' class='sidelist'>"+
        "<a href='/online-asset-management-application/modern/user/introduction/'> Introduction </a>"+
        "</li>"+
        // "<li data-nav-id='./Home-page' title='Getting Started' class='sidelist'>"+
        // "<a href='/online-asset-management-application/modern/user/getting-started/'> Getting Started </a>"+
        // "</li>"+
        "<li data-nav-id='./Home-page' title='Home Page' class='sidelist'>"+
        "<a href='/online-asset-management-application/modern/user/home-page/'> Home Page </a>"+
        "</li>"+

        "<li class='dropdownicon sidelist' title='User Interface'>"+
        "<a class='qwe' href='/online-asset-management-application/modern/user/user-interface/'> User Interface </a>"+
        "<img   class='imageIconmodernuser aside_dropdown_icon' src='/online-asset-management-application/modern/user/amm-user-assets/down-arrow-svgrepo-com.svg'>"+
        "</li>"+
        "<li data-nav-id='./installation/requirments/' title='User Interface' class='sidelist dropdown_romove_dot'>"+
        "<ul class='sidenavSub-topics aside_dropdown_list'>"+
          // "<li data-nav-id='../General' title='My Assets' class='sidelist'>"+
          //  "<a href='/online-asset-management-application/modern/user/user-interface/#my-assets'> My Assets </a>"+
          //   "</li>"+
            "<li data-nav-id='../General' title='Book Assets' class='sidelist'>"+
            "<a href='/online-asset-management-application/modern/user/user-interface/#book-assets'> Book Assets </a>"+
             "</li>"+
             "<li data-nav-id='../General' title='Booking Details' class='sidelist'>"+
             "<a href='/online-asset-management-application/modern/user/user-interface/#booking-details'> Booking Details </a>"+
              "</li>"+
              "</ul>"+
               "</li>"+
               "<li data-nav-id='./installation/requirments/' title='Help' class='sidelist'>"+
               "<a href='/online-asset-management-application/modern/user/help/'> Help </a>"+
                "</li>"+
                "</ul>"+
                "</li>")
})



$(document).ready(function () {
    $("#BTmodernadmin").html("");

    $("#BTmodernadmin").append(
         "<li data-nav-id='./Settings/' title='introduction' class='sidelist'>" +
        "<a href='/BookTime-365/modern/user/introduction/'>Introduction</a>" +
        "</li>" +
       

        "<li data-nav-id='./Settings/' title='Home' class='sidelist'>" +
        "<a href='/BookTime-365/modern/user/homepage/'>Home Page</a>" +
        "</li>" +

      
        "<li data-nav-id='./Settings/' title='Theme' class='sidelist'>" +
        "<a href='/BookTime-365/modern/user/theme/'>Theme</a>" +
        "</li>" +

        "<li class='dropdownicon sidelist' title='Help'>" +
        "<a href='/BookTime-365/modern/user/help/'>Help</a>" +
        "<img src='../../down-arrow-svgrepo-com.svg' class='imageIconadvanced aside_dropdown_icon'>" +
        "</li>" +

        "<li data-nav-id='../advanced/' title='Help' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list' id='btsettingedm'>" +
        "<li data-nav-id='../advanced/' title='Feedback' class='sidelist'>" +
        "<a href='/BookTime-365/modern/user/help/#feedback'>Feedback</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Product Activation' class='sidelist'>" +
        "<a href='/BookTime-365/modern/user/help/#product-activation'>Product Activation</a>" +
        "</li>" +
        "</ul>" +
        "</li>"
    );
});

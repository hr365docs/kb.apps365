$(document).ready(function () {
    $("#stockmodernuser").html("");

    $("#stockmodernuser").append(
        // ✅ Introduction
        "<li class='sidelist' data-nav-id='./Settings/' title='Introduction'>" +
            "<a href='/Stock365/modern/user/introduction/'>Introduction</a>" +
        "</li>" +

        // ✅ Home Page
        "<li class='sidelist' data-nav-id='./Settings/' title='Home Page'>" +
            "<a href='/Stock365/modern/user/homepage/'>Home Page</a>" +
        "</li>" +

      

           

        // ✅ Help
        "<li class='dropdownicon sidelist' title='Help'>" +
            "<a href='/Stock365/modern/user/help/'>Help</a>" +
            
        "</li>"
    );
});

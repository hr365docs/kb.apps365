$(document).ready(function () {
    $("#ideauser").html("");

    $("#ideauser").append(
        // ✅ Introduction
        "<li class='sidelist' data-nav-id='./Introduction/' title='Introduction'>" +
            "<a href='/idea-box-365/modern/user/introduction/'>Introduction</a>" +
        "</li>" +

        // ✅ Home Page
        "<li class='sidelist' data-nav-id='./Home/' title='Home Page'>" +
            "<a href='/idea-box-365/modern/user/homepage/'>Home Page</a>" +
        "</li>" +

        // ✅ Help
         "<li class='sidelist' data-nav-id='./Help' title='Home Page'>" +
            "<a href='/idea-box-365/modern/user/help/'>Help</a>" +
        "</li>" 
       
    );
});

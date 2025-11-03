$(document).ready(function () {
    $("#lmsmodernuser").html("");

    $("#lmsmodernuser").append( 
        "<li title='Introduction' class='sidelist'><a href='/LMS/modern/user/introduction/'>Introduction</a></li>"+
        "<li title='Home Page' class='sidelist'><a href='/LMS/modern/user/home/'>Home Page</a></li>"+
        "<li title='Theme' class='sidelist'><a href='/LMS/modern/user/Theme/'>Theme</a></li>"+
        "<li title='Help' class='sidelist'><a href='/LMS/modern/user/help/'>Help</a></li>"
    );

    // --- Highlight active menu based on URL ---
    var currentPath = window.location.pathname.toLowerCase();
    $("#lmsmodernuser a").each(function () {
        if (currentPath === $(this).attr("href").toLowerCase()) {
            $(this).parent("li").addClass("active");
        }
    });
});

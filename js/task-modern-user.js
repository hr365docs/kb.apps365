$(document).ready(function () {
    $("#taskmodernuser").html("");

    $("#taskmodernuser").append("<ul>" +
        // Introduction
        "<li data-nav-id='./installation/requirments/' title='Introduction' class='sidelist'>" +
        "<a href='/task-management-365/modern/user/introduction/'>" +
        "Introduction" +
        "</a>" +
        "</li>" +
       
        // Home Page
        "<li data-nav-id='./installation/requirments/' title='Home Page' class='sidelist'>" +
        "<a href='/task-management-365/modern/user/homepage/'>" +
        "Home Page" +
        "</a>" +
        "</li>" +
       
       
       
//theme
"<li data-nav-id='./installation/requirments/' title='theme' class='sidelist'>" +
        "<a href='/task-management-365/modern/user/theme/'>" +
        "Theme" +
        "</a>" +
        "</li>" +

        // Help
        "<li class='dropdownicon sidelist' title='Help'>" +
        "<a href='/task-management-365/modern/user/help/'>" +
        "Help" +
        "</a>" +
        "<img src='https://ik.imagekit.io/zn4au2jftpm5/hr365/down-arrow-avgrepo-com_TZAnDIIsES.svg?updatedAt=1717655767081' class='imageIconadvanced aside_dropdown_icon'>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Help' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
        "<li data-nav-id='../advanced/' title='Feedback' class='sidelist'>" +
        "<a href='/task-management-365/modern/user/help/#feedback'>Feedback</a>" +
        "</li>" +
        "<li data-nav-id='../advanced/' title='Product Activation' class='sidelist'>" +
        "<a href='/task-management-365/modern/user/help/#product-activation'>Product Activation</a>" +
        "</li>" +
        
        "</ul>" +
        "</li>" +
        "</ul>"
    );
});
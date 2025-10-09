$(document).ready(function() {
    $("#hdm-user-aside").html("");
    $("#hdm-user-aside").append(
    "<li data-nav-id='./Introduction/' title=Introduction class='sidelist'>"+
    "<a href='/sharepoint-helpdesk/modern/user/introduction/'>Introduction</a>"+
    "</li>"+
    
    "<li data-nav-id='./Home-Page/' title='Home Page'  class='sidelist'>"+
    "<a href='/sharepoint-helpdesk/modern/user/home-page/'>Home Page</a>"+
    "</li>"+

    "<li data-nav-id='../getting-started/' title='Theme' class='sidelist'>"+
    "<a href='/sharepoint-helpdesk/modern/user/theme/'>Theme</a>"+
    "</li>"+
    "<li data-nav-id='./User-Interface/' title='Help' class='sidelist'>"+
    "<a href='/sharepoint-helpdesk/modern/user/help/'>Help</a>"+
    "</li>");
})
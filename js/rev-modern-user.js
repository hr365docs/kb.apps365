$(document).ready(function () {
    $("#revuser").html("");

    $("#revuser").append(
        "<li data-nav-id='./user/' title='Introduction' class='sidelist'>" +
        "<a href='/Revenue365/modern/user/introduction/'>Introduction</a>" +
        "</li>" +
        "<li data-nav-id='./user/' title='Home Page' class='sidelist'>" +
        "<a href='/Revenue365/modern/user/homepage/'>Home Page</a>" +
        "</li>" +

        "<li data-nav-id='./user/' title='Buyers' class='sidelist'>" +
        "<a href='/Revenue365/modern/user/buyers/'>Buyers</a>" +
        "</li>" +

        "<li data-nav-id='./user/' title='Dashboard' class='sidelist'>" +
        "<a href='/Revenue365/modern/user/dashboard/'>Dashboard</a>" +
        "</li>" +

        "<li data-nav-id='./user/' title='Reports' class='sidelist'>" +
        "<a href='/Revenue365/modern/user/reports/'>Reports</a>" +
        "</li>" +

        "<li data-nav-id='./user/' title='Administration' class='sidelist'>" +
        "<a href='/Revenue365/modern/user/administration/'>Administration</a>" +
        "</li>" +

        "<li data-nav-id='./user/' title='Catalog' class='sidelist'>" +
        "<a href='/Revenue365/modern/user/catalog/'>Catalog</a>" +
        "</li>" +

        // "<li data-nav-id='./user/' title='Customer Journey' class='sidelist'>" +
        // "<a href='/Revenue365/modern/user/costomerjourney/'>Customer Journey</a>" +
        // "</li>" +

        "<li data-nav-id='./user/' title='Help' class='sidelist'>" +
        "<a href='/Revenue365/modern/user/help/'>Help</a>" +
        "</li>"
    );
});

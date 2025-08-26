$(document).ready(function () {
    $("#revmodernadmin").html("");

    $("#revmodernadmin").append(
        "<li data-nav-id='./Settings/' title='Introduction' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/introduction/'>Introduction</a>" +
        "</li>" +

        "<li data-nav-id='./Settings/' title='Architecture Diagram' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/architecture-diagram/'>Architecture Diagram</a>" +
        "</li>" +

        "<li data-nav-id='./Settings/' title='Home Page' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/homepage/'>Home Page</a>" +
        "</li>" +

         "<li data-nav-id='./Settings/' title='Buyers' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/buyers/'>Buyers</a>" +
        "</li>" +

         "<li data-nav-id='./Settings/' title='Dashboard' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/dashboard/'>Dashboard</a>" +
        "</li>" +

        "<li data-nav-id='./Settings/' title='Reports' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/reports/'>Reports</a>" +
        "</li>" +


        "<li data-nav-id='./Settings/' title='Administration' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/administration/'>Administration</a>" +
        "</li>" +

         "<li data-nav-id='./Settings/' title='Catalog' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/catalog/'>Catalog</a>" +
        "</li>" +

         "<li data-nav-id='./Settings/' title='Costomer ' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/costomerjourney/'>Customer Journey</a>" +
        "</li>" +

        // Settings with arrow
        "<li class='dropdownicon sidelist' title='Settings'>" +
        "<a class='qwe' href='/Revenue365/modern/admin/settings/'>Settings</a>" +
        "<img src='https://ik.imagekit.io/zn4au2jftpm5/hr365/down-arrow-avgrepo-com_TZAnDIIsES.svg?updatedAt=1717655767081' class='helpdesk-img aside_dropdown_icon_setting'>" +
        "</li>" +

        "<li data-nav-id='../system-settings' title='system-settings' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list_setting'>" +

        "<li data-nav-id='../user' title='General Setting' class='sidelist'>" +
        "<a class='qwe' href='/Revenue365/modern/admin/settings/generalsetting/'>General Settings</a>" +
        "</li>" +

        "<li data-nav-id='../user' title='Users' class='sidelist'>" +
        "<a class='qwe' href='/Revenue365/modern/admin/settings/users/'>Users</a>" +
        "</li>" +

        "<li data-nav-id='../user' title='Advance Settings' class='sidelist'>" +
        "<a class='qwe' href='/Revenue365/modern/admin/settings/Advancesettings/'>Advance Settings</a>" +
        "</li>" +

        "<li data-nav-id='../user' title='Notifications' class='sidelist'>" +
        "<a class='qwe' href='/Revenue365/modern/admin/settings/Notification/'>Notifications</a>" +
        "</li>" +

         "<li data-nav-id='../user' title='Integration' class='sidelist'>" +
        "<a class='qwe' href='/Revenue365/modern/admin/settings/integration/'>Integration</a>" +
        "</li>" +

        "<li data-nav-id='../user' title='Features' class='sidelist'>" +
        "<a class='qwe' href='/Revenue365/modern/admin/settings/features/'>Features</a>" +
        "</li>" +
        "</ul>" +
        "</li>" +

        // Help section (no arrow)
        "<li class='sidelist' title='Help'>" +
        "<a href='/Revenue365/modern/admin/help/'>Help</a>" +
        "</li>" +

        "<li data-nav-id='../advanced/' title='Help' class='sidelist dropdown_romove_dot'>" +
        "<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
        "<li data-nav-id='../advanced/' title='Configure SharePoint API permissions' class='sidelist'>" +
        "<a href='/Revenue365/modern/admin/help/#product-activation'>Product Activation</a>" +
        "</li>" +
        "</ul>" +
        "</li>"
    );
});

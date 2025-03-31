$(document).ready(function() {
    $(".edmsidenavadmin").html("");

    $(".edmsidenavadmin").append("<li data-nav-id='./installation/requirments/' title=Introduction class=sidelist adminitro>" +
        "<a class='gffgdfgd' href='/sharepoint-employee-directory/classic/admin/introduction/'>" +
        "Introduction" +
        "</a>" +
        "</li>" +
        "<li>" +
        "<li data-nav-id='https://github.com/hr365docs/My-project.git/installation/requirments/' title='Architecture Diagram' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/classic/admin/architecture-diagram/'>" +
        "Architecture Diagram" +
        "</a>" +
        "<li>" +
        "<li data-nav-id='https://github.com/hr365docs/My-project.git/installation/requirments/' title='Users' class=sidelist adminusers>" +
        "<a href='/sharepoint-employee-directory/classic/admin/user/'>" +
        "Users" +
        "</a>" +
        "</li>" +

        "<li class='dropdownicon sidelist' title='Settings'>"+
        "<a class='qwe' href='/sharepoint-employee-directory/classic/admin/settings/'>" +
        "<!-- <a href='#MainSettings'></a> -->" +
        "Settings" +
        "</a>" +
        "<img src='./down-arrow-svgrepo-com.svg'  class='imageIcon aside_dropdown_icon' '></img>"+
        "</li>"+

        "<li data-nav-id='./Setting/' title=Settings class='sidelist dropdown_romove_dot' onclick='hideshowdiv(event);'>" +

        "</li>" +
        "<li class='setting_side_nav_bar '>" +
        "<ul id='settingsadmin' class='aside_dropdown_list' value='/sharepoint-employee-directory/classic/admin/'>" +
        "<li data-nav-id='../General' title=General class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/classic/admin/settings/#general-setting'>" +
        "General" +
        "</a>" +
        "</li>" +
        "<li data-nav-id='../Exclude-Options/' title= 'Exclude Options' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/classic/admin/settings/#exclude-options'>" +
        "Exclude Options" +
        "</a>" +
        "</li>" +

        "<li data-nav-id='../views/' title=Views class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/classic/admin/settings/#view-setting'>" +
        "Views" +
        "</a>" +
        "</li>" +

        "<li data-nav-id='../advanced/' title=Advanced class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/classic/admin/settings/#advanced-setting'>" +
        "Advanced" +
        "</a>" +
        "</li>" +

        "<li data-nav-id='../advanced/' title='Azure API Configuration' class='sidelist'>" +
        "<a href='/sharepoint-employee-directory/classic/admin/settings/#azure-api-configuration'>" +
        "Azure API Configuration" +
        "</a>" +
        "</li>" +

        "</ul>" +
        "</li>")

});
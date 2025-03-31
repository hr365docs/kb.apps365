$(document).ready(function () {
    $("#tmpclassicadmin").html("");

    $("#tmpclassicadmin").append("<ul>"+
        "<li data-nav-id='../Introduction' title=Introduction class='sidelist'>"+
        "<a href='/employee-vacation-tracker-time-off-manager/classic/admin/introduction/'>"+
        "Introduction"+
        "</a>"+
        "</li>"+
        "<li data-nav-id='../Home-page' title=Home-page class=sidelist>"+
            "<a href='/employee-vacation-tracker-time-off-manager/classic/admin/home-page/'>"+
                "Home Page"+
            "</a>"+
            "</li>"+
        
        "<li data-nav-id='../ HR-actions' title= HR-actions class=sidelist>"+
        "<a href='/employee-vacation-tracker-time-off-manager/classic/admin/hr-actions/'>"+
           "HR actions"+
        "</a>"+
        "</li>"+
    
        "<li data-nav-id='../holidays' title=holidays class='sidelist'>"+
                "<a href='/employee-vacation-tracker-time-off-manager/classic/admin/holidays/'>"+
                    "Public Holidays"+
                "</a>"+
                "</li>"+
                
    
        "<li data-nav-id='../user' title=user class='sidelist'>"+
                    "<a href='/employee-vacation-tracker-time-off-manager/classic/admin/user/'>"+
                    "Users"+
                    "</a>"+
                    "</li>"+
    
        "<li data-nav-id='../user' title=user class='sidelist'>"+
                        "<a href='/employee-vacation-tracker-time-off-manager/classic/admin/reports/'>"+
                        "Reports"+
                        "</a>"+
                        "</li>"+
         

                        "<li class='dropdownicon sidelist'>"+
                        "<a class='qwe' href='/employee-vacation-tracker-time-off-manager/classic/admin/settings/'>"+
                        "System Settings"+
                        "</a>"+
                        "<img src='./down-arrow-svgrepo-com.svg'  class='imageIconmodernuser aside_dropdown_icon'>"+
                    "</li>"+


        "<li data-nav-id='../system-settings' title=system-settings class='sidelist dropdown_romove_dot'>"+
                        // "<div class='dropdownicon'>"+   
                        //     "<a class='qwe' href='/employee-vacation-tracker-time-off-manager/classic/admin/settings/'>"+
                        //     "System Settings"+
                        //     "</a>"+
                        //     "<img src='./down-arrow-svgrepo-com.svg'  class='imageIconmodernuser aside_dropdown_icon'>"+
                        //     "</div>"+
                            "<ul class='sidenavSub-topics aside_dropdown_list'>"+
                                "<li data-nav-id='../user' title=user class='sidelist'>"+
                                    "<a href='/employee-vacation-tracker-time-off-manager/classic/admin/settings/#organization'>"+
                                    "Organizations"+
                                    "</a>"+
                                    "</li>"+
                                    "<li data-nav-id='../user' title=user class='sidelist'>"+
                                        "<a href='/employee-vacation-tracker-time-off-manager/classic/admin/settings/#leave-type-settings'>"+
                                        "Leave Settings"+
                                        "</a>"+
                                        "</li>"+
                                        "<li data-nav-id='../user' title=user class='sidelist'>"+
                                            "<a href='/employee-vacation-tracker-time-off-manager/classic/admin/settings/#advance-settings'>"+
                                            "Advance Settings"+
                                            "</a>"+
                                            "</li>"+
                            "</ul>"+
                            "</li >"+
    
                            "<li data-nav-id='../user' title=user class='sidelist'>"+
                                "<a href='/employee-vacation-tracker-time-off-manager/classic/admin/help/'>"+
                               "Help"+
                                "</a>"+
              
                            "</li>"+
        "</ul>")
                                           
                                        });

                                        
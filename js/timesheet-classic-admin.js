$(document).ready(function () {
    $("#timesheetclassicadmin").html("");

    $("#timesheetclassicadmin").append( "<ul>"+
        "<li data-nav-id='./installation/requirments/' title=Introduction class=sidelist>"+
            "<a href='/online-timesheet-software/classic/admin/introduction/'>"+
            "Introduction"+
        "</a>"+  
        "</li>"+
        "<li data-nav-id='./installation/requirments/' title='Home page' class=sidelist>"+
            "<a href='/online-timesheet-software/classic/admin/home-page/'>"+
            "Home Page"+
        "</a>"+  
        "</li>"+

        "<li class='dropdownicon sidelist'>"+
        "<a class='qwe' href='/online-timesheet-software/classic/admin/timesheet/'>"+
        "Timesheet"+
        "</a>"+
        "<img src='./down-arrow-svgrepo-com.svg'  class='imageIconmodernuser aside_dropdown_icon'>"+
    "</li>"+

    "<li data-nav-id='./Setting/' title=Timesheet class='sidelist dropdown_romove_dot'>"+
    //     "<div class='dropdownicon'>"+
    // "<a class='qwe' href='/online-timesheet-software/classic/admin/timesheet/'>"+
    // "Timesheet"+
    // "</a>"+
    // "<img src='./down-arrow-svgrepo-com.svg'  class='imageIconmodernuser aside_dropdown_icon'>"+
    //     "</div>"+
    "<ul class='ml-15 sidenavSub-topics'>"+
        
        "</li>"+
        "<ul class='aside_dropdown_list'>"+
            "<li data-nav-id='../General' title='Weekly' class=sidelist>"+
                "<a href='/online-timesheet-software/classic/admin/timesheet/#weekly-timesheets'>"+
                  "Weekly Timesheets"+
                  "</a>"+
                  "</li>"+
                  "<li data-nav-id='../Exclude-Options/' title=Approval class=sidelist>"+
                      "<a href='/online-timesheet-software/classic/admin/timesheet/#approval'>"+
                      "Approval"+
                      "</a>"+
                  "</li>"+
                  "<li data-nav-id='../Exclude-Options/' title=Approval class=sidelist>"+
                    "<a href='/online-timesheet-software/classic/admin/timesheet/#pending-weekly-timesheets'>"+
                    "Pending Weekly Timesheets"+
                    "</a>"+
                "</li>"+
                 
            
            "</ul>"+
        "</ul>"+
            
        "<li class='dropdownicon sidelist'>"+
        "<a  class='qwe' href='/online-timesheet-software/classic/admin/reports/'>"+
        "Reports"+
        "</a>"+
        "<img src='./down-arrow-svgrepo-com.svg'  class='imageIconmodernuser aside_dropdown_icon'>"+
    "</li>"+

            "<li data-nav-id='./Setting/' title=Reports class='sidelist dropdown_romove_dot'>"+
        //             "<div class='dropdownicon'>"+
        // "<a  class='qwe' href='/online-timesheet-software/classic/admin/reports/'>"+
        // "Reports"+
        // "</a>"+
        // "<img src='./down-arrow-svgrepo-com.svg'  class='imageIconmodernuser aside_dropdown_icon'>"+
        //             "</div>"+
        "<ul class='ml-15 sidenavSub-topics'>"+
            
            "</li>"+
            "<ul class='aside_dropdown_list'>"+
                "<li data-nav-id='../General' title=' Daily Reports' class=sidelist>"+
                    "<a href='/online-timesheet-software/classic/admin/reports/#daily-report'>"+
                       "Daily Reports"+
                      "</a>"+
                      "</li>"+
                      "<li data-nav-id='../Exclude-Options/' title='Weekly Reports'class=sidelist>"+
                          "<a href='/online-timesheet-software/classic/admin/reports/#weekly-report'>"+
                          "Weekly Reports"+
                          "</a>"+
                      "</li>"+
                      "<li data-nav-id='../Exclude-Options/' title='Monthy Reports' class=sidelist>"+
                        "<a href='/online-timesheet-software/classic/admin/reports/#monthly-report'>"+
                        "Monthy Reports"+
                        "</a>"+
                    "</li>"+
                    "<li data-nav-id='../Exclude-Options/' title='Status Reports' class=sidelist>"+
                        "<a href='/online-timesheet-software/classic/admin/reports/#status-report'>"+
                        "Status Reports"+
                        "</a>"+
                    "</li>"+
                    "<li data-nav-id='../Exclude-Options/' title='My team'class=sidelist>"+
                        "<a href='/online-timesheet-software/classic/admin/reports/#my-teams'>"+
                        "My team"+
                        "</a>"+
                    "</li>"+
                    "<li data-nav-id='../Exclude-Options/' title='Project Details' class=sidelist>"+
                        "<a href='/online-timesheet-software/classic/admin/reports/#project-detail'>"+
                        "Project Details"+
                        "</a>"+
                    "</li>"+
           "</ul>"+
    
    
    
         "</ul>"+
    
         "<li class='dropdownicon sidelist'>"+
         "<a class='qwe' href='/online-timesheet-software/classic/admin/administrator/'>"+
         "Administration"+
         "</a>"+
         "<img src='./down-arrow-svgrepo-com.svg'  class='imageIconmodernuser aside_dropdown_icon'>"+
     "</li>"+

    "<li data-nav-id='./Setting/' title=Administration class='sidelist dropdown_romove_dot'>"+
        // "<div class='dropdownicon'>"+
        // "<a class='qwe' href='/online-timesheet-software/classic/admin/administrator/'>"+
        // "Administration"+
        // "</a>"+
        // "<img src='./down-arrow-svgrepo-com.svg'  class='imageIconmodernuser aside_dropdown_icon'>"+
        // "</div>"+
        "<ul class='ml-15 sidenavSub-topics'>"+
            
            "</li>"+
            "<ul class='aside_dropdown_list'>"+
                "<li data-nav-id='../General' title=Clients class=sidelist>"+
                    "<a href='/online-timesheet-software/classic/admin/administrator/#clients'>"+
                     "Clients"+
                      "</a>"+
                      "</li>"+
                      "<li data-nav-id='../Exclude-Options/' title=Projects class=sidelist>"+
                          "<a href='/online-timesheet-software/classic/admin/administrator/#projects'>"+
                          "Projects"+
                          "</a>"+
                      "</li>"+
                      "<li data-nav-id='../Exclude-Options/' title=Tasks class=sidelist>"+
                        "<a href='/online-timesheet-software/classic/admin/administrator/#tasks'>"+
                        "Tasks"+
                        "</a>"+
                    "</li>"+
                    "<li data-nav-id='../Exclude-Options/' title=Activities class=sidelist>"+
                        "<a href='/online-timesheet-software/classic/admin/administrator/#activities'>"+
                        "Activities"+
                        "</a>"+
                    "</li>"+
            "</ul>"+
        "</ul>"+
    
        "<li class='dropdownicon sidelist'>"+
        "<a  class='qwe' href='/online-timesheet-software/classic/admin/settings/'>"+
        "Settings"+
        "</a>"+
        "<img src='./down-arrow-svgrepo-com.svg'  class='imageIconmainsetting aside_dropdown_icon_setting'>"+
    "</li>"+

    "<li data-nav-id='./Setting/' title=Settings class='sidelist dropdown_romove_dot'>"+
        // "<div class='dropdownicon'>"+
        // "<a  class='qwe' href='/online-timesheet-software/classic/admin/settings/'>"+
        // "Settings"+
        // "</a>"+
        // "<img src='./down-arrow-svgrepo-com.svg'  class='imageIconmainsetting aside_dropdown_icon_setting'>"+
        // "</div>"+
        "<ul class='ml-15 sidenavSub-topics'>"+
            
            "</li>"+
            "<ul class='aside_dropdown_list_setting'>"+
                "<li data-nav-id='../General' title=Users class=sidelist>"+
                    "<a href='/online-timesheet-software/classic/admin/settings/#users'>"+
                      "Users"+
                      "</a>"+
                      "</li>"+
                      "<li data-nav-id='../Exclude-Options/' title='Add Custom Fields' class=sidelist>"+
                          "<a href='/online-timesheet-software/classic/admin/settings/#add-custom-field'>"+
                          "Add Custom Fields"+
                          "</a>"+
                      "</li>"+
                      "<li data-nav-id='../Exclude-Options/' title='Email Notification' class=sidelist>"+
                        "<a href='/online-timesheet-software/classic/admin/settings/#email-notification'>"+
                       "Email Notification"+
                        "</a>"+
                    "</li>"+
                    "<li data-nav-id='../Exclude-Options/' title=Organization class=sidelist>"+
                        "<a href='/online-timesheet-software/classic/admin/settings/#organization'>"+
                       "Organization"+
                        "</a>"+
                    "</li>"+
                    "<li data-nav-id='../Exclude-Options/' title=Departments class=sidelist>"+
                        "<a href='/online-timesheet-software/classic/admin/settings/#departments'>"+
                       "Departments"+
                        "</a>"+
                    "</li>"+

                    "<li class='dropdownicon sidelist'>"+
                    "<a  class='qwe' href='/online-timesheet-software/classic/admin/settings/setting/'>"+
                    "Settings"+
                     "</a>"+
                     "<img src='./down-arrow-svgrepo-com.svg'  class='imageIcongeneral aside_dropdown_icon'>"+
                "</li>"+

                    "<li data-nav-id='../Exclude-Options/' title=Setting class='sidelist dropdown_romove_dot'>"+
                    //     "<div class='dropdownicon'>"+
                    //     "<a  class='qwe' href='/online-timesheet-software/classic/admin/settings/setting/'>"+
                    //    "Setting"+
                    //     "</a>"+
                    //     "<img src='./down-arrow-svgrepo-com.svg'  class='imageIcongeneral aside_dropdown_icon'>"+
                    //     "</div>"+
                        "<ul class='ml-15 sidenavSub-topics'>"+
            
                        "</li>"+
                        "<ul class= 'aside_dropdown_list'>"+
                            "<li data-nav-id='../../General' title=General class=sidelist>"+
                                "<a href='/online-timesheet-software/classic/admin/settings/setting/#general'>"+
                                 "General"+
                                  "</a>"+
                                  "</li>"+
                                  "<li data-nav-id='../Exclude-Options/' title=Notifications class=sidelist>"+
                                      "<a href='/online-timesheet-software/classic/admin/settings/setting/#notification'>"+
                                      "Notifications"+
                                      "</a>"+
                                  "</li>"+
                                  "<li data-nav-id='../Exclude-Options/' title=Features class=sidelist>"+
                                    "<a href='/online-timesheet-software/classic/admin/settings/setting/#features'>"+
                                    "Features"+
                                    "</a>"+
                                "</li>"+
                                "<li data-nav-id='../Exclude-Options/' title='Advance' class=sidelist>"+
                                    "<a href='/online-timesheet-software/classic/admin/settings/setting/#advance'>"+
                                    "Advance Settings"+
                                    "</a>"+
                                "</li>"+
                        "</ul>"+
                    "</ul>"+
                "</li>"+
    "</ul>"+
    
    "</ul>"+
           
                            "<li data-nav-id='./installation/configuration/' title=Help class=sidelist>"+
                            "<a href='/online-timesheet-software/classic/admin/help/'>"+
                            "Help"+
                            "</a>"+
                            "</a>"+
                            "</li>"+
    "</li>"+
    "</ul>")
                                           
                                        });

                                        
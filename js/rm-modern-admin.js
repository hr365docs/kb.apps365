$(document).ready(function () {
    $("#rmmmodernadmin").html("");

    $("#rmmmodernadmin").append(
        "<li data-nav-id='./Settings/' title='Introduction' class='sidelist'>" +
            "<a href='/RM365/modern/admin/introduction/'>Introduction</a>" +
        "</li>" +

        "<li data-nav-id='./Settings/' title='Architecture Diagram' class='sidelist'>" +
            "<a href='/RM365/modern/admin/architecture-diagram/'>Architecture Diagram</a>" +
        "</li>" +

        "<li data-nav-id='./Settings/' title='Home Page' class='sidelist'>" +
            "<a href='/RM365/modern/admin/home-page/'>Home Page</a>" +
        "</li>" +

        "<li data-nav-id='./Settings/' title='Dashboard' class='sidelist'>" +
            "<a href='/RM365/modern/admin/dashboard/'>Dashboard</a>" +
        "</li>" +

        "<li data-nav-id='./Settings/' title='Report' class='sidelist'>" +
            "<a href='/RM365/modern/admin/reports/'>Report</a>" +
        "</li>" +

        "<li class='dropdownicon sidelist' title='Draft'>" +
            "<a href='/RM365/modern/admin/draft/'>Draft</a>" +
        "</li>" +

        "<li data-nav-id='./Settings/' title='Active Candidates' class='sidelist'>" +
            "<a href='/RM365/modern/admin/active-items/'>Active Candidates</a>" +
        "</li>" +

        "<li data-nav-id='./Settings/' title='Inactive Items' class='sidelist'>" +
            "<a href='/RM365/modern/admin/inactiveitem/'>Inactive Items</a>" +
        "</li>" +

        "<li data-nav-id='./Settings/' title='Administration' class='sidelist'>" +
            "<a href='/RM365/modern/admin/administration/'>Administration</a>" +
        "</li>" +

        "<li class='dropdownicon sidelist' title='Settings'>" +
            "<a class='qwe' href='/RM365/modern/admin/settings/'>Settings</a>" +
            "<img src='https://ik.imagekit.io/zn4au2jftpm5/hr365/down-arrow-avgrepo-com_TZAnDIIsES.svg?updatedAt=1717655767081' class='helpdesk-img aside_dropdown_icon_setting'>" +
        "</li>" +

        "<li data-nav-id='../system-settings' title='system-settings' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list_setting'>" +

                "<li data-nav-id='../user' title='General Settings' class='dropdownicon sidelist'>" +
                    "<a class='qwe' href='/RM365/modern/admin/settings/general-setting/'>General Settings</a>" +
                    "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
                "</li>" +
                "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
                    "<ul class='sidenavSub-topics aside_dropdown_list'>" +

                        "<li data-nav-id='../General' title='Date format' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/general-setting/#Date-Format'>Date format</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Theme' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/general-setting/#Theme'>Theme</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Languages' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/general-setting/#Languages'>Languages</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Default Currency' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/general-setting/#default-currency'>Default Currency</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Currency Separator' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/general-setting/#_currency_separator'>Currency Separator</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Enable Favicon' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/general-setting/#Enable-Favicon'>Enable Favicon</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Sharepoint Page Configuration' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/general-setting/#Hide-Sharepoint-Pages-Default-Components'>Sharepoint Page Configuration</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Brand Logo' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/general-setting/#Brand-logo'>Brand Logo</a>" +
                        "</li>" +

                    "</ul>" +
                "</li>" +

                "<li data-nav-id='../user' title='Templates' class='dropdownicon sidelist'>" +
                    "<a class='qwe' href='/RM365/modern/admin/settings/templates/'>Templates</a>" +
                    "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
                "</li>" +
                "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
                    "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                        "<li data-nav-id='../General' title='Job Description Template' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/templates/#_job_description_template'>Job Description Template</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Offer Letter Template' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/templates/#_offer_letter_template'>Offer Letter Template</a>" +
                        "</li>" +
                    "</ul>" +
                "</li>" +

                "<li data-nav-id='../user' title='Users and Permissions' class='dropdownicon sidelist'>" +
                    "<a class='qwe' href='/RM365/modern/admin/settings/users-departments/'>Users and Permissions</a>" +
                    "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
                "</li>" +
                "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
                    "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                        "<li data-nav-id='../General' title='User' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/users-departments/#User'>User</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Permissions' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/users-departments/#Department'>Permissions</a>" +
                        "</li>" +
                    "</ul>" +
                "</li>" +

                "<li data-nav-id='../user' title='Job Posting' class='dropdownicon sidelist'>" +
                    "<a class='qwe' href='/RM365/modern/admin/settings/Job-Posting/'>Job Posting</a>" +
                    "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
                "</li>" +
                "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
                    "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                        "<li data-nav-id='../General' title='Job Location' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/Job-Posting/#job-location'>Job Location</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Departments' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/Job-Posting/#depart'>Departments</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Job Priority' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/Job-Posting/#job-priority'>Job Priority</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Job Sourced From' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/Job-Posting/#job-sourced-from'>Job Sourced From</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Job Title' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/Job-Posting/#job-title'>Job Title</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Job Type' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/Job-Posting/#job-type'>Job Type</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Job Code' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/Job-Posting/#job-code'>Job Code</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Work Mode' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/Job-Posting/#Work-Mode'>Work Mode</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Year(s) of Experience' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/Job-Posting/#yearofexp'>Year(s) of Experience</a>" +
                        "</li>" +
                    "</ul>" +
                "</li>" +

                "<li data-nav-id='../General' title='Email Configuration' class='sidelist'>" +
                    "<a href='/RM365/modern/admin/settings/Email-configration/'>Email Configuration</a>" +
                "</li>" +

                "<li data-nav-id='../user' title='Custom Fields' class='dropdownicon sidelist'>" +
                    "<a class='qwe' href='/RM365/modern/admin/settings/custom-field/'>Custom Fields</a>" +
                    "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
                "</li>" +
                "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
                    "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                        "<li data-nav-id='../General' title='Custom Fields' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/custom-field/#custom-field'>Custom Fields</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Custom Forms' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/custom-field/#custom-form'>Custom Forms</a>" +
                        "</li>" +
                    "</ul>" +
                "</li>" +

                "<li data-nav-id='../user' title='Hiring Process' class='dropdownicon sidelist'>" +
                    "<a class='qwe' href='/RM365/modern/admin/settings/hiring-process/'>Hiring Process</a>" +
                    "<img class='helpdesk-img aside_dropdown_icon' src='/sharepoint-employee-onboarding/modern/admin/js-modern-admin/down-arrow-svgrepo-com.svg'>" +
                "</li>" +
                "<li data-nav-id='./Setting/' title='System Setting' class='sidelist dropdown_romove_dot'>" +
                    "<ul class='sidenavSub-topics aside_dropdown_list'>" +
                        "<li data-nav-id='../General' title='Complexity Level' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/hiring-process/#Complexity-Level'>Complexity Level</a>" +
                        "</li>" +
                        "<li data-nav-id='../General' title='Score Card' class='sidelist'>" +
                            "<a href='/RM365/modern/admin/settings/hiring-process/#Score-Card'>Score Card</a>" +
                        "</li>" +
                    "</ul>" +
                "</li>" +

                "<li data-nav-id='./Custom-Emails/' title='Portal Configuration' class='sidelist'>" +
                    "<a href='/RM365/modern/admin/settings/portal-configration/'>Portal Configuration</a>" +
                "</li>" +

                "<li data-nav-id='../General' title='Azure Open AI Integration' class='sidelist'>" +
                    "<a href='/RM365/modern/admin/settings/Azure-OpenAI-Integration/'>Azure Open AI Integration</a>" +
                "</li>" +

            "</ul>" +
        "</li>" +

        "<li class='dropdownicon sidelist' title='Help'>" +
            "<a href='/RM365/modern/admin/help/'>Help</a>" +
            "<img src='https://ik.imagekit.io/zn4au2jftpm5/hr365/down-arrow-avgrepo-com_TZAnDIIsES.svg?updatedAt=1717655767081' class='imageIconadvanced aside_dropdown_icon'>" +
        "</li>" +

        "<li data-nav-id='../advanced/' title='Help' class='sidelist dropdown_romove_dot'>" +
            "<ul class='sidenavSub-topics aside_dropdown_list' id='modernsettingedm'>" +
                "<li data-nav-id='../advanced/' title='Product Activation' class='sidelist'>" +
                    "<a href='/RM365/modern/admin/help/#product-activation'>Product Activation</a>" +
                "</li>" +
            "</ul>" +
        "</li>"
    );
});
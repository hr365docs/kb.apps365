$(document).ready(function () {
if (!$("#fa-stylesheet").length) {         $("<link>", {             id: "fa-stylesheet",             rel: "stylesheet",             href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"        }).appendTo("head");     }
    $("#footer-container").html(
        "<div style='position:absolute;width:100%'>"+
        "<footer class='section footer' style='padding:1vw 0 0 0;background-color:black;margin:0 30px;position:relative;bottom:0;width:95%'>" +
            "<div class='container' style='margin:0;width:100%;max-width:100%'>" +
                "<div class='row'style='display:flex;justify-content:space-between;width:100%'>" +
                    "<div class='col'>" +
                        "<p class='column-first' style='color:white'>© 2026-" +
                            "<a href='https://www.apps365.com/' style='color:white'>Apps365.</a> " +
                            "<a href='https://www.apps365.com/trust-center/service-level-agreement/' style='color:white'>SLA.</a> " +
                            "<a href='https://www.apps365.com/terms-and-conditions' style='color:white'>T&C.</a> " +
                            "<a href='https://www.apps365.com/end-user-license-agreement-eula' style='color:white'>EULA.</a> " +
                            "<a href='https://www.apps365.com/trust-center/privacy-policy/' style='color:white'>Privacy Policy.</a> " +
                            "<a href='https://www.cubiclogics.com/' style='color:white'>Cubic Logics.</a>" +
                        "</p>" +
                    "</div>" +
                    "<div class='column' style='margin:0'>" +
                        "<ul class='list-inline' style='display:flex;gap:10px'>" +
                            "<li class='list-inline-item'>" +
                                "<a class='text' href='https://www.facebook.com/hr365apps/' aria-label='Facebook' style='color:white'>" +
                                    "<i class='ti-facebook'></i>" +
                                "</a>" +
                            "</li>" +
                            "<li class='list-inline-item'>" +
                                "<a class='text' href='https://twitter.com/HR365_HRMS' aria-label='Twitter' style='color:white'>" +
                                    "<i class='ti-twitter-alt'></i>" +
                                "</a>" +
                            "</li>" +
                            "<li class='list-inline-item'>" +
                                "<a class='text' href='https://www.linkedin.com/company/cubic-logics-india-pvt-ltd' aria-label='Linkedin' style='color:white'>" +
                                    "<i class='ti-linkedin'></i>" +
                                "</a>" +
                            "</li>" +
                         "<li class='list-inline-item'>" +               
                                           "<a class='text' href='https://www.youtube.com/@HR365' aria-label='YouTube' style='color:white'>" +  

                                                            "<i class='fa-brands fa-youtube'></i>" +        
                                                                                     "</a>" +     
                                                 "</li>" + 
"<li class='list-inline-item'>" +
    "<a class='text' href='https://www.instagram.com/hr365apps/' aria-label='Instagram' style='color:white'>" +
        "<i class='fa-brands fa-instagram'></i>" +
    "</a>" +
"</li>" +
                        "</ul>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</footer>"+
        "</div>"    
    );
});
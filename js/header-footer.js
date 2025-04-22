
document.querySelectorAll("head link")[2].href = window.location.origin + "/images/headericon.png.ico";
window.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash;
 
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        // Open the collapse (if using Bootstrap)
        const collapse = new bootstrap.Collapse(target, {
          toggle: true
        });
 
        // Scroll after a short delay
        setTimeout(() => {
          const yOffset = -100;
          const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 300); // delay allows time for collapse to expand
      }
    }
  });
 
 
document.querySelectorAll('.card-link').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
 
      if (href.startsWith('#')) {
        e.preventDefault(); // prevent default anchor behavior
        const target = document.querySelector(href);
 
        if (target) {
          // Show the collapse (manually trigger Bootstrap collapse if not using data-toggle)
          const collapse = new bootstrap.Collapse(target, {
            toggle: true
          });
 
          // Update URL hash without reloading
          history.replaceState(null, null, href);
 
          // Scroll to the target 100px above
          const yOffset = -100;
          const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
 
          setTimeout(() => {
            window.scrollTo({ top: y, behavior: 'smooth' });
          }, 300); // small delay to allow collapse animation to kick in
        }
      }
    });
  });
$(document).ready(function() {
    document.getElementsByName("description")[0].content = document.title;

    $(".common-header").html(
        `<ul class='navbar-nav ml-auto headerstyle'>` +
            `<li class='nav-item dropdown'>` +
                `<a class='nav-link dropdown-toggle text-dark' href='#' id='hr365Dropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>HR365</a>` +
                `<div class='dropdown-menu' aria-labelledby='hr365Dropdown'>` +
                `<a class='dropdown-item onboardinglink' href='/sharepoint-employee-onboarding/'>Employee Onboarding 365</a>` +
   
                `<a class='dropdown-item employeedirectorylink' href='/sharepoint-employee-directory/'>Employee Directory 365</a>` +

                `<a class='dropdown-item performancelink' href='/employee-performance-management/'>Performance Management 365</a>` +

                `<a class='dropdown-item performancelink' href='/employee-vacation-tracker-time-off-manager/'>Time Off Manager 365</a>` +

                `<a class='dropdown-item performancelink' href='/RM365/'>Recruitment Management 365</a>` +

                `<a class='dropdown-item performancelink' href='/Expense-tracker/'>Expense Tracker 365</a>` +
 
                `</div>` +


            `</li>` +
            `<li class='nav-item dropdown'>` +
                `<a class='nav-link dropdown-toggle text-dark' href='#' id='bizapp365Dropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>BizApp365</a>` +

                `<div class='dropdown-menu' aria-labelledby='bizapp365Dropdown'>` +
 
                `<a class='dropdown-item helpdesklink' href='/sharepoint-helpdesk/'>Helpdesk 365</a>` +

                `<a class='dropdown-item assetmanagementlink' href='/online-asset-management-application/'>Asset Management 365</a>` +

                `<a class='dropdown-item contractlink' href='/contract-management/'>CLM 365</a>` +


                `<a class='dropdown-item timesheetlink' href='/online-timesheet-software/'>Timesheet 365</a>` +
               
                `</div>` +


            `</li>` +
            `<li class='nav-item dropdown'>` +
                `<a class='nav-link dropdown-toggle text-dark' href='#' id='civic365Dropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Gov365</a>` +
                `<div class='dropdown-menu' aria-labelledby='civic365Dropdown'>` +
                
                `<a class='dropdown-item Civic365link' href='/Civic365/'>Civic 365</a>` +


                `</div>` +
            `</li>` +
        `</ul>`
    );
});

window.addEventListener("load", () => {
    let headerItems = document.querySelectorAll(".navbar-nav .nav-item a")
    for (let i = 0; i < headerItems.length; i++) {
        if (window.location.pathname.split('/')[1] == headerItems[i].pathname.split('/')[1]) {
            if(document.querySelector("header.shadow-bottom.sticky-top.bg-white")){
                headerItems[i].classList.add("active-dark")
            }
            else{
                headerItems[i].classList.add("active")
            }
        }
    }
});
// window.addEventListener("load", () => {
//     let headerItems = document.querySelectorAll(".navbar-nav .nav-item a");
//     let currentPath = window.location.pathname.split('/')[1]; // Get the first segment of the current URL path

//     for (let i = 0; i < headerItems.length; i++) {
//         let itemPath = headerItems[i].pathname.split('/')[1]; // Get the first segment of the link's URL path
//         if (currentPath === itemPath) {
//             if (document.querySelector("header.shadow-bottom.sticky-top.bg-white")) {
//                 headerItems[i].classList.add("active-dark");
//             } else {
//                 headerItems[i].classList.add("active");
//             }
//             // Break the loop after finding the current item to improve performance
//             break;
//         }
//     }
// });



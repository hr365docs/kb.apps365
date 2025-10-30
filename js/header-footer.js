
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
                `<a class='dropdown-item onboardinglink' href='/HRMS-HR365'>HRMS-HR365</a>` +
                `<a class='dropdown-item onboardinglink' href='/sharepoint-employee-onboarding/'>Employee Onboarding 365</a>` +
   
                `<a class='dropdown-item employeedirectorylink' href='/sharepoint-employee-directory/'>Employee Directory 365</a>` +

                `<a class='dropdown-item performancelink' href='/employee-performance-management/'>Performance Management 365</a>` +

                `<a class='dropdown-item performancelink' href='/employee-vacation-tracker-time-off-manager/'>Time Off Manager 365</a>` +

                `<a class='dropdown-item performancelink' href='/RM365/'>Recruitment Management 365</a>` +

                `<a class='dropdown-item performancelink' href='/Expense-tracker/'>Expense Tracker 365</a>` +
 
                `</div>` +


            `</li>` +
            `<li class='nav-item dropdown'>` +
                `<a class='nav-link dropdown-toggle text-dark' href='#' id='bizapp365Dropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Business Apps</a>` +

                `<div class='dropdown-menu' aria-labelledby='bizapp365Dropdown'>` +
 
                `<a class='dropdown-item helpdesklink' href='/sharepoint-helpdesk/'>Helpdesk 365</a>` +

                `<a class='dropdown-item assetmanagementlink' href='/online-asset-management-application/'>Asset Management 365</a>` +

                `<a class='dropdown-item contractlink' href='/contract-management/'>CLM 365</a>` +


                `<a class='dropdown-item timesheetlink' href='/online-timesheet-software/'>Timesheet 365</a>` +

                `<a class='dropdown-item revenuelink' href='/Revenue365/'>Revenue 365</a>` +
                // `<a class='dropdown-item revenuelink' href='/Stock365/'>Stock 365</a>` +
                `<a class='dropdown-item tasklink' href='/task-management-365/'>Task Management 365</a>` +
               
                `</div>` +


            `</li>` +
            `<li class='nav-item dropdown'>` +
                `<a class='nav-link dropdown-toggle text-dark' href='#' id='civic365Dropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Gov365</a>` +
                `<div class='dropdown-menu' aria-labelledby='civic365Dropdown'>` +
                
                `<a class='dropdown-item Civic365link' href='/Civic365/'>Civic 365</a>` +


                `</div>` +
            `</li>` +
             `<li class='nav-item dropdown'>` +
        `<a class='nav-link dropdown-toggle text-dark' href='#' id='webpartDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>SharePoint Add-ins</a>` +
        `<div class='dropdown-menu' aria-labelledby='webpartDropdown'>` +
        `<a class='dropdown-item stocklink' href='/Stock365/'>Stock 365</a>` +
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
               
            }
            else{
                headerItems[i].classList.add("active")
            }
        }
    }
});
// Mark submenu link as active (purple) based on current path
window.addEventListener("load", () => {
    const currentPath = window.location.pathname.split('/')[1];
    document.querySelectorAll(".dropdown-menu .dropdown-item").forEach(item => {
        const itemPath = item.getAttribute("href").split('/')[1];
        if (itemPath === currentPath) {
            item.classList.add("active-submenu");
        }
    });
});

// Inject required styles
const style = document.createElement("style");
style.innerHTML = `
  /* Remove underline / border from top nav items */
  .navbar-nav .nav-item a,
  .navbar-nav .nav-item a:focus,
  .navbar-nav .nav-item a:active,
  .navbar-nav .nav-item a:hover {
    text-decoration: none !important;
    border: none !important;
    border-bottom: none !important;
    box-shadow: none !important;
    outline: none !important;
    background-image: none !important;
  }

  /* Submenu items base style */
  .dropdown-menu .dropdown-item {
    background-color: transparent !important;
    font-weight: 500;
    padding: 0.5rem 1.25rem;
    transition: all 0.2s ease;
    text-decoration: none !important;
    border: none !important;
  }

  .active-submenu {
    color: var(--primary-color)!important;
    font-weight: 500 !important;
    text-shadow: 0 0 0.2px currentColor; 
    text-decoration: none !important;
    border: none !important;
  }
`;
document.head.appendChild(style);


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



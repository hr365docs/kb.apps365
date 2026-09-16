
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
$(document).ready(function () {
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

    `<a class='dropdown-item performancelink' href='/Expense-tracker/'>Expense 365</a>` +

    `</div>` +


    `</li>` +
    `<li class='nav-item dropdown'>` +
    `<a class='nav-link dropdown-toggle text-dark' href='#' id='bizapp365Dropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Business Apps</a>` +

    `<div class='dropdown-menu' aria-labelledby='bizapp365Dropdown'>` +

    `<a class='dropdown-item helpdesklink' href='/sharepoint-helpdesk/'>Helpdesk 365</a>` +

    `<a class='dropdown-item assetmanagementlink' href='/online-asset-management-application/'>Asset 365</a>` +

    `<a class='dropdown-item contractlink' href='/contract-management/'>CLM 365</a>` +


    `<a class='dropdown-item timesheetlink' href='/online-timesheet-software/'>Timesheet 365</a>` +

    `<a class='dropdown-item revenuelink' href='/Revenue365/'>Revenue 365</a>` +
    // `<a class='dropdown-item revenuelink' href='/Stock365/'>Stock 365</a>` +
    `<a class='dropdown-item tasklink' href='/task-management-365/'>Task 365</a>` +

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
    `<div class='dropdown-menu newWebparts' aria-labelledby='webpartDropdown'>` +
    `<a class='dropdown-item stocklink' href='/IApps-365/'>IApps 365</a>` +
    `<a class='dropdown-item stocklink' href='/Stock365/'>Stock 365</a>` +
    `<a class='dropdown-item stocklink' href='/BookTime-365/'>BookTime 365</a>` +
    `<a class='dropdown-item stocklink' href='/expense-365-Lite/'>Expense 365 Lite </a>` +
    `<a class='dropdown-item stocklink' href='/FAQ-365/'>FAQ 365</a>` +
    `<a class='dropdown-item stocklink' href='/Gauge365/'>Gauge 365</a>` +
    `<a class='dropdown-item stocklink' href='/Carousel-365/'>Carousel 365</a>` +
    `<a class='dropdown-item stocklink' href='/VisitorLogs-365/'>Visitor Logs 365</a>` +
    `<a class='dropdown-item stocklink' href='/Accordion-365/'>Accordion 365</a>` +
    `<a class='dropdown-item stocklink' href='/NoticeBoard-365/'>NoticeBoard 365</a>` +
    `<a class='dropdown-item stocklink' href='/Birthday-365/'>Birthdays 365</a>` +
    `<a class='dropdown-item stocklink' href='/Anniversary-365/'>Anniversary 365</a>` +
    `<a class='dropdown-item stocklink' href='/Survey-365/'>Survey 365</a>` +
    `<a class='dropdown-item stocklink' href='/Quiz-Board-365/'>Quiz Board 365</a>` +
    `<a class='dropdown-item stocklink' href='/Spotlight-365/'>Spotlight 365</a>` +
    `<a class='dropdown-item stocklink' href='/Alert-365/'>Alert 365</a>` +
     `<a class='dropdown-item stocklink' href='/Praise-365/'>Praise 365</a>` +
      `<a class='dropdown-item stocklink' href='/idea-box-365/'>Idea Box 365</a>` +
       `<a class='dropdown-item stocklink' href='/Count-Down-Calendar-365/'>Countdown Calendar 365</a>` +
         `<a class='dropdown-item stocklink' href='/ICP-365/'>ICP 365</a>` +
         `<a class='dropdown-item stocklink' href='/MS-Forms-365/'>MS Forms 365</a>` +
          `<a class='dropdown-item stocklink' href='/Poll-365/'>Poll 365</a>` +
          `<a class='dropdown-item stocklink' href='/joining-card-365/'>Joining Card 365</a>` +
    `</div>` +
    `</li>` +

    `</ul>`
  );
});

window.addEventListener("load", () => {
  let headerItems = document.querySelectorAll(".navbar-nav .nav-item a")
  for (let i = 0; i < headerItems.length; i++) {
    if (window.location.pathname.split('/')[1] == headerItems[i].pathname.split('/')[1]) {
      if (document.querySelector("header.shadow-bottom.sticky-top.bg-white")) {

      }
      else {
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
 .navbar{
 width:97vw;
 }
 ::selection{
 background-color:#5637DA !important;
 color:white !important }
  /* Submenu items base style */
  .dropdown-menu .dropdown-item {
    background-color: transparent !important;
    font-weight: 500;
    padding: 0.5rem 1.25rem;
    transition: all 0.2s ease;
    text-decoration: none !important;
    border: none !important;
  }
    .pagination a:hover i{
    color:black !important
    }
     .card-header a:hover i{
    color:black !important 
    }
    .newWebparts{
      position: absolute;
        max-height: 25vw !important;
        overflow: auto !important;
    }
  .fa-chain:before, .fa-link:before{
  display: none;
  }
  .active-submenu {
    color: var(--primary-color)!important;
    font-weight: 500 !important;
    text-shadow: 0 0 0.2px currentColor; 
    text-decoration: none !important;
    border: none !important;
  }
  a,
a:hover,
a:focus {
     text-decoration: none !important;
    color: #5637da 
}
    
    .bug{
    color:var(--front--) !important 
    }
a:hover i{
color:#fff !important 
}   
.text-primary i:hover {
color:#0b1020 !important;
}
.side{
background-color:var(--back--) !important;
color:var(--front--) !important

}
.myReleaseNotes ol li{
color: var(--release--) !important;
}
.myReleaseNotes .releasenotepadding p{
color: var(--release--) !important;
}
.original li{
color:#a5a5a5
}
.release {
background:var(--back--) !important ;
margin-bottom:58px;
}
.side h5{
color:#var(--front--)
}
.mb a,.side a{
color:var(--front--) !important
}
.bg-black{
margin-bottom:100px;
background-color:var(--back--);
}
.bg-li{

background-color:#1f1f1f !important;


}
.card-header a{
color:#0b1020 !important;
}
  .back::before{
  background-color:#1f1f1f !important;
  color:#fff !important;
  }
.list-inline-item a{
        color:#fff !important
    }
     .list-inline-item a:hover{
        color:#fff !important;
        text-decoration:none !important;
    }
  .head{
  color:#0b1020 !important;

  }
  .highlight{
  color:#0b1020 !important;
  }
  .high a{
  color:var(--front--) !important }
  .highlight:hover{
  color:#0b1020;
  }
  .sidel a{
  color:#fff !important
  }
  .neww{
  color:var(--release--) !important
  }
  .back-btn::before{
  background:none !important;}
 .backk{
  background-color:#1f1f1f !important;
 color:white;
 height:100vh;
 overflow-y:scroll
 }
  .pagination a{
  color:#0b1020
  } 
  .mbHeading a {
  color:#0b1020 !important
 }
  .back-btn{
  color:#0b1020 !important
 }
  .sidelist a{
  color:#0b1020 !important
 }
  .btn-primary {
    background:#5637da;
    color: #fff !important
}
    .btn-primary:active {
    background: #5637da;
}
    .btn-primary:hover {
    background: #5637da;
}
  .sidelist li.sidelist.active a {
    color:black !important;
    font-weight: 600 !important;
}
    .ti-panel:before,.ti-folder:before,.ti-cloud:before{
    color: #5637da !important
}
    .text-primary,.text-primary a{
    color:#0b1020 !important;
    }
    
    .list-styled li::before {
    position: absolute;
    content: '';
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background:rgb(11,16,32) !important;
    opacity: .3;
    left: 0;
    top: 12px
}
    h1,
h2,
h3,
h4,
h5,
h6
 {
   color: rgb(11,16,32) !important;
    font-family: var(--font-family), sans-serif;
    font-weight: 700;
    line-height: 1.2
}
     .dropdown-item{
   color:black !important;
   }
   .active-submenu{
   font-weight:800 !important;
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



let commonscroll = document.querySelectorAll(".releasenotepadding")

let dropdowminneritem = document.querySelectorAll(".versiononclick");
    
    dropdowminneritem.forEach((element, index) => {
        element.addEventListener("click", () => {
            for (let i of dropdowminneritem) {
                i.classList.remove("active")
                for (let j of commonscroll) {
                    j.classList.remove("active")
                    j.removeAttribute("style")
                }
            }
            
            commonscroll[index].classList.add("active")
            element.classList.add("active")
            commonscroll[index].setAttribute("style", "padding-top:80px!important")
        })
    })


    
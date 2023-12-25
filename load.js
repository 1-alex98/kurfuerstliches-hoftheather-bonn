const response = fetch('/layout.html').then(function (response) {
    return response.text();
})

function setColourBasedOnBack(element) {
    let rect = element.getBoundingClientRect();
    let elementsBehindNav = document.elementsFromPoint(rect.left + 1, rect.top + 1);
    elementsBehindNav.pop(); //topmost is not interesting it is the nav itself
    // Check if the element or its parents have the CSS class "light-navigation"
    let isLightNavigation = false;
    for (let element of elementsBehindNav) {
        while (element) {
            if (element.classList && element.classList.contains("light-navigation")) {
                isLightNavigation = true;
                break;
            }
            element = element.parentElement;
        }
    }

    // Set nav style class based on the condition
    if (isLightNavigation) {
        element.classList.add("light-nav");
        element.classList.remove("dark-nav");
    } else {
        element.classList.add("dark-nav");
        element.classList.remove("light-nav");
    }
}

let mybutton;
let nav;
function changeColor() {
    if(!mybutton) {
        mybutton = document.getElementById("topBtn");
    }
    if(!nav) {
        nav = document.getElementById("topMenu");
    }

    // Get the element behind the nav
    setColourBasedOnBack(mybutton);
    setColourBasedOnBack(nav);
    topButtonScroll()
}

window.onload = async function () {
    let content = document.getElementById("content").innerHTML;

    document.getElementsByTagName('body')[0].innerHTML = await response;
    document.getElementById("content").innerHTML = content;
    changeColor();
}


window.onscroll = changeColor


// Get the button:


function topButtonScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
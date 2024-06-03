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

let nav;
function changeColor() {
    if(!nav) {
        nav = document.getElementById("topMenu");
    }

    // Get the element behind the nav
    setColourBasedOnBack(nav);
}

window.onload = async function () {
    let content = document.getElementById("content").innerHTML;

    document.getElementsByTagName('body')[0].innerHTML = await response;
    document.getElementById("content").innerHTML = content;
    changeColor();
    const main = document.querySelector('body');
    main.addEventListener('scroll', changeColor);
}


window.onscroll = changeColor


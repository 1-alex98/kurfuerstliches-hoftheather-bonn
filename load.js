const response = fetch('/layout.html').then(function (response) {
    return response.text();
})
function changeColor() {
    let nav = document.getElementById("fixed-nav"); // nav is a fixed element

    // Get the element behind the nav
    let rect = nav.getBoundingClientRect();
    let elementsBehindNav = document.elementsFromPoint(rect.left + 1, rect.top + 1);
    elementsBehindNav.pop(); //topmost is not interesting it is the nav itself
    // Check if the element or its parents have the CSS class "light-navigation"
    let isLightNavigation = false;
    for(let element of elementsBehindNav) {
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
        nav.classList.add("light-nav");
    } else {
        nav.classList.remove("light-nav");
    }
}

window.onload = async function () {
    let content = document.getElementById("content").innerHTML;
    document.getElementsByTagName('body')[0].innerHTML = await response;
    document.getElementById("content").innerHTML = content;
    changeColor();
}


window.onscroll = changeColor

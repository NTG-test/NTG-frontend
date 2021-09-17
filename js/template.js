
function scrollToElement(element) {
    nwaSelect(element).scrollIntoView();
}

function scrollToTop() {
    nwaSelect('main').scrollTop = 0;
}


function activeNavTab(id) {
    if (nwaSelect('body aside ul li#' + id).classList.contains('active'))
        nwaSelect('body aside ul li#' + id).classList.remove('active');
    else {
        var navTabs = document.querySelectorAll("body aside > ul > li");
        navTabs.forEach(function(element) {
            element.classList.remove('active');
        });
        nwaSelect('body aside ul li#' + id).classList.add('active');
    }
}

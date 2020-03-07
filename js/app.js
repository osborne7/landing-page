//  for each section, 
//     1 add an li to the ul in navlist
//     2 get the h2's data attribute from each section in turn, in order to create the text for the li
//     3 append the li to the ul so it shows up in navlist

const h2s = document.querySelectorAll('h2');
let i = 1;

for (const h2 of h2s) {
    // add an li to the nav's ul for each section h2 & get h2 text from data attribute
    const navList = document.querySelector('#navbar__list');
    const createLi = document.createElement('li');
    const h2Text = h2.getAttribute('data-nav');
    createLi.textContent = h2Text;

    // link from nav to each page section
    const link = document.createElement('a');
    link.setAttribute('href', ('#section' + [i]));
    i++;
    navList.appendChild(link);
    link.appendChild(createLi);

    // make sections collapsible and add open/close symbols
    h2.addEventListener('click', function(){
    let collapseDiv = this.nextElementSibling;
    if (collapseDiv.style.display === 'block') {
        collapseDiv.style.display = 'none';
        h2.children[0].innerHTML = " &#10515;";
    } else {
        collapseDiv.style.display = 'block';
        h2.children[0].innerHTML = ' &#10514;';
    }
    })
    }



// scroll to top button functionality
const scrollToTopButton = document.getElementById('top');

// detemine whether or not to display the scroll to top button based on window position
const scrollFunction = () => {
    // find the Y scroll value
    let yVal = window.scrollY;
    // if scroll value is greater than window height, add class to display button, otherwise remove it
    if (yVal > 0) {
        scrollToTopButton.className = "back-to-top show";
    } else {
        scrollToTopButton.className = "back-to-top hide";
    }
};

document.addEventListener("scroll", scrollFunction);

const scrollToTop = () => {
// distant from top of the document
const distanceFromTop = document.documentElement.scrollTop || document.body.scrollTop;
// if that number is greater than 0, scroll back to 0/the top of document
if (distanceFromTop > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, distanceFromTop - distanceFromTop / 10);
}
};

// when the button is clicked, run scrollToTop function
scrollToTopButton.onclick = function(e) {
    e.preventDefault();
    scrollToTop();
}



// check if element is in viewport   
const inViewport = (element) => {
    const bounding = element.getBoundingClientRect();
    const elementHeight = element.offsetHeight;
    const elementWidth = element.offsetWidth;
    return (
        bounding.top >= -elementHeight
        && bounding.left >= -elementWidth 
        && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) + elementWidth
        && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + elementHeight
    )};



// highlight lis when they become active
const activeSections = document.getElementsByClassName('active-section');
const lis = document.querySelectorAll('li');

const highlightLi = () => {
    for (let li of lis) {
        for (let activeSection of activeSections) {
            let currentH2 = activeSection.querySelector('h2');
            if (currentH2.getAttribute('data-nav') == li.textContent) {
                li.classList.add('active-li');
            } else {
                li.classList.remove('active-li');
            }
        }
    }
};



// listen for scroll to timeout
const pageHeader = document.querySelector('.page__header');
let timeout;
document.addEventListener('scroll', function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        highlightActive();
        highlightLi();
        pageHeader.style.top = "0px";
    }, 35);
});

// hide header while scrolling:
document.onscroll = function() {
    pageHeader.style.top = "-50px";
};



// highlight sections when in viewport
const sections = document.querySelectorAll('section');
const highlightActive = () => {
    for (let section of sections) { 
        if (inViewport(section)) {
            if (!section.classList.contains('active-section')) {
                section.classList.add('active-section');
                }
            } else {
            if (section.classList.contains('active-section')) {
                section.classList.remove('active-section');
            }
        }
    }
};
        


// scroll to appropriate section when navlink is clicked
let anchorLinks = document.querySelectorAll('a[href^="#"]');

for (let anchorLink of anchorLinks) {
    anchorLink.addEventListener('click', (e) => {
        let anchorValue = anchorLink.getAttribute('href');
        let anchorTo = document.querySelector(anchorValue);
        anchorTo.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
        e.preventDefault();
    })
};

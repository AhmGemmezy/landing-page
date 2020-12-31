/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
// select all sections
const sections = document.querySelectorAll('section');

// select the navbar id
const navBar = document.getElementById('navbar__list');

// create a document fragment to hold all the lists
const frag = document.createDocumentFragment();

/* *End Global Variables * */


/* * Begin Main Functions * */

// build the nav

for (let section of sections) {
    const sectionId = section.getAttribute('id');
    const sectionTitle = section.getAttribute('data-nav');
    const list = document.createElement('li');
    const links = document.createElement('a');

    /* Build menu  */
    // construct the li's
    links.setAttribute('href', `#${sectionId}`);
    links.innerText = sectionTitle;
    list.appendChild(links);
    links.classList = 'menu__link';
    frag.appendChild(list);

    // Scroll to section on link click
    links.addEventListener('click', function (event) {
        event.preventDefault();
        // Scroll to anchor ID using scrollTO event
        window.scrollTo({ top: section.offsetTop - 60, behavior: 'smooth' });
    });
};
// append the generated fragmented Lists to nav-bar list
navBar.appendChild(frag);

// select the a tags inside navbar
const allLinks = navBar.querySelectorAll('a');

/* Add class 'active' to section when near top of viewport */

/* Get the Top of the section */
function sectionView(section) {
    return section.getBoundingClientRect().top;
}

/* Remove Active Class of all sections */
function removeActiveClass(section) {
    return section.classList.remove('your-active-class');
}

// Add Active Class to the required section
function addActiveClass(is_inview, section) {
    if (is_inview) {
        section.classList.add('your-active-class');
        // Looping over all Links for find the matched link to the section
        allLinks.forEach(link => {
            if (link.innerText == section.getAttribute('data-nav')) {
                // add activity_link class 
                link.classList.add('activity_link');
            } else {
                // remove activity_link class from non-matched links with sections
                link.classList.remove('activity_link');
            }
        });
    };
};

// combine functions //
function activeSection() {
    sections.forEach(section => {
        const itemView = sectionView(section);
        viewport = () => itemView > -200 && itemView <= 400;
        // remove active class from the all sections
        removeActiveClass(section);
        // Set sections as active
        addActiveClass(viewport(), section);
    });
}

// add eventlistener to window on scroll action 
window.addEventListener('scroll', activeSection);













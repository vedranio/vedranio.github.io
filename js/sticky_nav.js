function formatStickyNav(colour) {
  window.onscroll = function() {
    var sticky = document.getElementById('nav');

    var navBackgroundColourClass;
    switch (colour) {
        case "@colour-medium-gray":
            navBackgroundColourClass = "";
            break;
        case "@colour-light-gray":
            navBackgroundColourClass = "nav--on-light-bg";
            break;
        case "@colour-white":
            navBackgroundColourClass = "nav--on-white-bg";
    }

    if( document.body.scrollTop > 1)
        // sticky.className = "nav nav--stuck";
        sticky.className = "nav nav--stuck" ;
    else sticky.className = "nav " + navBackgroundColourClass;
  };
}

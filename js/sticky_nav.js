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

    //this is required to make sure scrolling gets detected in all browsers (Firfeox was the problem)
    var bodyScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    if( bodyScrollTop > 1)
        sticky.className = "nav nav--stuck";
    else
      sticky.className = "nav " + navBackgroundColourClass;
  };
}

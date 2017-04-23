function lazyLoadBackground(targetID, largeImageClass, largeImageURL)
{
  var target = document.getElementById(targetID)

  // 1: load large image
  var imgLarge = new Image();
  imgLarge.src = largeImageURL;
  imgLarge.onload = function () {
    // placeholder.classList.add('placholder--loaded');
    // imgSmall.classList.add('hidden');
    // imgLarge.classList.add('loaded');

    // 2: create a class with the large image, initially with opacity: 0
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.' + largeImageClass + ' {padding: 0; width: 100%; opacity: 0; height: 40em; background: linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)), ' + 'url(' + largeImageURL + ')' +';background-size: cover; background-repeat: no-repeat; @media screen and (min-width: @screen-large) {height: 50em;}}';
    document.getElementsByTagName('head')[0].appendChild(style);
    console.log(style.innerHTML);

    // opacity: 0; transition: opacity 1s linear;

    document.getElementById(targetID).classList.remove('my-work-item_full-width-image--rubicon');
    // 3: apply the new class with the large image to the target div
    document.getElementById(targetID).classList.add(largeImageClass);

    document.getElementById(targetID).classList.add('background-image--visible');
  };





}

function lazyLoadImage(imageContainerID, imagePlaceholderID, shadowClass)
{
  var placeholder = document.getElementById(imageContainerID),
      imgSmall = document.getElementById(imagePlaceholderID)

  // 1: load small image and show it
  var img = new Image();
  img.src = imgSmall.src;
  img.onload = function () {
   imgSmall.classList.add('loaded');
  };

  // 2: load large image
  var imgLarge = new Image();
  imgLarge.src = placeholder.dataset.large;
  imgLarge.onload = function () {
    placeholder.classList.add('placholder--loaded');
    imgSmall.classList.add('hidden');
    imgLarge.classList.add('loaded');

    if (shadowClass !== undefined) {
        imgLarge.classList.add(shadowClass);
    }

  };

  placeholder.appendChild(imgLarge);

}

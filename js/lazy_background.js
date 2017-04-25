function lazyLoadBackground(targetID, largeImageClass, largeImageURL)
{
  var target = document.getElementById(targetID)

  // 1: load large image
  var imgLarge = new Image();
  imgLarge.src = largeImageURL;
  imgLarge.onload = function () {
    // 2. remove the small image
    document.getElementById(targetID).classList.remove('my-work-item_full-width-image--rubicon');
    // 3: apply the new class with the large image to the target div
    document.getElementById(targetID).classList.add(largeImageClass);
  };





}

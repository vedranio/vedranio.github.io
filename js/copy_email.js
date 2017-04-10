function copyEmailToClipBoard(targetClass, elementID, originalLabelClass, originalLabelContent)
{
  // copy to clipboard
  var clipboard = new Clipboard(targetClass);

  // if the copy succeeded
  clipboard.on('success', function(event) {
    // temporarily change the content and appearance of the thing the user clicked on
    var emailButton = document.getElementById(elementID);
    event.clearSelection();
    event.trigger.textContent = 'email copied';
    // then, after a timeout, set it back to it's original content and appearance
    console.log('coppied');
    window.setTimeout(function() {
        emailButton.className = originalLabelClass;
        event.trigger.textContent = originalLabelContent;
    }, 2000);
  });

  clipboard.on('error', function(event) {
    console.log('couldn copy');
  });
}

function mouseOver(targetElement){
    document.getElementById(targetElement).innerHTML = "copy email";
}

function mouseOut(targetElement, originalLabelContent) {
    document.getElementById(targetElement).innerHTML = originalLabelContent;
}

function touchEnd(targetElement, originalButtonClass){
    document.getElementById(targetElement).removeClass('hover');
}

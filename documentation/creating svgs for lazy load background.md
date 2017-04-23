This is the process for creating the SVG URI for blurred images used for lazy loading of background images.
The whole technique is described here: https://css-tricks.com/the-blur-up-technique-for-loading-background-images/

1. Create  a small version of the background (40px wide)
2. Create a BASE64 ecoded URI of that image (http://jpillora.com/base64-encoder/)
3. Insert that URI into the SVG code below, making sure to updated the dimensions and the viewbox

<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     width="3264" height="2448"
     viewBox="0 0 3264 2448">
  <filter id="blur" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feGaussianBlur stdDeviation="20 20" edgeMode="duplicate" />
    <feComponentTransfer>
      <feFuncA type="discrete" tableValues="1 1" />
    </feComponentTransfer>
  </filter>
  <image filter="url(#blur)"
         xlink:href="data:image/jpeg;base64,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"
         x="0" y="0"
         height="100%" width="100%"/>
</svg>

4. convert this SVG into an SVG URI (http://codepen.io/yoksel/details/JDqvs/)
5. Insert this SVG URI into the CSS URL field for the background images
    url(data:image/svg+xml;charset=utf-8,[SVG URI]);

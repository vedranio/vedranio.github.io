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
         xlink:href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAACigAwAEAAAAAQAAAB4AAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIAB4AKAMBEgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAMCAggICAgICAgHCAgIBwcHCAgHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwoHBwcICQkJBwcLDQoIDQcICQj/2wBDAQMEBAUFBgcFBQgICAcICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAj/3QAEAAX/2gAMAwEAAhEDEQA/APtG51SdeAwwOnBH8qoi6XOxnBOeMsMtweg6mgDMvfG90DgYPb72K5T4s2TpCHUlOeCpIOQwPUeqn9KAMPxj8bntrk2sqyGbbE5EY3qFnYhCXzt6hs85GPpXlF5aPJcwvIXdmtrUFmOSQLiZRk9Tjpk0Ae1fE67eyNusryTNcB9oiVVVdm3O4yN33DGFPer3x+8T2J+xSCUMsT3sTttf5XtWiWdcFQTsPHyg5xxmgCtbfD2+ljEvkEIVDAvI54PThEQfrX1dpHiS1+wx3PmRLai2WQyOyrGsYQZZixAUAdScUAf/0PqPxt8VtLdRBZxwRW++JzeThoHWYSDaYzNh3jZPlJyC27GMdfzXbTHlKPK5dsH7zSSBSjDBUSMwX+HhQANo9KAPs3x7+0lptxGLQXCGVJliOIpFiM5k8hYvtUm2ESF8gqWUDByRg18n3XhwyF3eV2M7KZlIVo5SpBXdER5fykZGFBzk9zQB9ew/sf6rqclpcTXkVnZwwbfIsG+03U5ZpWDyXccv2ZFCygqiRyFXUNvYcV8ga5e32nXely6fqd/ZmHR9J8xbWd7eOVo4pFQmCM/Z3SQKVkjkiYAKgUjnAB7/APtCfBuz0mSysp7vUo1vbmQpdTxPeWcd1PFFbRJcyiVGgeXy1cKgCSOzMQWfn7J/Ze8RzavollLqZS8lazsXkknhiJlme2VpZGRUWMMzkkFUXAOAFxigD4d+N3iLUdP0OztW1q1j0/abGXyrefz9QnWPHlG3kWR1tQoZ5BG2VwrGQqrKyf8ABUP4JnTbvTNTtLh1t7hZtPSzZi0dnLGkl0z2yEFBFcoriYMC+9IMHaMKAf/Z"
         x="0" y="0"
         height="100%" width="100%"/>
</svg>

4. convert this SVG into an SVG URI (http://codepen.io/yoksel/details/JDqvs/)
5. Insert this SVG URI into the CSS URL field for the background images
    url(data:image/svg+xml;charset=utf-8,[SVG URI]);

// get location
var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
// replace current_page with 'header'
var page = newURL.substring(newURL.lastIndexOf('/')+1, newURL.indexOf('.html'));
console.log(page);
newURL = newURL.replace(page, 'header');
console.log(newURL);

function setHeader(hFile) {
   document.querySelector("header").innerHTML = hFile;
}

document.addEventListener(
   'DOMContentLoaded',
   () => {

      var req = new XMLHttpRequest();
      req.onload = function(){
         setHeader(this.responseText);
      };
      req.open('GET', newURL);
      req.send();

      // fetch("./header.html")
      //    .then(response => {
      //       return response.text()
      //    })
      //    .then(data => {
      //       document.querySelector("header").innerHTML = data;
      //    });

      fetch("./footer.html")
         .then(response => {
            return response.text()
         })
         .then(data => {
            document.querySelector("footer").innerHTML = data;
         });
   }
);


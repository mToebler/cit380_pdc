// get location
var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
// replace 'hireus' with 'header'
newURL = newURL.replace('hireus', 'header');
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


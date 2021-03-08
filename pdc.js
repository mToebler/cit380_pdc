function getURL(neededPage) {
   // get location
   var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
   // replace current_page with 'header'
   var page = newURL.substring(newURL.lastIndexOf('/') + 1, newURL.indexOf('.html'));
   console.log(page);
   newURL = newURL.replace(page, neededPage);
   console.log(newURL);
   return newURL;
}

// To support older browsers, falling back to pure javascript
function setHeader(hFile) {
   document.querySelector("header").innerHTML = hFile;
}

function setFooter(fFile) {
   // sets the proper year in footer
   var curYear = new Date();
   fFile.replace('$YEAR', curYear.getFullYear().toString());
   document.querySelector("footer").innerHTML = fFile;
}

document.addEventListener(
   'DOMContentLoaded',
   () => {

      var req = new XMLHttpRequest();
      req.onload = function() {
         setHeader(this.responseText);
      };
      req.open('GET', getURL('header'));
      req.send();

      var fReq = new XMLHttpRequest();
      fReq.onload = function () {
         setFooter(this.responseText);
      };
      fReq.open('GET', getURL('footer'));
      fReq.send();

      /// can't use es6+ here.
      // fetch("./header.html")
      //    .then(response => {
      //       return response.text()
      //    })
      //    .then(data => {
      //       document.querySelector("header").innerHTML = data;
      //    });

      // fetch("./footer.html")
      //    .then(response => {
      //       return response.text()
      //    })
      //    .then(data => {
      //       document.querySelector("footer").innerHTML = data;
      //    });
   }
);


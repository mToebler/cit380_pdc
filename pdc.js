// var to that stores page name
let page = "";
let menuOpen = false;

// helper function, returns the current url with a variable
// string concated at the end
function getURL(neededPage) {
   // get location
   var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
   // replace current_page with 'header'
   page = newURL.substring(newURL.lastIndexOf('/') + 1, newURL.indexOf('.html'));
   console.log(page);
   newURL = newURL.replace(page, neededPage);
   console.log(newURL);
   return newURL;
}

// To support older browsers, falling back to pure javascript
function setHeader(hFile) {
   document.querySelector("header").innerHTML = hFile;
   let menuDiv = document.querySelector('div.ul_container.nav');
   menuDiv.style.display = "none";
   document.querySelector('#menu').addEventListener('click', toggleMenu, false); 
}

// sets the footer
function setFooter(fFile) {
   // sets the proper year in footer
   var curYear = new Date();
   console.log(fFile.replace('$YEAR', curYear.getFullYear().toString()));
   document.querySelector("footer").innerHTML = fFile.replace('$YEAR', curYear.getFullYear().toString());
   
}

function toggleMenu(ev) {
   let menuDiv = document.querySelector('#menu');
   let menuNav = document.querySelector('div.ul_container.nav');
   console.log('toggleMenu start:', menuNav);
   if(menuOpen) {
      menuNav.style.display = "none";
      menuDiv.innerHTML = "<span>&#9776;</span>";
      let adminLIs = document.querySelectorAll('.sub_menu li');
      console.log('Mr. Operator!!', adminLIs);
      adminLIs.forEach(element => {
         console.log('Choo!', element);
         element.style.display = "none";
         menuOpen = false;
      })
   } else {
      menuNav.style.display = "initial";
      menuNav.style.zIndex = "100";
      menuDiv.textContent = "x";
      menuDiv.addEventListener('click', toggleMenu);
      menuOpen = true;
   }
}

function displayAdmin() {   
   let adminLIs = document.querySelectorAll('.sub_menu li');
   console.log('Mr. Operator!!', adminLIs);
   adminLIs.forEach(element => {
      console.log('Choo!', element);
      element.style.display = "contents";
      element.style.zIndex = "100";
      // element will be a collection of li
      // for(eLi of element) {
      //    console.log('Choo!', eLi);
      //    eLi.style.display = "contents";
      // }
   });
}

function changeLog(addStr) {
   let text = document.querySelector('netTest').innerText;
   text += addStr;
   document.querySelector('netTest').innerText = text;
}

// coutesy of GoogleChrome github repository
// this spits out the info found within the navigator object
function logNetworkInfo() {
   // Network type that browser uses
   changeLog('         type: ' + navigator.connection.type + '\n');
 
   // Effective bandwidth estimate
   changeLog('     downlink: ' + navigator.connection.downlink + ' Mb/s' + '\n');
 
   // Effective round-trip time estimate
   changeLog('          rtt: ' + navigator.connection.rtt + ' ms' + '\n');
 
   // Upper bound on the downlink speed of the first network hop
   changeLog('  downlinkMax: ' + navigator.connection.downlinkMax + ' Mb/s' + '\n');
 
   // Effective connection type determined using a combination of recently
   // observed rtt and downlink values: ' +
   changeLog('effectiveType: ' + navigator.connection.effectiveType + '\n');
   
   // True if the user has requested a reduced data usage mode from the user
   // agent.
   changeLog('     saveData: ' + navigator.connection.saveData + '\n');
   
   // Add whitespace for readability
   //changeLog('');
 }
 

 // adds all the listeners needed in the page.
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

      // if current page is network_health, runs the logNetworkInfo function
      if(page == 'network_health') {
         // run network diagnostics
         navigator.connection
         navigator.connection.addEventListener('change', logNetworkInfo);


         logNetworkInfo();
      }

      




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


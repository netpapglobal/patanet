

// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places">
   
let map;
let latitude;
let longitude;
let maps;
let places;
let infoWindow;
let markers = [];
let autocomplete;
let lat;
const countryRestrict = { country: "ke" };
const MARKER_PATH =
  "https://developers.google.com/maps/documentation/javascript/images/marker_green";
const hostnameRegexp = new RegExp("^https?://.+?/");
const counties = {
  nrb: {
    center: { lat: -1.3, lng: 36.8172 },
    zoom: 4,
  },
  km: {
    center: { lat: -1.17, lng: 36.8356 },
    zoom: 3,
  },
  nk: {
    center: { lat: -0.28, lng: 36.0667 },
    zoom: 3,
  },
  mb: {
    center: { lat: -4.0500, lng: 39.6667 },
    zoom: 5,
  },
  tr: {
    center: { lat: 1.65, lng: 39.6518 },
    zoom: 5,
  },
  mx: {
    center: { lat: 23.6, lng: -102.5 },
    zoom: 4,
  },
  nz: {
    center: { lat: -40.9, lng: 174.9 },
    zoom: 5,
  },
  kd: {
    center: { lat: 2.09, lng: 36.7820 },
    zoom: 5,
  },
  
  ke: {
    center: { lat: 0.0236, lng: 37.9062 },
    zoom: 3,
  },
  
};




 //MAP INIT FUNCTION CODE
function initMap() {
  myLatlng = { lat: 0.0236, lng: 37.9062 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: counties["ke"].zoom,
    center: myLatlng,
    mapTypeControl: true,
    panControl: true,
    zoomControl: true,
    streetViewControl: true,
 
  });
  infoWindow = new google.maps.InfoWindow({
    content: document.getElementById("info-content" ,"Click the map to get Lat/Lng!") ,
    //content: 'your pos' + pos + "<br><br>" + "<button>Share location</button>",
    position: myLatlng,
    
    
    
  });
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(map);
  });
  // Create the autocomplete object and associate it with the UI input control.
  // Restrict the search to the default country, and to place type "cities".
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    {
      types: ["(cities)"],
      componentRestrictions: countryRestrict,
    }
  );
  
  places = new google.maps.places.PlacesService(map);
  autocomplete.addListener("place_changed", onPlaceChanged);
  // Add a DOM event listener to react when the user selects a county.
  document
    .getElementById("county")
    .addEventListener("change", setAutocompleteCounty);
}
window.initMap = initMap;

// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
function onPlaceChanged() {
  const place = autocomplete.getPlace();
  
 
  if (place.geometry && place.geometry.location) {
    map.panTo(place.geometry.location);
    map.setZoom(15);
    search();
  } else {
    document.getElementById("autocomplete").placeholder = "Enter a city";
  }
  
  
}

// Search for isp in the selected county, within the viewport of the map.
function search() {
  const search = {
    bounds: map.getBounds(),
    types: ["telecommunication"],
    keyword: 'internet'
  };
 
  places.nearbySearch(search, (results, status, pagination) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      clearResults();
      clearMarkers();
 
      // Create a marker for each isp found, and
      // assign a letter of the alphabetic to each marker icon.
      for (let i = 0; i < results.length; i++) {
        const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
        const markerIcon = MARKER_PATH + markerLetter + ".png";
 
        // Use marker animation to drop the icons incrementally on the map.
        markers[i] = new google.maps.Marker({
          position: results[i].geometry.location,
          animation: google.maps.Animation.DROP,
          icon: markerIcon,
        });
        // If the user clicks a isp marker, show the details of that isp
        // in an info window.
        markers[i].placeResult = results[i];
        google.maps.event.addListener(markers[i], "click", showInfoWindow);
        setTimeout(dropMarker(i), i * 100);
        addResult(results[i], i);
      }
    }
  });
}
 
function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    if (markers[i]) {
      markers[i].setMap(null);
    }
  }
 
  markers = [];
}
 
// Set the county restriction based on user input.
// Also center and zoom the map on the given country.
function setAutocompleteCounty() {
  const country = document.getElementById("county").value;
 
  if (county == "all") {
    autocomplete.setComponentRestrictions({ country: [] });
    map.setCenter({ lat: 0.0236, lng: 37.9062 });
    map.setZoom(2);
  } else {
    autocomplete.setComponentRestrictions({ country: country });
    map.setCenter(countries[country].center);
    map.setZoom(countries[country].zoom);
  }
 
  clearResults();
  clearMarkers();
}
 
function dropMarker(i) {
  return function () {
    markers[i].setMap(map);
  };
}
 
function addResult(result, i) {
  const results = document.getElementById("results");
  const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
  const markerIcon = MARKER_PATH + markerLetter + ".png";
  const tr = document.createElement("tr");
 
  tr.style.backgroundColor = i % 2 === 0 ? "#F0F0F0" : "#FFFFFF";
  tr.onclick = function () {
    google.maps.event.trigger(markers[i], "click");
  };
 
  const iconTd = document.createElement("td");
  const nameTd = document.createElement("td");
  const icon = document.createElement("img");
  //another icon
  const Copy = document.createElement("img");
 
  icon.src = markerIcon;
  // another icon
  Copy.src = markerIcon;
  icon.setAttribute("class", "placeIcon");
  icon.setAttribute("className", "placeIcon");
 
  const name = document.createTextNode(result.name);
 
  iconTd.appendChild(icon);
  //iconTd.appendChild(Copy);
  nameTd.appendChild(name);
  tr.appendChild(iconTd);
  tr.appendChild(nameTd);
  results.appendChild(tr);
}
 
function clearResults() {
  const results = document.getElementById("results");
  
 
  while (results.childNodes[0]) {
    results.removeChild(results.childNodes[0]);
  }
}
 
// Get the place details for an isp. Show the information in an info window,
// anchored on the marker for the isp that the user selected.
function showInfoWindow() {
  const marker = this;
 
  places.getDetails(
    { placeId: marker.placeResult.place_id },
    (place, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
      }

 
      infoWindow.open(map, marker);
      buildIWContent(place);
    }
    
  );

}
 
// Load the place information into the HTML elements used by the info window.
function buildIWContent(place) {
  
  document.getElementById("iw-icon").innerHTML =
    '<img class="hotelIcon" ' + 'src="' + place.icon + '"/>';
    //copy coordinates to clipboard
    //document.getElementById("iw-Copy").innerHTML =
    //'<img class="hotelIcon" ' + 'src="' + place.icon + '"/>';
    //end copy coordinates to clipboard
  document.getElementById("iw-url").innerHTML ='<b><a href="' + place.url + '">' + place.name + "</a></b>";

    //copy button
    //document.getElementById("iw-Copy").innerHTML.share = window.open('//www.twitter.com/share?url= '  + place.url );
    document.getElementById("iw-Copy").innerHTML ='<b><b>share location of:</b> \n<a href="//www.twitter.com/share?url=' +place.url + ' Hey! i would like internet at this location" >' + place.name + "</a></b>";
    //document.getElementById("iw-Copy").innerHTML ='<b><b>share location of:</b> \n<a href="https://web.whatsapp.com/share?url=' +place.url + ' Hey! i would like internet at this location" >' + place.name + "</a></b>";
    //var lat= $ (".btn").attr("place.url");
    //end copy button
    
  document.getElementById("iw-address").textContent = place.vicinity;
  if (place.formatted_phone_number) {
    document.getElementById("iw-phone-row").style.display = "";
    document.getElementById("iw-phone").textContent = place.formatted_phone_number;
  } else {
    document.getElementById("iw-phone-row").style.display = "none";
  }
 
  // Assign a five-star rating to the isp, using a black star ('✭')
  // to indicate the rating the isp has earned, and a white star ('✩')
  // for the rating points not achieved.
  if (place.rating) {
    let ratingHtml = "";
 
    for (let i = 0; i < 5; i++) {
      if (place.rating < i + 0.5) {
        ratingHtml += "✩";
      } else {
        ratingHtml += "✭";
      }
 
      document.getElementById("iw-rating-row").style.display = "";
      document.getElementById("iw-rating").innerHTML = ratingHtml;
    }
  } else {
    document.getElementById("iw-rating-row").style.display = "none";
  }
 
  // The regexp isolates the first part of the URL (domain plus subdomain)
  // to give a short URL for displaying in the info window.
  if (place.website) {
    let fullUrl = place.website;
    let website = String(hostnameRegexp.exec(place.website));
 
    if (!website) {
      website = "http://" + place.website + "/";
      fullUrl = website;
    }
 
    document.getElementById("iw-website-row").style.display = "";
    document.getElementById("iw-website").textContent = website;
  } else {
    document.getElementById("iw-website-row").style.display = "none";
  }
//location share//////////////////////////////////////////-----//////////////////////////////////////
  if (place.share) {
    let fullUrl = place.share;
    let share = String((place.share));
 
    
      fullUrl = share;
 
    document.getElementById("iw-share-row").style.display = "";
    document.getElementById("iw-Copy").textContent = share;
  } else {
    document.getElementById("iw-share-row").style.display = window.open('//www.twitter.com/share?url= '  + place.url );
  }
  
}

function share(markers) {
  var url = location.href.replace(/#.*$/,'') + '#';
  // swap this for something less terrible:
  fullUrl += JSON.stringify({ m:markers, w:infoWindow });
  void(prompt('', gApplication.geometry().getPlace()));
  shorten(url, function(short) {
    window.open('//www.twitter.com/share?url=' + encodeURIComponent(short));
  });
}

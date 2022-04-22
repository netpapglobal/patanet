<?php

//if (session_status() !== PHP_SESSION_ACTIVE) {session_start();}
if(session_id() == '' || !isset($_SESSION)){session_start();}

?>

<!DOCTYPE html>
<html>
  <head>
    <title>NetpapGlobal live</title>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    <link href="output.css" rel="stylesheet">
    
    <!-- jsFiddle will insert css and js -->
  </head>

  <body>
    <div class="isp-search">
      <div id="findisp">Find ISP in:</div>
 
      <div id="locationField"  >
        <input id="autocomplete" placeholder="Enter a city" type="text" style="background-color: rgb(129, 118, 118);" />
        
      </div>
 
      <div id="controls">
        <select id="counties">
          <option value="all">All</option>
          <option value="ke" selected>Kenya</option>
          <!--<option value="mb">Mombasa</option>
          <option value="kw">Kwale</option>
          <option value="ki">Kilifi</option>
          <option value="tr">Tana-River</option>
          <option value="lm">Lamu</option>
          <option value="tt">Taita-Taveta</option>
          <option value="Ga">Garissa</option>
          <option value="Wr">Wajir</option>
          <option value="md">Mandera</option>
          <option value="Mr">Mandera</option>
          <option value="il">Isiolo</option>
          
          <option value="mr">Meru</option>
          <option value="tn">Tharaka-Nithi</option>
          <option value="eb">Embu</option>
          <option value="ki">Kitui</option>
          <option value="mk">Machakos</option>
          <option value="mi">Makueni</option>
          <option value="ny">Nyandarua</option>
          <option value="ni">Nyeri</option>
          <option value="ki">Kirinyaga</option>
          <option value="mu">Murang'a</option>
          <option value="km">Kiambu</option>
          <option value="trk">Turkana</option>
          <option value="wp">West-pokot</option>
          <option value="sa">Samburu</option>
          <option value="tna">Trans-nzoia</option>
          <option value="ua">Uasin-Gishu</option>
          <option value="eg">Elgeiyo-Marakwet</option>
          <option value="nd">Nandi</option>
          <option value="br">Baringo</option>
          <option value="lk">Laikipia</option>
          <option value="nk">Nakuru</option>
          <option value="nkr">Narok</option>
          <option value="kd">Kajiado</option>
          <option value="kr">Kericho</option>
          <option value="bm">Bomet</option>
          <option value="km">Kakamega</option>
          <option value="vh">Vihiga</option>
          <option value="bmg">Bungoma</option>
          <option value="bs">Busia</option>
          <option value="sy">Siaya</option>
          <option value="ksm">Kisumu</option>
          <option value="Hba">Homabay</option>
          <option value="mg">Migori</option>
          <option value="ks">Kisii</option>
          <option value="nyr">Nyamira</option>
          <option value="nrb">Nairobi</option>-->
        </select>
      </div>
    </div>
 
    <div id="map"></div>
 
    <div id="listing">
      <table id="resultsTable">
        <tbody id="results"></tbody>
      </table>
    </div>
 
    <div style="display: none">
      <div id="info-content">
        <table>
          <tr id="iw-url-row" class="iw_table_row">
            <td id="iw-icon" class="iw_table_icon"></td>
            <td id="iw-url"></td>
          </tr>
          <tr id="iw-address-row" class="iw_table_row">
            <td class="iw_attribute_name">Address:</td>
            <td id="iw-address"></td>
          </tr>
          <tr id="iw-phone-row" class="iw_table_row">
            <td class="iw_attribute_name">Telephone:</td>
            <td id="iw-phone"></td>
          </tr>
          <tr id="iw-rating-row" class="iw_table_row">
            <td class="iw_attribute_name">Rating:</td>
            <td id="iw-rating"></td>
          </tr>
          <tr id="iw-website-row" class="iw_table_row">
            <td class="iw_attribute_name">Website:</td>
            <td id="iw-website"></td>
          </tr>
          <tr id="iw-url-row" class="iw_table_row">
            <td id="iw-Copy",  class="iw-url">Share location</td>
          </tr>
          <tr id="iw-url-row" class="iw_table_row">
            <td id="iw-CopyB"> <button class="btn" attr-lat="" attr-lgn="" >Copy coordinates</button></td>
        
          </tr>
        </table>
      </div>
    </div>
    
    
 
    <!-- Async script executes immediately and must be after any DOM elements used in callback. -->
    <div id="map"></div>
    <div id="infowindow-content">
      <img id="place-icon" src="" height="16" width="16">
      <span id="place-name"  class="title"></span><br>
      Place ID <span id="place-id"></span><br>
      <span id="place-address"></span>
    </div>
    
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&&libraries=places&callback=initMap"
        async defer></script>
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&libraries=places,geometry&v=weekly&channel=2"
      async
    ></script>
    <script src="index.js"></script>
    <script>
      $(document).foundation();
    </script>
    
  </body>
</html>
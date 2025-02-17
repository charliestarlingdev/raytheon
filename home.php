<!DOCTYPE html>
<html>

<head>
    <title>Home Page</title>
    <link rel="stylesheet" href="styles/desktop.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

    <script defer src="script/map.js"></script>
    <?php include "./includes/navbar.php" ?>

</head>

<body>

<div class="content-wrapper">
    <div class="primary">
        <div class="search-bar-container">
            <label for="search-bar">Find Product: </label>
            <input type="text" placeholder="Search" name="search-bar">
        </div>
        <div class="geographic-container">
            <h1>Geogrpahic Coverage</h1>
            
        </div>
        <div class="new-container">
            <h1>Section for More Data</h1>
            
        </div>
    </div>

    <div class="secondary">
        <div id="map-container">

        </div>
    </div>

    <div class="tertiary">
        <div class="missions-container">
            <h1>Missions</h1>
            
        </div>
        <div class="histogram-container">
            <h1>Histogram Data</h1>
            
        </div>
   </div>
</div>

</body>

</html>

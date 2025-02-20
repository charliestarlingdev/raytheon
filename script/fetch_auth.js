function fetchProducts(accessToken) {
    const raw = {
        size: 5,
        keywords: ""
    };

    // Send the request to your backend API
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/fetch-products", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // Done processing
            if (xhr.status === 200) {
                var result = JSON.parse(xhr.responseText);
                console.log("✅ Product Data:", result);
            } else {
                console.error("❌ Error fetching products:", xhr.status, xhr.statusText);
            }
        }
    };

    // Send the access token to your backend
    xhr.send(JSON.stringify({ accessToken }));
}

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Authorization", "Basic c2NpLXRvb2xzZXQ6c3Q=");

var urlencoded = new URLSearchParams();
urlencoded.append("grant_type", "password");
urlencoded.append("username", "hallam2");
urlencoded.append("password", "2513@5De");

var xhr = new XMLHttpRequest();
xhr.open("POST", "https://hallam.sci-toolset.com/api/v1/token", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("Authorization", "Basic c2NpLXRvb2xzZXQ6c3Q=");

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) { // Done processing
        if (xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            if (result.access_token) {
                console.log("✅ Access Token:", result.access_token);
                fetchProducts(result.access_token);
            } else {
                console.error("❌ Failed to get access token:", result);
            }
        } else {
            console.error("❌ Token fetch error:", xhr.status, xhr.statusText);
        }
    }
};

xhr.send(urlencoded);


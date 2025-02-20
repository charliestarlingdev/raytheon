function fetchProducts(accessToken, refreshToken) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`); // Ensure correct format
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      "size": 5,
      "keywords": ""
    });
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    fetch("https://hallam.sci-toolset.com/discover/api/v1/products/search", requestOptions)
      .then((response) => {
        if (response.status === 401) {
          console.error("🔴 Access token expired. Refreshing...");
          return refreshAccessToken(refreshToken).then((newToken) => fetchProducts(newToken, refreshToken));
        }
        return response.json();
      })
      .then((result) => console.log("✅ API Response:", result))
      .catch((error) => console.error("Error fetching products:", error));
  }
  
  // 🔄 Refresh Access Token if Expired
  function refreshAccessToken(refreshToken) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Basic c2NpLXRvb2xzZXQ6c3Q="); // Ensure this matches Postman
  
    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "refresh_token");
    urlencoded.append("refresh_token", refreshToken);
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };
  
    return fetch("https://hallam.sci-toolset.com/api/v1/token", requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to refresh token");
        return response.json();
      })
      .then((result) => {
        console.log("🔄 New Access Token:", result.access_token);
        return result.access_token;
      })
      .catch((error) => console.error("Error refreshing token:", error));
  }
  
  // 🚀 Fetch Initial Access Token
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", "Basic c2NpLXRvb2xzZXQ6c3Q=");
  
  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "password");
  urlencoded.append("username", "hallam2");
  urlencoded.append("password", "2513@5De");
  
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow"
  };
  
  fetch("https://hallam.sci-toolset.com/api/v1/token", requestOptions)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch token");
      return response.json();
    })
    .then((result) => {
      console.log("🟢 Access Token:", result.access_token);
      console.log("🟢 Refresh Token:", result.refresh_token);
      fetchProducts(result.access_token, result.refresh_token);
    })
    .catch((error) => console.error("Error fetching token:", error));
  
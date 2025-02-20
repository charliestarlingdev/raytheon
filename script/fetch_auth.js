async function fetchProducts(accessToken) {
    try {
        const response = await fetch("http://localhost:5000/fetch-products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ accessToken }) // Send access token to backend
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        // Initialize an array to store product IDs
        let productIds = [];

        // Extract and store product IDs
        if (result.results && result.results.searchresults) {
            productIds = result.results.searchresults.map(product => product.id);
            console.log("Stored Product IDs:", productIds);
        } else {
            console.error("Unexpected response structure:", result);
        }

        // Now you can iterate over productIds later
        return productIds;

    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

async function fetchAccessToken() {
    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "password");
    urlencoded.append("username", "hallam2");
    urlencoded.append("password", "2513@5De");

    try {
        const response = await fetch("https://hallam.sci-toolset.com/api/v1/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic c2NpLXRvb2xzZXQ6c3Q="
            },
            body: urlencoded
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        if (result.access_token) {
            console.log("Access Token:", result.access_token);
            fetchProducts(result.access_token);
        } else {
            console.error("Failed to get access token:", result);
        }
    } catch (error) {
        console.error("Token fetch error:", error);
    }
}

// Call the function to fetch the access token
fetchAccessToken();

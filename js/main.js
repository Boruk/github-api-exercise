import getDataFromUrl from './apicall.js';

(() => {
    let repos = document.getElementsByTagName('repos');

    for (let repoItem of repos) {
        let user = repoItem.getAttribute("data-user");

        getDataFromUrl(`https://api.github.com/users/${user}/repos?access_token=2924ffb322736ce620b718dce95a7ccd7315555e`)
            .then((response) => {
                let conditionDate = new Date(repoItem.getAttribute("data-update")),
                    html;

                // make sure that the next date after this will be the next day
                conditionDate.setHours(23, 59, 59);

                html = `<div class="card-header"><h2 class="card-title">${user}</h2><h3 class="card-subtitle">Repozytoria zaktualizowane po: ${conditionDate.toLocaleDateString()}</h3></div>`
                html += `<div class="card-content"><table><thead>`;
                html += `<tr><th>Nazwa</th><th>Opis</th><th>Data aktualizacji</th><th>Link</th></tr>`;
                html += `</thead><tbody>`;

                for (let item of response) {
                    let updateDate = new Date(item.updated_at);
                    if (updateDate > conditionDate) {
                        html += `<tr>`;
                        html += `<td>${item.name}</td>`;
                        html += `<td>${item.description || ''}</td>`;
                        html += `<td>${updateDate.toLocaleDateString()}</td>`;
                        html += `<td><a class="button" href="${item.html_url}">link</a></td>`;
                        html += `</tr>`;
                    }
                }
                html += `</tbody></table></div>`;
                html += `<div class="card-footer">Liczba wyników: ${response.length}</div>`;

                let newEl = document.createElement('div');
                newEl.setAttribute('class', 'card');
                newEl.innerHTML = html;
                repoItem.parentNode.replaceChild(newEl, repoItem);
            })
            .catch((error) => {
                alert('Wystąpił błąd: ' + error);
            });
    };
})();
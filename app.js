// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js');
//     });
// }


// Custom HTML element for embedding SOP processes in larger documents

class SopProcess extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.src = this.getAttribute('src');
    }

    get src() {
        return this.getAttribute('src');
    }

    set src(newValue) {
        this.setAttribute('src', newValue);
      }
}

customElements.define('sop-process', SopProcess);

// Navigation drawer animation

const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));
topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
    drawer.open = !drawer.open;
});

// Global variables to track application state

let currentListItemCategory = '';
let selectedCategory = '';
let selectedLanguage = 'en';

UpdateContent('');

function UpdateContent(category) {
    closeSop();

    selectedCategory = category;
    currentListItemCategory = '';

    const menu = window.document.getElementById('menu');
    
    let active = '';
    if (selectedCategory === '') active = ' mdc-list-item--activated';

    menu.innerHTML = `
        <a class="mdc-list-item ${active}" href="#" aria-current="page" onclick="UpdateContent('');">
        <i class="material-icons mdc-list-item__graphic" aria-hidden="true">bookmarks</i>
        <span class="mdc-list-item__text"><span lang="en">All documents</span><span lang="fr">Tous les documents</span></span>
        </a>
    `;

    let contentVersion = '';
    let contentDate = '';

    fetch('./content.json').then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          response.json().then(
              function(data) {
                  documents.innerHTML = data.documents.map(createListItem).join('\n');
        
              });
           }).catch(function(err) {
              console.log('Fetch Error :-S', err);
        });
    documents.innerHTML += '</ul>';

    translateContent(selectedLanguage);

    updateVersionInfromation
}

function openSop(name) {
    fetch(`./content/${name}`).then(
        (response) => response.text()).then(
            (html) => {
                const sop = document.getElementById('sop');
                const sopList = document.getElementById('sopList');
                sop.innerHTML = html;
                sopList.hidden = true;
                var embeddedSops = document.querySelectorAll("sop-process");         
                let items = Array.from(embeddedSops).map(elem => {
                const incName = elem.src;
                fetch(`./content/${incName}.inc`).then(
                    (response) => response.text(). then(
                        (incHtml) => {
                            elem.innerHTML = incHtml;
                        }  
                    )
                )
            }
        )
    });
}

function closeSop() {
    const sop = document.getElementById('sop');
    const sopList = document.getElementById('sopList');
    sop.innerHTML = '';
    sopList.hidden = false;
}

function createListItem(document) {
 

    if (document.language !== selectedLanguage) return;

    let listItemMarkup = '';
    let menuItemMarkup = '';
    let linkMarkup = `onclick="openSop('${document.url}');"`;
    let currentCategory = escape(document.category);

    if (document.visible === false) {
        return;
    }

    if (document.available === false) {
        linkMarkup = `style="color: grey;"`;
    }

    if (currentCategory !== currentListItemCategory) {
     
        if (currentListItemCategory !== '') {
            listItemMarkup = 
            `</ul>`;
        } 


        if (currentCategory === selectedCategory || selectedCategory === '') {
           
            listItemMarkup = 
            `<h3 class="mdc-list-group__subheader">${document.category}</h3>
            <ul class="mdc-list mdc-list--two-line">`
        }
        
        let activated = '';
        if (currentCategory === selectedCategory) activated = '  mdc-list-item--activated';

        menuItemMarkup = `
            <a class="mdc-list-item ${activated}" href="#" aria-current="page" onclick="UpdateContent('${escape(document.category)}');">
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">${document.icon}</i>
              <span class="mdc-list-item__text">${document.category}</span>
            </a>
            `;
   
        const menu = window.document.getElementById('menu');
        menu.innerHTML += menuItemMarkup;

        currentListItemCategory = currentCategory;
    }
  
    if (currentCategory === selectedCategory || selectedCategory === '') {
  
        listItemMarkup += 
            `<li class="mdc-list-item" ${linkMarkup}>
                <span style="margin-right:20px;">
                    <i class="material-icons mdl-list__item-avatar">${document.icon}</i>
                </span>
                <span class="mdc-list-item__text">
                    <span class="mdc-list-item__primary-text">${document.number}: ${document.title}</span>
                    <span class="mdc-list-item__secondary-text">${document.author} <em>(Version: ${document.version} - ${document.date})</em></span>
                </span>
                <li role="separator" class="mdc-list-divider"></li>
            </li>`;
        }
    
    return listItemMarkup;
}

function translateContent(lang) {
    let content = document.querySelectorAll('span[lang]');
    Array.from(content).map(item => {
        if (item.attributes.lang.value === lang) {
            item.hidden = false;
        } else {
            item.hidden = true;
        }
    });

    const frenchLink = document.getElementById('french-link');
    const englishLink = document.getElementById('english-link');

    if (lang === 'fr') {
        window.document.title = "Documents LAKANA";
        englishLink.classList.remove("mdc-list-item--activated");
        frenchLink.classList.remove("mdc-list-item--activated");
        frenchLink.classList.add("mdc-list-item--activated");
    } else {
        window.document.title = "LAKANA Documents";
        frenchLink.classList.remove("mdc-list-item--activated");
        englishLink.classList.remove("mdc-list-item--activated");
        englishLink.classList.add("mdc-list-item--activated");
    }
    selectedLanguage = lang;
}

function setLanguage(language) {
    selectedLanguage = language;
    selectedCategory = '';
    UpdateContent('');
    translateContent(language);
}




// Déclaration variables
let mediasByPopularity;
let mediasByDate;
let mediasByTitle;

//DOM elements
const gallerySection = document.querySelector(".photographer-gallery");
const filterBtn = document.querySelector("#filterBtn");

/**
 * this function displays medias by filter :popularity 
 */
function filterByPopularity() {
    let media = mediaDatas;
    
    mediasByPopularity = media.sort(function compare(a,b) {
        if(a.likes > b.likes) {
            return -1;
        }
        if(a.likes < b.likes) {
            return 1;
        }
        return 0;
    });

    gallerySection.innerHTML = "";
    // Display media with filter 
    displayGalleryPhotographer(mediasByPopularity);
    closeFilterMenu();
    // eslint-disable-next-line
    filterBtn.innerHTML = 'Popularité <em class="fa-solid fa-chevron-down"></em>';
    mediaDatas = mediasByPopularity;
    gallerySection.setAttribute("aria-labelledby", "popularity");
    let liPopu = document.querySelector("#popularity");
    liPopu.setAttribute("aria-selected", "true");
    
}

/**
 * this function displays medias by filter : date
 */
function filterByDate () {
    let media = mediaDatas;
    // order by older to newer 
    mediasByDate = media.sort(function compare(a,b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return b - a;
    })

    gallerySection.innerHTML = "";
    // Display media with filter 
    displayGalleryPhotographer(mediasByDate);
    closeFilterMenu();
    // eslint-disable-next-line
    filterBtn.innerHTML = 'Date <em class="fa-solid fa-chevron-down"></em>';
    mediaDatas = mediasByDate;
    gallerySection.setAttribute("aria-labelledby", "date");
    let liDate = document.querySelector("#date");
    liDate.setAttribute("aria-selected", "true");
  
}

/**
 * this function displays medias by filter :title
 */
function filterByTitle () {
    let media = mediaDatas;
   
    mediasByTitle = media.sort(function compare(a,b) {
        a = a.title.toLowerCase();
        b = b.title.toLowerCase();

        if ( a < b ) {
            return -1;
        }
        if ( a > b ) {
            return 1;
        }
        return 0;
    });

    gallerySection.innerHTML = "";
    // Display media with filter 
    displayGalleryPhotographer(mediasByTitle);
    closeFilterMenu();
    // eslint-disable-next-line
    filterBtn.innerHTML = 'Titre <em class="fa-solid fa-chevron-down"></em>';                  
    mediaDatas = mediasByTitle;
    gallerySection.setAttribute("aria-labelledby", "title");
    let liTitle = document.querySelector("#title");
    liTitle.setAttribute("aria-selected", "true");
}


/**
 * This function displays medias with filter choosen
 * @param {Event} event 
 * @returns 
 */
function handleKeyDownEnterFilter (event) {
    let value= event.target.id;

    if (event.keyCode === 13) {
        switch(value) {
            case "popularity" :
                return filterByPopularity();  
                
            case "date":
                return filterByDate();

            case "title":
                return filterByTitle();
              
            default:
                console.log("il y a eu un pepin !", console.error());
        }
    } 
    
}






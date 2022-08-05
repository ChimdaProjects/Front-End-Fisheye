// trier par popularité
let mediasByPopularity;
let mediasByDate;
let mediasByTitle;
const gallerySection = document.querySelector(".photographer-gallery");
const filterBtn = document.querySelector('#filterBtn');

/**
 * this function displays medias by filter :popularity 
 */
function filterByPopularity() {
    let media = mediaDatas;
    console.log('media', media);
    console.log('filter popu');
    mediasByPopularity = media.sort(function compare(a,b) {
        if(a.likes > b.likes) {
            return -1;
        }
        if(a.likes < b.likes) {
            return 1;
        }
        return 0;
    });
    console.log('media filtré par popu', mediasByPopularity);
    
    gallerySection.innerHTML = "";
    // Display media with filter 
    displayGalleryPhotographer(mediasByPopularity);
    closeFilterMenu();
    filterBtn.innerHTML = 'Popularité';
    mediaDatas = mediasByPopularity;
    
    
}

/**
 * this function displays medias by filter : date
 */
function filterByDate () {
    let media = mediaDatas;
    // order by older to newer 
    mediasByDate = media.sort(function compare(a,b) {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        a = dateA;
        b = dateB;
        return b - a;
    })

    console.log('media filtré par dat', mediasByDate);
    gallerySection.innerHTML = "";
    // Display media with filter 
    displayGalleryPhotographer(mediasByDate);
    closeFilterMenu();
    filterBtn.innerHTML = 'Date';
    mediaDatas = mediasByDate;
}

/**
 * this function displays medias by filter :title
 */
function filterByTitle () {
    console.log("filter title");
    let media = mediaDatas;
   
    mediasByTitle = media.sort(function compare(a,b) {
        let titleA = a.title.toLowerCase();
        let titleB = b.title.toLowerCase();
        a = titleA;
        b = titleB;
   
        if ( a < b ) {
            return -1;
        }
        if ( a > b ) {
            return 1;
        }
        return 0;
    });
    console.log('media filtré par titre', mediasByTitle);
    gallerySection.innerHTML = "";
    // Display media with filter 
    displayGalleryPhotographer(mediasByTitle);
    closeFilterMenu();
    filterBtn.innerHTML = 'Titre';                  
    mediaDatas = mediasByTitle;
}
/**
 * This function displays medias with filter choosen
 * @param {Event} event 
 * @returns 
 */
function handleKeyDownEnterFilter (event) {
    console.log('enter filter')
    let value = event.target.id;
    console.log('value', value);

    if (event.keyCode === 13) {
        switch(value) {
            case 'popularity' :
                return filterByPopularity();  
                
            case 'date':
                return filterByDate();;

            case 'title':
                return filterByTitle();;

            default:console.log('il y a eu un pepin !', console.error());
        }
    }
    
}



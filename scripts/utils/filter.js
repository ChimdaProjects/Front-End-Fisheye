// trier par popularité
let mediasByPopularity;
let mediasByDate;
let mediasByTitle;
const gallerySection = document.querySelector(".photographer-gallery");
const filterBtn = document.querySelector('#filterBtn');
function filterByPopularity(media) {
    media = mediaDatas;
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
    //
    displayGalleryPhotographer(mediasByPopularity);
    closeFilterMenu();
    filterBtn.innerHTML = 'Popularité';
    mediaDatas = mediasByPopularity;
    
    
}

// trier par date
function filterByDate (media) {
    media = mediaDatas;
    // tri du plus récent au plus vieux
    mediasByDate = media.sort(function compare(a,b) {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        a = dateA;
        b = dateB;
        return b - a;
    })

    console.log('media filtré par dat', mediasByDate);
    gallerySection.innerHTML = "";
    //
    displayGalleryPhotographer(mediasByDate);
    closeFilterMenu();
    filterBtn.innerHTML = 'Date';
    mediaDatas = mediasByDate;
}

// trier par titre
function filterByTitle (media) {
    console.log("filter title");
    media = mediaDatas;
   
    mediasByTitle = media.sort(function compare(a,b) {
        if(a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
        }
        if(a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
        }
        return 0;
    });
    console.log('media filtré par titre', mediasByTitle);
    gallerySection.innerHTML = "";
    //
    displayGalleryPhotographer(mediasByTitle);
    closeFilterMenu();
    filterBtn.innerHTML = 'Titre';
    mediaDatas = mediasByTitle;
}



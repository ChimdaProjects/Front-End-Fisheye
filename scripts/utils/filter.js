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
    let newDate = media.forEach((elt)=> {
        let date = elt.date ;
        let dateNew = new Date(date);
        console.log('dateNew', dateNew)
        return {dateNew};
    })

   console.log('new date', newDate)

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



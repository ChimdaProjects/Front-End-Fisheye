// Initialisation des variables

let data;
let imgSelectedId;
let idPhotographer;
let photographerDatas;
let mediaDatas;
let mediaSelected
let currentIndex; 
let nextIndex;
let previousIndex;
let slidePrevious;
let slideNext;

const btnLeft = document.querySelector( "#leftBtn" );
const btnRight = document.querySelector( "#rightBtn" );
const containerModal = document.querySelector( "#main-wrapper" );
const main = document.querySelector("#main");

/**
 * Cette fonction permet de récupérer l'id dans l'url courante
 * @returns idPhotographer - id du photographe de la page affichée
 */
function getIdFromParams() {
    var url = document.location.href;
    const params = (new URL(url)).searchParams;
    idPhotographer = parseInt(params.get( "id" ));

    return idPhotographer;
}

/**
* 
* @param {number} idPhotographer - correspond à l'id du photographe de l'url
* @returns {object} correspond aux datas du photographe trouvé
*/
async function getPhotographersData(idPhotographer) {
    idPhotographer = getIdFromParams();
    try {
        const response = await fetch("./data/photographers.json");
        data = await response.json();

        // on cherche les datas du photographe correspondant à l id de l url
        photographerDatas = data.photographers.find(elt => elt.id == idPhotographer);

        // on cherche les medias correspondant au photographe recherché
        mediaDatas = data.media.filter(elt => elt.photographerId == idPhotographer)

        return {photographerDatas, mediaDatas};
   
    } catch (error) {
        console.log(error);
        return null;
    }     
}


/**
* Display the info of the concerned photographer
* @param {Object} photographer - photographer's datas
*/
async function displayHeaderPhotographer(photographer) {
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserHeaderPhotographer();
    photographerHeader.appendChild(userCardDOM);
}

/**
 * Display the media for the photographer concerned
 * @param {object} medias - all medias of the photographer concerned 
 */
async function displayGalleryPhotographer(medias) {
    const gallerySection = document.querySelector(".photographer-gallery");
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const galleryCardDOM = mediaModel.getMediaCardDOM();
        gallerySection.appendChild(galleryCardDOM);
    })
}

/**
 * This function opens the filter
 */
function displayFilterMenu() {
    const buttonFilterElt = document.querySelector(".filter-btn");
    buttonFilterElt.classList.toggle("hidden");
    if ( buttonFilterElt.classList =="filter-btn hidden" ) {
        buttonFilterElt.setAttribute( "aria-expended" , "true" );
    }
    const filterList = document.querySelector(".filter-list");
    filterList.classList.toggle("active");
}

/**
 * This function closes the filter
 */
function closeFilterMenu() {
    const filterList = document.querySelector(".filter-list");
    filterList.classList.remove("active");
    const buttonFilterElt = document.querySelector(".filter-btn");
    buttonFilterElt.classList.remove("hidden");
}
/**
 * This function totals all the likes of a photographer
 */
function counterLikes() {
    let totalLikes=0;
    const likesList = document.querySelectorAll(".card-likes");
    const containerLikes = document.querySelector(".total-likes");
    
    for ( let like of likesList ) {
        let valueLike = parseInt(like.dataset.value);
        totalLikes += valueLike;
    }

    containerLikes.innerHTML=`${totalLikes}`;
    return totalLikes;
}
/**
 * this function displays the daily rate
 * @param {*} data 
 */
function displayPriceDaily ( data ) {
    const containerPrice = document.querySelector(".daily-price");
    const {price}= data.photographerDatas;
    containerPrice.innerHTML = `${price}€ / jour`

}

/** LiGHTBOX */

/**
 * this function opens the lightbox when the user clicks on a media
 * @param { Event } e element clicked
 */
function openModalLightbox( mediaIdSelected ) {
    containerModal.style.display ="flex";
    btnLeft.style.display ="flex";
    btnRight.style.display="flex";
    let mediaSelected = mediaDatas.find(elt => elt.id == mediaIdSelected);
    imgSelectedId = mediaIdSelected;
    currentIndex = mediaDatas.map(media =>media.id).indexOf(imgSelectedId);
    let mediaModel = mediaFactory(mediaSelected);
    mediaModel.getMediaCardLightbox();  
    main.style.display =  "none" ;
    btnRight.focus();

    return mediaSelected;

}

/**
 * This function closed the lightbox
 */
function closeModalLb() {
    const containerModal = document.querySelector( "#main-wrapper" );
    containerModal.style.display ="none";
    main.style.display =  "block" ;
    let caroussel = document.querySelector(".carousel");
    caroussel.innerHTML="";
}


/**
 * This function displays the previous media when you clicked on the left arrow of the lightbox
 */
function displayPreviousMedia () {
    let liMedia = document.querySelector(".img-container");
    liMedia.remove();
    currentIndex = mediaDatas.map(media =>media.id).indexOf(imgSelectedId);
    previousIndex = currentIndex - 1;
    // si l'index précedent est inférieur à 0 c a d on est sur la 1ère img affichée.
    if (previousIndex < 0) {
        currentIndex = (mediaDatas.length);
        previousIndex = currentIndex - 1;
        slidePrevious = mediaDatas[previousIndex];
        let mediaModel = mediaFactory(slidePrevious);
        mediaModel.getMediaCardLightbox();  
        imgSelectedId = mediaDatas[previousIndex].id;
    } else {
        slidePrevious = mediaDatas[previousIndex];
        let mediaModel = mediaFactory(slidePrevious);
        mediaModel.getMediaCardLightbox();  
        imgSelectedId = mediaDatas[previousIndex].id;
    }

    btnLeft.focus();

}

/**
 *  This function displays the previous media when you clicked on the right arrow of the lightbox
 */
function displayNextMedia () {
    console.log("click droite");
    let liMedia = document.querySelector(".img-container");
    liMedia.remove();
    currentIndex = mediaDatas.map(media =>media.id).indexOf(imgSelectedId);
    nextIndex = currentIndex + 1;
    // si l'index suivant est égal ou inférieur à la taille du tableau media
    if (nextIndex > 0 && nextIndex <= mediaDatas.length-1) {
        slideNext = mediaDatas[nextIndex];
        let mediaModel = mediaFactory(slideNext);
        mediaModel.getMediaCardLightbox();  
        imgSelectedId = mediaDatas[nextIndex].id;
        
    } else if (nextIndex > mediaDatas.length-1) {
        nextIndex = 0;
        slideNext = mediaDatas[nextIndex];
        let mediaModel = mediaFactory(slideNext);
        mediaModel.getMediaCardLightbox();  
        imgSelectedId = mediaDatas[nextIndex].id;
    }

    btnRight.focus();
 
}

/**
 * This function adds one like to the media clicked
 * @param {*} id - id de l'image cliquée
 */
function addLikes (id) {
    let imgSelected= mediaDatas.find(elt => elt.id == id);
    let mediaModel = mediaFactory(imgSelected);
    mediaModel.addOneLike();
    counterLikes(); 
}


// Accessibility

// Scroll through carousel images
function handleKeyDown(e) {
    console.log("keycode",e.key);
    // press the left arrow
    if(e.keyCode === 37) {
        displayPreviousMedia();
    }
    // press the right arrow
    if (e.keyCode === 39) {
        displayNextMedia();
    }
} 

// close modal with the user presses escape touch
function handleKeyDownClose(e) {
    if ( e.keyCode === 27) {
        closeModalLb();
    }
}

// open modal when the user presses enter touch
function handleKeyDownMedia(event, id) {
    if (event.keyCode === 13 ) {
        return openModalLightbox(id);
    }
}

// add a like when the user presses enter touch
function handleKeyDownEnterLikes (event, id) {
    if (event.keyCode === 13 ) {
        return addLikes(id);
    }
}

/**
 * Close the dropdown filter when the user clicks outside
 */
window.addEventListener("mouseup", closeFilterMenu);

/**
* Initialisation of the page photographer.html
*/
async function init() {
    data = await getPhotographersData();
    displayHeaderPhotographer(photographerDatas);
    displayGalleryPhotographer(mediaDatas);
    counterLikes();
    displayPriceDaily(data);
}

init()
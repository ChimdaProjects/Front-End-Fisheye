//Mettre le code JavaScript lié à la page photographer.html
// Initialisation des variables
let data;
let imgSelectedId;
let idPhotographer;
let photographerDatas;
let mediaDatas;

const btnLeft = document.querySelector('#leftBtn');
const btnRight = document.querySelector('#rightBtn');
btnLeft.addEventListener('click', displayPreviousMedia);
btnRight.addEventListener('click', displayNextMedia);
const containerModal = document.querySelector('#main-wrapper');

/**
 * Cette fonction permet de récupérer l'id dans l'url courante
 * @returns idPhotographer - id du photographe de la page affichée
 */
 function getIdFromParams() {
  var url = document.location.href;
  console.log('url courante : ', url);
  const params = (new URL(url)).searchParams;
  idPhotographer = parseInt(params.get('id'));
  console.log('id :', idPhotographer);

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
   console.log('data fetch : ', data);

   // on cherche les datas du photographe correspondant à l'id de l'url
  photographerDatas = data.photographers.find(elt => elt.id == idPhotographer);
   console.log('photographer datas :', photographerDatas);

  // on cherche les medias correspondant au photographe recherché
   mediaDatas = data.media.filter(elt => elt.photographerId == idPhotographer)
   console.log('media filtré', mediaDatas);

   return {photographerDatas, mediaDatas};
   
 } catch (error){
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
};

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
  }
  )

}

/**
 * This function opens the filter
 */
function displayFilterMenu() {
  const buttonFilterElt = document.querySelector(".filter-btn");
  buttonFilterElt.classList.toggle("hidden");
  if (buttonFilterElt.classList =="filter-btn hidden") {
    buttonFilterElt.setAttribute('aria-expended', 'true');
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
  
  for (let like of likesList) {
    let valueLike = parseInt(like.dataset.value);
    totalLikes += valueLike;
  }

  containerLikes.textContent=totalLikes;
  return totalLikes;
}
/**
 * this function displays the daily rate
 * @param {*} data 
 */
function displayPriceDaily (data) {
  const containerPrice = document.querySelector(".daily-price");
  const {price}= data.photographerDatas;
  containerPrice.innerHTML = `${price}€ / jour`

}

/** LiGHTBOX */

/**
 * this function opens the lightbox when the user clicks on a media
 * @param {Event} e element clicked
 */
function openModalLightbox(mediaIdSelected) {
  containerModal.style.display ="flex";
  console.log('open');
  btnLeft.style.display ="flex";
  btnRight.style.display="flex";
  let mediaSelected = mediaDatas.find(elt => elt.id == mediaIdSelected);
  console.log('media selected', mediaSelected);
  
  let mediaModel = mediaFactory(mediaSelected);
  mediaModel.getMediaCardLightbox();  
  main.style.display = 'none';
  btnRight.focus()
  return mediaSelected;

}

/**
 * This function closed the lightbox
 */
function closeModalLb() {
  const containerModal = document.querySelector('#main-wrapper');
  containerModal.style.display ="none";
  const main = document.querySelector('#main');
  main.style.display = 'block';
  location.reload();
}
let currentIndex; 
let nextIndex;
let previousIndex;

/**
 * This function displays the previous media when you clicked on the left arrow of the lightbox
 */
function displayPreviousMedia () {
  let liMedia = document.querySelector('.img-container');
  liMedia.remove();
  console.log('click gauche');
  currentIndex = mediaDatas.map(media =>media.id).indexOf(imgSelectedId);
  console.log('current index',(currentIndex));

  previousIndex = currentIndex - 1;
  console.log('previous', (previousIndex));

  if (previousIndex < 0) {
    console.log('condition 0')
    currentIndex = (mediaDatas.length);
    previousIndex = currentIndex - 1;
    slidePrevious = mediaDatas[previousIndex];
    let mediaModel = mediaFactory(slidePrevious);
    mediaModel.getMediaCardLightbox();  
    imgSelectedId = mediaDatas[previousIndex].id;
  } else {
    console.log('condition autre')
    slidePrevious = mediaDatas[previousIndex];
    console.log('slideprevious', slidePrevious);
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
  console.log('click droite');
  let liMedia = document.querySelector('.img-container');
  liMedia.remove();
  currentIndex = mediaDatas.map(media =>media.id).indexOf(imgSelectedId);
  console.log('current index',(currentIndex));

  nextIndex = currentIndex + 1;
  console.log('next', (nextIndex));

  if (nextIndex <= mediaDatas.length-1) {
    slideNext = mediaDatas[nextIndex];
    console.log('next', slideNext);
    let mediaModel = mediaFactory(slideNext);
    mediaModel.getMediaCardLightbox();  
    imgSelectedId = mediaDatas[nextIndex].id;
  } else {
    currentIndex = -1;
    nextIndex = currentIndex + 1;
    slideNext = mediaDatas[nextIndex];
    let mediaModel = mediaFactory(slideNext);
    mediaModel.getMediaCardLightbox();  
    imgSelectedId = mediaDatas[nextIndex].id;
  }

  btnRight.focus();
 

}

function handleKeyDown(e) {
  
  console.log('keycode',e.keyCode);
  if(e.keyCode === 37) {
    return displayPreviousMedia();
  }
  if (e.keyCode === 39) {
    return displayNextMedia();
  }
} 


containerModal.addEventListener('keydown', handleKeyDownClose);

function handleKeyDownClose(e) {
  if ( e.keyCode === 27) {
    closeModalLb();
    
}
}


function addLikes (id) {
  let imgSelected= mediaDatas.find(elt => elt.id == id);
  console.log( 'data img click', imgSelected);
  let mediaModel = mediaFactory(imgSelected);
  mediaModel.addOneLike();
  counterLikes(); 
}

/**
* Initialisation of the page photographer.html
*/
async function init() {
  data = await getPhotographersData();
  console.log('data init',data);

 displayHeaderPhotographer(photographerDatas);
 displayGalleryPhotographer(mediaDatas);
 counterLikes();
 displayPriceDaily(data);
 

};

init();
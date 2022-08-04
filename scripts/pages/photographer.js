//Mettre le code JavaScript lié à la page photographer.html
// Initialisation des variables
let data;
let imgSelectedId;
let idPhotographer;
let photographerDatas;
let mediaDatas;


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
let result = {};


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
* Cette fonction permet d'afficher les informations du photographe pour l'en-tête
* @param {*} photographer 
*/
async function displayHeaderPhotographer(photographer) {
  const photographerHeader = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory(photographer);
  const userCardDOM = photographerModel.getUserHeaderPhotographer();
  photographerHeader.appendChild(userCardDOM);
};

/**
 * Afficher les medias pour le photographe concerné
 * @param {*} medias 
 */
async function displayGalleryPhotographer(medias) {
  const gallerySection = document.querySelector(".photographer-gallery");
  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const galleryCardDOM = mediaModel.getMediaCardDOM();
    gallerySection.appendChild(galleryCardDOM);

    // add event listener when the user clicks in on photographer's media
    galleryCardDOM.addEventListener('click', openModalLightbox);
  }
  )

}

/**
 * Cette fonction permet d'afficher le filtre
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
 * Cette fonction permet de fermer le filtre
 */
function closeFilterMenu() {
  const filterList = document.querySelector(".filter-list");
  filterList.classList.remove("active");
  const buttonFilterElt = document.querySelector(".filter-btn");
  buttonFilterElt.classList.remove("hidden");
}
/**
 * Cette fonction permet de totaliser tous les likes d'un photographe
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
 * Cette fonction permet d'afficher le tarif journalier
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
 * @param {*} e 
 */
async function openModalLightbox(e) {
  id = e.target.id;
  console.log('lb id', id)
  console.log('open');

  let mediaSelected = mediaDatas.filter(elt => elt.id == id);
  console.log('media lb', mediaSelected);

  const mediaModel = mediaFactory(mediaSelected[0]);
  const selectedCardDom = mediaModel.getMediaCardLightbox();  

  return selectedCardDom;
}

function closeModalLb() {
  
  const containerModal = document.querySelector('#main-wrapper');
  containerModal.style.display ="none";
}




/**
* Initialisation de la page photographer.html
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
//Mettre le code JavaScript lié à la page photographer.html

/**
 * Cette fonction permet de récupérer l'id dans l'url courante
 * @returns idPhotographer - id du photographe de la page affichée
 */
 function getIdFromParams() {
  var url = document.location.href;
  console.log('url courante : ', url);
  const params = (new URL(url)).searchParams;
  let idPhotographer = parseInt(params.get('id'));
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
   const data = await response.json();
   console.log('data fetch : ', data);

   // on cherche les datas du photographe correspondant à l'id de l'url
   let photographerDatas = data.photographers.find(elt => elt.id == idPhotographer);
   console.log('photographer datas :',photographerDatas);

  // on cherche les medias correspondant au photographe recherché
   let photographerMedias = data.media.filter(elt => elt.photographerId == idPhotographer)
   console.log('media filtré', photographerMedias);
   return {photographerDatas, photographerMedias};

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
  idPhotographer = getIdFromParams();
  const containerPrice = document.querySelector(".daily-price");
  const {price}= data;
  containerPrice.innerHTML = `${price}€ / jour`

}



/**
* Initialisation de la page photographer.html
*/
async function init() {
 let data = await getPhotographersData();
 console.log('data', data)
 displayHeaderPhotographer(data.photographerDatas);
 displayGalleryPhotographer(data.photographerMedias)
 counterLikes();
 displayPriceDaily(data.photographerDatas);
};

init();
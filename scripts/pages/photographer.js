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
   const json = await response.json();
   console.log('json fetch : ', json);
   const data = json.photographers;
   console.log('data :', data);
   // on cherche le photographe correspondant à l'id de l'url
   let photographerSearched = data.find(elt => elt.id == idPhotographer);
   console.log('photographer searched :',photographerSearched);
   return photographerSearched;

 } catch (error){
   console.log(error);
   return null;
 }     
}

async function getPhotographersMedia(idPhotographer) {
  idPhotographer = getIdFromParams();
  try {
    const response = await fetch("./data/photographers.json");
    const json = await response.json();
    const dataMedia = json.media;
    console.log('data :', dataMedia);
   let photographerMedias = dataMedia.filter(elt => elt.photographerId == idPhotographer)
   console.log('media filtré', photographerMedias);
   
    return photographerMedias;
 
  } catch (error){
    console.log(error);
    return null;
  }     
 }

/**
* Cette fonction permet d'afficher les informations du photographe
* @param {*} photographer 
*/
async function displayHeaderPhotographer(photographer) {
 const photographerHeader = document.querySelector(".photograph-header");
 const photographerModel = photographerFactory(photographer);
 const userCardDOM = photographerModel.getUserHeaderPhotographer();
 photographerHeader.appendChild(userCardDOM);

};

async function displayGalleryPhotographer(medias) {
  const gallerySection = document.querySelector(".photographer-gallery");
  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    console.log('mediaModel', mediaModel);
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
* Initialisation de la page photographer.html
*/
async function init() {
 const photographer = await getPhotographersData();
 console.log('photographer : ', photographer)
const medias = await getPhotographersMedia();
console.log("medias : ", medias);
 displayHeaderPhotographer(photographer);
 displayGalleryPhotographer(medias);

};

init();
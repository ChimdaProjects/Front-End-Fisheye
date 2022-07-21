//Mettre le code JavaScript lié à la page photographer.html

/**
 * Cette fonction permet de récupérer l'id dans l'url courante
 * @returns idPhotographer - id du photographe de la page affichée
 */
 function getIdFromParams() {
  var url = document.location.href;
  console.log('url courante : ', url);
  const params = (new URL(url)).searchParams;;
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

/**
* Initialisation de la page photographer.html
*/
async function init() {
 const photographer = await getPhotographersData();
 console.log('photographer : ', photographer)
 displayHeaderPhotographer(photographer);
};

init();
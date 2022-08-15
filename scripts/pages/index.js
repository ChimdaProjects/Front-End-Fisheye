async function getPhotographers() {
    console.log( "getphotographers" )
    let photographers = [];
    // fetch data from json file
    await fetch("./data/photographers.json")
        .then(function (res) {
            if (res.ok) {
                console.log( "res :"  , res.json);
                return res.json();
            }
        })
        .then(function (data) {
            photographers = data.photographers;
            console.log("res photographers : ", photographers);
            return photographers;
        
        })
        .catch(function (err) {
            console.log("Erreur : " + err);
        });
    // return the array of photographers after fetch datas
    return ({photographers});
}
    
async function displayData(photographers) {
    console.log( "display" );
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    console.log( "init" )
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    
    displayData(photographers);
}

init();
    
function mediaFactory(dataMedia) {
    const { id, photographerId, title, image, video, likes, date, price } = dataMedia;
    let media="";

    let event = {"image" : false };
    let event2 = {"video" : false};
    let key = "image";
    let key2 = "video";

    //if(dataMedia.hasOwnProperty.call(event, key)) 
    if ( dataMedia.hasOwnProperty("image") ){
        media = `<img src="assets/images/${image}" alt=${title} id=${id} tabIndex="0" class="card-img">`;
    } else if ( dataMedia.hasOwnProperty("video") ) {
        media = `
        <video class="card-video" id=${id} tabIndex="0" >
            <source src="assets/images/${video}" alt=${title}  type="video/mp4" >
            Votre navigateur ne permet pas de lire les vidéos.
        </video> `
    }
  
    const gallerySection = document.querySelector(".photographer-gallery");
    const likesContainer = document.getElementById(`likes-${id}`);
    const cardInfos = document.getElementById(`cardInfos-${id}`);

    function getMediaCardDOM() {
        const card = document.createElement("div");
        card.setAttribute("class", "card-container");
        
        card.innerHTML= 
            `
            <div class="card-gallery" tabindex="0" onclick="openModalLightbox(${id})" onkeydown="handleKeyDownMedia(event, ${id})">
              ${media}
            </div>
            <div class="card-infos" id="cardInfos-${id}"  >
            <p class= "card-title" tabIndex="0"             >
                ${title}
            </p>
            <p class="card-likes" data-value=${likes}  data-id=${id} id="likes-${id}" onclick="addLikes(${id})" onkeydown=" handleKeyDownEnterLikes(event, ${id})" tabIndex="0">
                ${likes}
                <i  class="fa fa-solid fa-heart" aria-label="likes onclick="addLikes(${id})"></i>
            </p>
            `
        gallerySection.appendChild(card);
       
        return (card);
    }

    function getMediaCardLightbox() {
        const containerModal = document.querySelector(".carousel");
        const cardMedia = document.createElement("li");
        cardMedia.setAttribute("class","img-container");
        cardMedia.setAttribute("id",`${id}`);

        if ( dataMedia.hasOwnProperty("image") ){
            media = `<img src="assets/images/${image}" alt=${title} id=${id} tabIndex="0" class="card-img">`;
        } else if ( dataMedia.hasOwnProperty("video") ) {
            media = `
            <video class="card-video" id=${id} tabIndex="0" controls >
                <source src="assets/images/${video}" alt=${title}  type="video/mp4" >
                Votre navigateur ne permet pas de lire les vidéos.
            </video> `
        }



        cardMedia.innerHTML = `
                
                <button onclick="closeModalLb()" id="close_modal_lb" tabindex="0"> X </button>
                <div id="container-media">
                ${media}
                <p id="lightbox-text"> ${title} </p>
                </div>
               
                `;

        /*if (containerModal.firstChild) {
           containerModal.removeChild;
        } */  
        containerModal.appendChild(cardMedia);   
        console.log('container modal', containerModal);
        return (cardMedia);
                                                                                                                                                                            
    }
    
    function addOneLike () {
        let addLike = likes + 1;
        console.log("likescontainer", likesContainer);
        likesContainer.innerHTML="";
        cardInfos.innerHTML =
        `
            <p class= "card-title" tabIndex="0"             >
                ${title}
            </p>
            <p class="card-likes" data-value=${addLike}  data-id=${id} id="likes-${id}"  tabIndex="0">
                ${addLike}
                <i  class="fa fa-solid fa-heart" aria-label="likes"></i>
            </p>  
        `
        console.log("likescontainer", likesContainer);

        return (likesContainer)
    }
    return { media, getMediaCardDOM, getMediaCardLightbox, addOneLike}
}


function mediaFactory(dataMedia) {
    const { id, photographerId, title, image, video, likes, date, price } = dataMedia;
    let media="";

    if ( Object.hasOwnProperty.call(dataMedia, "image") ){
        media = `<img src="assets/images/${image}" alt=${title} id=${id} tabIndex="0" class="card-img">`;
    } else if ( Object.hasOwnProperty.call(dataMedia, "video") ) {
        media = `
        <video class="card-video" id=${id} tabIndex="0" >
            <source src="assets/images/${video}" alt=${title}  type="video/mp4" >
            Votre navigateur ne permet pas de lire les vidéos.
        </video> `
    }
  
    const gallerySection = document.querySelector(".photographer-gallery");
    const likesContainer = document.getElementById(`likes-${id}`);
    const cardInfos = document.getElementById(`cardInfos-${id}`);
    
    /**
     * This function displays the card of each media
     * @returns 
     */
    function getMediaCardDOM() {
        const card = document.createElement("div");
        card.setAttribute("class", "card-container");

        card.innerHTML= 
            `
                <div class="card-gallery" tabindex="0" onclick="openModalLightbox(${id})" onkeyup="handleKeyDownMedia(event, ${id})">
                ${media}
                </div>
                <div class="card-infos" id="cardInfos-${id}"  >
                    <p class= "card-title" tabIndex="0"             >
                        ${title}
                    </p>
                    <p class="card-likes" data-value=${likes}  data-id=${id} id="likes-${id}" onclick="addLikes(${id})" onkeydown=" handleKeyDownEnterLikes(event, ${id})" tabIndex="0">
                        ${likes}
                        <em  class="fa fa-solid fa-heart" aria-label="likes onclick="addLikes(${id})"></em>
                    </p>
            </div>
            `
        gallerySection.appendChild(card);
       
        return (card);
    }
    /**
     * This function displays the medias of the lightbox
     * @returns 
     */
    function getMediaCardLightbox() {
        const containerModal = document.querySelector(".carousel");
        const cardMedia = document.createElement("li");
        cardMedia.setAttribute("class","img-container");
        cardMedia.setAttribute("id",`${id}`);

        if ( Object.hasOwnProperty.call(dataMedia, "image") ){
            media = `<img src="assets/images/${image}" alt=${title} id=${id} tabIndex="0" class="card-img">`;
        } else if ( Object.hasOwnProperty.call(dataMedia, "video") ) {
            media = `
            <video class="card-video" id=${id} tabIndex="0" controls >
                <source src="assets/images/${video}" alt=${title}  type="video/mp4" >
                Votre navigateur ne permet pas de lire les vidéos.
            </video> `
        }

        cardMedia.innerHTML = `
                
                <button onclick="closeModalLb()" id="close_modal_lb" tabindex="0" aria-label="close lightbox"> X </button>
                <div id="container-media">
                ${media}
                <p id="lightbox-text"> ${title} </p>
                </div>
               
                `;

        containerModal.appendChild(cardMedia);   

        return (cardMedia);
                                                                                                                                                                            
    }
    /**
     * This function update the number of likes when the user clicked on the heart
     * @returns 
     */
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
                <em  class="fa fa-solid fa-heart" aria-label="likes"></em>
            </p>  
        `
        return (likesContainer)
    }
    return { media, getMediaCardDOM, getMediaCardLightbox, addOneLike}
}


function mediaFactory(dataMedia) {
    const { id, photographerId, title, image, video, likes, date, price } = dataMedia;
    let media='';
    

    if(dataMedia.hasOwnProperty('image')) {
        media = `<img src="assets/images/${image}" alt=${title} id=${id}  class="card-img">`;
    } else if (dataMedia.hasOwnProperty('video')) {
        media = `
        <video controls class="card-video" id=${id} >
            <source src="assets/images/${video}" alt=${title}  type="video/mp4" >
            Votre navigateur ne permet pas de lire les vidéos.
        </video> `
    }
  
    const gallerySection = document.querySelector(".photographer-gallery");
    
    function getMediaCardDOM() {
        const card = document.createElement('div');
        card.setAttribute('class', 'card-container');
        card.innerHTML= 
            `
            <div class="card-gallery" tabindex="0">
              ${media}
            </div>
            <div class="card-infos">
            <p class= "card-title">
                ${title}
            <p>
            <p class="card-likes" data-value=${likes}>
                ${likes}
                <i  class="fa fa-solid fa-heart" aria-label="likes"></i>
            </p>
            `
        gallerySection.appendChild(card);
        card.addEventListener('click', openModalLightbox);
        return (card);
    }

    function getMediaCardLightbox() {
        const containerModal = document.querySelector('.carousel');
        const cardMedia = document.createElement('li');
            cardMedia.setAttribute('class',`img-container`);
            cardMedia.setAttribute('id',`${id}`);
            cardMedia.innerHTML = `
                
                <button onclick="closeModalLb()"  id="close_modal_lb" tabindex="0"> X </button>
                <div id="container-media">
                ${media}
                <p id="lightbox-text"> ${title} </p>
                </div>
               
                `;
            
        containerModal.appendChild(cardMedia);   

        return (cardMedia);

    }
    
    return { media, getMediaCardDOM, getMediaCardLightbox}
}


function mediaFactory(dataMedia) {
    const { id, photographerId, title, image, video, likes, date, price } = dataMedia;
    let picture='';
    

    if(dataMedia.hasOwnProperty('image')) {
        picture = `assets/images/${image}`;
    } else if (dataMedia.hasOwnProperty('video')) {
      picture = `assets/images/${video}`
    }
  
    const gallerySection = document.querySelector(".photographer-gallery");
    
    function getMediaCardDOM() {
        const card = document.createElement('div');
        card.innerHTML= 
            `
            <div class="card-gallery" tabindex="O">
                <img src=${picture} alt=${title} id=${id} class="card-img">
            </div>
            <div>
            <p class= "card-title">
                ${title}
            <p>
            <p class="card-likes">
                ${likes}
                <i  class="fa fa-solid fa-heart"></i>
            </p>
            `
        gallerySection.appendChild(card);
        return (card);
    }
    return { picture, getMediaCardDOM}
}


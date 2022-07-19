/**
 * Function factory 
 * @param {*} data 
 * @returns 
 */


function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", `photo of ${name}`);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        const divInfos = document.createElement( 'div');
        divInfos.classList = "informations"
        const pLocation = document.createElement ('p');
        pLocation.textContent = `${city}, ${country}`;
        pLocation.classList = "location";
        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;
        pTagline.classList = 'tagline';
        const pPrice = document.createElement( 'p');
        pPrice.textContent = `${price}€/jour`;
        pPrice.classList = 'price';
        article.appendChild(divInfos);
        divInfos.appendChild(pLocation);
        divInfos.appendChild(pTagline);
        divInfos.appendChild(pPrice);


        return (article);
    }

    return { name, picture, getUserCardDOM }
}
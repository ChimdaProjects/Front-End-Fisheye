/**
 * Function factory 
 * @param {*} data 
 * @returns 
 */


function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;
    const urlPhotographers = `/photographer.html?id=${id}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const a = document.createElement('a');
        a.setAttribute('href', urlPhotographers);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", `photo of ${name}`);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
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
        a.appendChild(divInfos);
        divInfos.appendChild(pLocation);
        divInfos.appendChild(pTagline);
        divInfos.appendChild(pPrice);


        return (article);
    }

    function getUserHeaderPhotographer() {
            const container = document.createElement( 'div' );
            container.setAttribute('class',`header-container`);
            container.setAttribute('id',`header-(${id})`);
            const leftBlock = document.createElement('div'); 
            leftBlock.setAttribute('class', 'left'); 
            container.appendChild(leftBlock); 
            const H1 = document.createElement('H1'); 
            H1.textContent = `${name}`;
            H1.setAttribute('class',`left-name`);
            const cityContainer = document.createElement('p'); 
            cityContainer.setAttribute('class', 'city'); 
            cityContainer.textContent  = `${city}, ${country}`; 
            const tag = document.createElement('p'); 
            tag.setAttribute('class', 'tag'); 
            tag.textContent = `${tagline}`; 

            leftBlock.appendChild(H1); 
            leftBlock.appendChild(cityContainer); 
            leftBlock.appendChild(tag); 

            const blocB = document.createElement('div'); 
            blocB.className = 'middle'; 
            container.appendChild(blocB);
            const buttonContact = document.querySelector(".contact_button");
            blocB.appendChild(buttonContact);
    
            const right = document.createElement('div'); 
            right.setAttribute('class', 'right'); 
            container.appendChild(right); 
            const img = document.createElement('img'); 
            img.setAttribute('src', `${picture}`); 
            img.setAttribute('alt', `${name}`); 
            img.setAttribute('id', `${id}`); 
            right.appendChild(img); 

            return (container)
        }
    

    

    return { name, picture, getUserCardDOM, getUserHeaderPhotographer }
}
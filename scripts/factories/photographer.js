/**
 * Function factory 
 * @param {*} data 
 * @returns 
 */


function photographerFactory(data) {
   
    const { name, id, city, country, tagline, price, portrait } = data;
    console.log("factory data",data);
    const picture = `assets/photographers/${portrait}`;
    const urlPhotographers = `/photographer.html?id=${id}`;

    function getUserCardDOM() {
        const article = document.createElement( "article" );
        article.setAttribute( "role" ,  "article" );
        article.setAttribute( "tabindex" , 0);
        const a = document.createElement( "a" );
        a.setAttribute("href" , urlPhotographers);
        const img = document.createElement(  "img"  );
        img.setAttribute("src", picture)
        img.setAttribute("alt", `photo of ${name}`);
        const h2 = document.createElement(  "h2" );
        h2.textContent = name;
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        const divInfos = document.createElement(  "div" );
        divInfos.classList = "informations"
        const pLocation = document.createElement ( "p" );
        pLocation.textContent = `${city}, ${country}`;
        pLocation.classList = "location";
        const pTagline = document.createElement( "p" );
        pTagline.textContent = tagline;
        pTagline.classList = "tagline";
        const pPrice = document.createElement( "p");
        pPrice.textContent = `${price}€/jour`;
        pPrice.classList = "price";
        a.appendChild(divInfos);
        divInfos.appendChild(pLocation);
        divInfos.appendChild(pTagline);
        divInfos.appendChild(pPrice);   
        // add event to an article when you press enter to watch a photographer's page
        article.addEventListener("keypress", function(event){
            if (event.key==="Enter") {
                location.href=urlPhotographers;
            }
        })

        return (article);
    }

    function getUserHeaderPhotographer() {
        // DOM element
        const buttonContact = document.querySelector(".contact_button");

        // Creation DOM elements
        const container = document.createElement( "div" );
        const leftSection = document.createElement( "div"); 
        const namePhotographer = document.createElement("h1"); 
        const location = document.createElement("p"); 
        const tag = document.createElement("p"); 
        const middleSection = document.createElement("div"); 
        const rightSection = document.createElement("div"); 
        const img = document.createElement("img"); 

        // Add attribute for DOM elements
        container.setAttribute("id",`header-(${id})`);
        img.setAttribute("src", `${picture}`); 
        img.setAttribute("alt", `${name}`); 
        img.setAttribute("id", `${id}`); 
        
        // add classname for DOM elements
        container.className=  "header-container" ;
        leftSection.className =  "left-section" ; 
        namePhotographer.className =  "left-name" ;
        location.className = "left-city" ;
        tag.className =  "left-tag" ; 
        middleSection.className =  "middle-section" ;
        rightSection.className =   "right-section" ; 
        

        //add content for DOM elements
        namePhotographer.textContent = `${name}`;
        location.textContent  = `${city}, ${country}`; 
        tag.textContent = `${tagline}`; 

        // Add nodes child
        container.appendChild(leftSection); 
        leftSection.appendChild(namePhotographer); 
        leftSection.appendChild(location); 
        leftSection.appendChild(tag); 
        container.appendChild(middleSection);
        middleSection.appendChild(buttonContact);
        container.appendChild(rightSection); 
        rightSection.appendChild(img); 
        return (container);
    }
    return { name, picture, getUserCardDOM, getUserHeaderPhotographer }
}
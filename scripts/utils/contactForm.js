// dom elements 
/* eslint-disable */
const firstname = document.querySelector('input[name="prenom"]');
const lastname = document.querySelector('input[name="nom"]');
const mail = document.querySelector('input[name="email"]');
const msg = document.querySelector('input[name="message"]');
const inputs = document.querySelectorAll(".form-input");
const formContact = document.querySelector('.form');

/* value of each input */
const valueFields = {
    prenom:"",
    nom: "",
    email: "",
    message: ""
};

// variables checking fields
let checkFirstName = false;
let checkName = false;
let checkEmail = false;
let checkMessage = false;

const divFirst = document.querySelector("#divFirst");
console.log('divFirst', divFirst)
const divName = document.querySelector("#divLast");
const divEmail = document.querySelector("#divMail");
const divMsg = document.querySelector("#divMessage");

const errorsMsg = {
    "first": "Veuillez entrer 2 caractères ou plus pour le champ du prénom",
    "last": "Veuillez entrer 2 caractères ou plus pour le champ du nom",
    "email": "Veuillez saisir un email valide",
    "message": "Votre message ne peut pas être vide"

}
/*REGEX */

/*eslint no-control-regex: "error"*/
const regexName = /[^ ][a-zA-Z '\-éèêëçäàûüçà]*[^ ]$/;
// regex for email
const regexEmail = /^([a-z0-9_\.-]+\@[\da-z\.-]+\.[a-z\.]{2,6})$/;

/* Event listeners */
for (let input of inputs) {
    input.addEventListener("change", checkContactForm);
}
formContact.addEventListener("submit", submitForm);

/**
 * Check the value of each input
 */
function checkContactForm(e) {
    let value = e.target.value;
    switch(e.target.id) {
        case "prenom":
            if (value.length > 1 && regexName.test(value)) {
                checkFirstName=true;
                valueFields.prenom = value;
                divFirst.setAttribute("data-error-visible", "false");
            } else {
                
                divFirst.setAttribute("data-error-visible", "true");
                divFirst.setAttribute("data-error", errorsMsg.first);
                divFirst.setAttribute("role", "alert");
                firstname.setAttribute("aria-invalid", "true");
                checkFirstName=false;
            }
            break;
        
        case "nom":
            if (value.length >= 1 && regexName.test(value)) {
                checkName=true;
                valueFields.nom = value;
                divName.setAttribute("data-error-visible", "false");
              
            } else {
                checkName=false;
                divName.setAttribute("data-error-visible", "true");
                divName.setAttribute("data-error", errorsMsg.last);
                divName.setAttribute("role", "alert");
                lastname.setAttribute("aria-invalid", "true");
            }
            break;

        case "email":
            if (value.length > 0  && regexEmail.test(value)) {
                checkEmail = true;
                valueFields.email = value;
                divEmail.setAttribute("data-error-visible", "false");
                
            } else {
                checkEmail = false;
                divEmail.setAttribute("data-error-visible", "true");
                divEmail.setAttribute("data-error", errorsMsg.email);
                divEmail.setAttribute("role", "alert");
                mail.setAttribute("aria-invalid", "true");
            }
            break;

        case "message":
            if (value.length > 0) {
                checkMessage=true;
                valueFields.message = value;
                divMsg.setAttribute("data-error-visible", "false");
            } else {
                checkMessage=false;
                divMsg.setAttribute("data-error-visible", "true");
                divMsg.setAttribute("data-error", errorsMsg.message);
                divMsg.setAttribute("role", "alert");
                mail.setAttribute("aria-invalid", "true");
            }
            break;
        default:
            console.log("Il ya eu un pépin", console.error())
    }
}

function clearDatas () {
    firstname.value="";
    lastname.value="";
    mail.value="";
    msg.value="";
    divFirst.setAttribute("data-error-visible", "false");
    divName.setAttribute("data-error-visible", "false");
    divEmail.setAttribute("data-error-visible", "false");
    divMsg.setAttribute("data-error-visible", "false");
}

function submitForm(e) {
    e.preventDefault();
    if (
        checkFirstName && 
        checkName &&
        checkEmail &&
        checkMessage 
    ) {
        console.log("valeurs envoyées: ",valueFields );
        // on appelle cette fonction pour fermer la modale à la soumission
        closeModal();
        alert(
        `Votre message a bien été envoyé à ${photographerDatas.name}.
        Récapitulatif :
            Prénom: ${valueFields.prenom},
            Nom: ${valueFields.nom}, 
            Email: ${valueFields.email}, 
            Message: ${valueFields.message}`);
        clearDatas();
    } else {
        if(!checkFirstName) { // vérification du prénom
            // on affiche le message d'erreur
            divFirst.setAttribute("data-error-visible", "true");
            divFirst.setAttribute("data-error", errorsMsg.first);
            divFirst.setAttribute("role", "alert");
            firstname.setAttribute("aria-invalid"," true");
            
        }
        if(!checkName) { // vérification du champ prénom
            divName.setAttribute("data-error-visible", "true");
            divName.setAttribute("data-error", errorsMsg.last);
            divName.setAttribute("role", "alert");
            lastname.setAttribute("aria-invalid", "true");
        }
        if(!checkEmail) { // vérification du  champ email
            divEmail.setAttribute("data-error-visible", "true");
            divEmail.setAttribute("data-error", errorsMsg.email);
            divEmail.setAttribute("role", "alert");
            mail.setAttribute("aria-invalid", "true");
        }
        if(!checkMessage) { // vérification du champ date de naissance
            divMsg.setAttribute("data-error-visible", "true");
            divMsg.setAttribute("data-error", errorsMsg.message);
            divMsg.setAttribute("role", "alert");
            msg.setAttribute("aria-invalid", "true");
        }
    }
        
}
async function displayModal() {
    const modal = document.getElementById("contact_modal");
    const divModal = document.querySelector(".modal");
    const btnModal = document.getElementById("contact_button");
    modal.style.display = "block";
    const nameContact = document.querySelector(".modal-name");
    nameContact.innerHTML = `${photographerDatas.name}`;
    modal.setAttribute("aria-hidden", "false")
    divModal.focus();
}

// Close modal when escape key is pressed
const modal = document.getElementById("contact_modal");
modal.addEventListener("keydown", escapeModal); 
function escapeModal(e){
    console.log("keydown")
    if (modal.getAttribute("aria-hidden") == "false" && e.keyCode === 27) {
        closeModal()
    }
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    clearDatas();  
}



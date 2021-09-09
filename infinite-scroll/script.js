const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photos = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let isInitialLoad = true;

// Unsplash API
let count = 5;
const apiKey = 'NUDkkBk97LF0fu6RXrssG3-XmVyHBFAkhAzHdeFRzNw';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function updateAPIURLWithNewCount (picCount) {
    apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

// Check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        loader.hidden = true;
        ready = true;
    }
}

// Set Attributes
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}
// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photos.length;
    photos.forEach((photo) => {
        //create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })

        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src:photo.urls.regular,
            alrt:photo.alt_description,
            title:photo.alt_description,
        });

        // event listenr, check when all the photos ar loaded
        img.addEventListener('load', imageLoaded);

        //put <img> inside <a>, then inside of imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photos = await response.json();
        displayPhotos();
        if (isInitialLoad) { 
            updateAPIURLWithNewCount(30);
            isInitialLoad = false;
          } 
    } catch(error) {

    }
}

// check to see if scrolling near bottom of page to load more photos
window.addEventListener('scroll', ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000&&ready){
        ready = false;
        getPhotos();
    }
});

getPhotos();
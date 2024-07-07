/*EVENT DELEGATION ===>pattern tari2a bat3tmd 3la event bubbling bi7sel

- Event Delegation is a pattern based upon the concept of Event Bubbling. It is an event-handling pattern that allows you to handle 
  events at a higher level in the DOM tree other than the level where the event was first received. 

- performance, and enhances the flexibility of your code. By leveraging the event bubbling mechanism, 
  you can efficiently manage events on a group of elements rather than dealing with each one individually
*/

//performance-->xxx--->EVENT DELEGATION
for (var i = 0; i < allImages.length; i++) {
    allImages[i].addEventListener("click", function (e) {
        boxContainer.classList.replace("d-none", "d-flex");
        //get clicked image azay ageb el sora eli ana 3aizah--->e.target (images src--> 1-src return abslute bath kolo 2-getAttribute return relative bath) 
        var imgSrc = e.target.getAttribute("src");
        // console.log(imgSrc);
        boxContainer.firstElementChild.style.backgroundImage = `url(${imgSrc})`;
        //indexof clicked element
        // console.log( allImages.indexOf(e.target) ); di awel tari2a
        // console.log( e.target.perentElement(".img-item")); msh aman lw perant at8ir
        currentImageIndex = +e.target.closest(".img-item").dataset.imageIndex;//akter aman lw perent at8ir / + 3ashn a7wl mn string l number
    })
}

//next || previous 2-function---> xxx --->one function  1-performance 2-memory
function slideNext() {
    currentImageIndex++; // baized eli b3do
    if (currentImageIndex == allImages.length) {
        currentImageIndex = 0
    }
    var imgSrc = allImages[currentImageIndex].getAttribute("src");
    boxContainer.firstElementChild.style.backgroundImage = `url(${imgSrc})`;
}
function previousNext() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = allImages.length -1;
    }
    allImages[currentImageIndex] // previous image
    var imgSrc = allImages[currentImageIndex].getAttribute("src");
    boxContainer.firstElementChild.style.backgroundImage = `url(${imgSrc})`;

}
closeButton.nextElementSibling.addEventListener("click", slideNext);
closeButton.previousElementSibling.addEventListener("click", previousNext);

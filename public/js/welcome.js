
let currentImageIndex = 0;
const images = document.querySelectorAll('.bg-image');
const totalImages = images.length;

function showNextImage() {
  images[currentImageIndex].classList.remove('visible');
  currentImageIndex = (currentImageIndex + 1) % totalImages;
  images[currentImageIndex].classList.add('visible');
}
setInterval(showNextImage, 1000); // Change image every 1 second

// function welcomeMessage() {
//   window.location.href = 'graph.html';
// }
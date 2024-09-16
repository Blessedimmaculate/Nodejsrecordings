
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


// welcome.js

// let currentImageIndex = 0;
// const images = document.querySelectorAll('.bg-image');
// const totalImages = images.length;

// function showImage(index) {
//     images.forEach((img, i) => {
//         img.classList.remove('visible');
//         if (i === index) {
//             img.classList.add('visible');
//         }
//     });
// }

// function nextImage() {
//     currentImageIndex = (currentImageIndex + 1) % totalImages;
//     showImage(currentImageIndex);
// }

// // Show the first image initially
// showImage(currentImageIndex);

// // Change image every 5 seconds
// setInterval(nextImage, 5000);

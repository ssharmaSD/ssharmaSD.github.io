document.addEventListener("DOMContentLoaded", function() {
    const images = [
        'images/pfp1.png',
        'images/pfp2.png',
        'images/pfp3.png'
    ];

    let currentIndex = 0;
    const rotatingImage = document.querySelector('.rotating-image');

    function rotateImage() {
        currentIndex = (currentIndex + 1) % images.length;
        rotatingImage.src = images[currentIndex];
        console.log("Image rotated to:", images[currentIndex]);
    }

    rotatingImage.onload = () => console.log("Image loaded:", rotatingImage.src);
    rotatingImage.onerror = () => console.error("Image failed to load:", rotatingImage.src);

    setInterval(rotateImage, 5000); // Change image every 3 seconds
});

const slider = document.querySelector(".slider");
const images = [
  "https://img.freepik.com/premium-photo/female-hand-holding-sale-placard-clothes-shop_249974-3694.jpg",
  "https://img.freepik.com/premium-vector/mega-sale-advertiving-banner-with-3d-illustration-dofferent-home-smart-electronic-devices_348818-574.jpg"
];
let count = 0;

function slide() {
  slider.src = images[count];
  count++;
  if (count === images.length) {
    count = 0;
  }
}

slide(); // Initial call to show the first image
setInterval(slide, 4000); // Call the slide function every 5 seconds

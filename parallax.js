const main = document.querySelector(".main-parallax");
const video = document.querySelector(".main-bg-video");

function parallaxVideo() {
  if (!main || !video) return;

  const rect = main.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.bottom > 0 && rect.top < windowHeight) {
    const speed = window.innerWidth < 768 ? -0.08 : -0.18;

    const offset = (rect.top - windowHeight / 2) * speed;

    video.style.transform = `translateY(${offset}px)`;
  }
}

window.addEventListener("scroll", parallaxVideo, { passive: true });
window.addEventListener("resize", parallaxVideo);
window.addEventListener("load", parallaxVideo);

window.ontouchmove = window.onwheel = () => {
  mainPage.classList.add('goaway');
  endPage.style.display = 'flex';

  setInterval(() => {
    mainPage.style.display = 'none';
    endPage.classList.add('show');
  }, 800);
}
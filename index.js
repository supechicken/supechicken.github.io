let lock = false,
    touchPos = 0;

const mainContainer = document.getElementById('mainContainer');

mainContainer.ontouchstart = e => {
  touchPos = e.changedTouches[0].clientY;
}

mainContainer.onwheel = mainContainer.ontouchmove = e => {
  e.preventDefault();

  if (!lock) {
    lock = true

    const isScrollDown = (e.deltaY ? e.deltaY : touchPos - e.changedTouches[0].clientY) > 0,
          containerHeight = mainContainer.offsetHeight,
          targetPos = Math.min(Math.max(isScrollDown ? mainContainer.scrollTop + containerHeight : mainContainer.scrollTop - containerHeight, 0), containerHeight);

    console.log(targetPos)
    mainContainer.scrollTo({ top: targetPos, behavior: 'smooth' });

    const interval = setInterval(() => {
      if (Math.round(mainContainer.scrollTop - targetPos)) {
        clearInterval(interval);
        setTimeout(() => {
          lock = false;
          console.log('unlock');
        }, 100);
      }
    }, 10);
  }
}
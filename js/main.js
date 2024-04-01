const intro                 = document.getElementById('intro'),
      iconList              = document.getElementById('iconList'),
      scrollAnimation       = document.getElementById('scrollAnimation'),
      background_and_banner = document.getElementById('background_and_banner'),
      innerPage             = document.getElementById('innerPage'),
      typebox               = document.getElementById('typeBox');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startTyping() {
  const script    = '人們為何選擇沉睡？\0\0\0\0\n\n我想...\0\0\0\0\0\0\n\n是因為害怕從『夢』中醒來...',
        textArea  = typebox.querySelector('.textArea'),
        blinker   = typebox.querySelector('.blinker');

  const interval = setInterval(() => {
    if (getComputedStyle(innerPage).display === 'none') {
      textArea.innerText = '';
      blinker.style.opacity = '0';
      clearInterval(interval);
    }

    switch (blinker.style.opacity) {
      case '0':
        blinker.style.opacity = '1';
      break;
      default:
        blinker.style.opacity = '0';
      break;
    }
  }, 500);

  for (const char of script) {
    if (getComputedStyle(innerPage).display === 'none') break;

    await sleep(150);
    textArea.innerText += char;
  }
}

async function goBack() {
  innerPage.classList.remove('fadeIn');

  await sleep(500);
  intro.className = iconList.className = scrollAnimation.className = background_and_banner.className = '';

  await sleep(2000);
  innerPage.classList.remove('show');
}

async function nextPage() {
  intro.className = iconList.className = scrollAnimation.className = 'hidden';
  background_and_banner.className = 'as_banner';

  innerPage.classList.add('show');

  await sleep(1200);
  innerPage.classList.add('fadeIn');

  await startTyping();
}

function startScrollTrigger() {
  let lock = false, touchPos = 0;

  document.body.ontouchstart = e => touchPos = e.changedTouches[0].clientY;

  document.body.onwheel = document.body.ontouchmove = e => {
    if (!lock) {
      lock = true;

      background_and_banner.play();

      if ((e.deltaY ? e.deltaY : touchPos - e.changedTouches[0].clientY) > 0) {
        nextPage();
      } else {
        goBack();
      }

      setTimeout(() => lock = false, 3000);
    }
  }
}

background_and_banner.oncanplay = () => {
  background_and_banner.style.animation = 'fadeInAnimation ease 2s';
}

window.onload = async () => {
  startScrollTrigger();
}

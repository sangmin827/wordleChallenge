const 정답 = 'APPLE';

let attempts = 0;
let index = 0;
let timer;

function appStrat() {
  const displayGameover = () => {
    const div = document.createElement('div');
    div.innerText = '게임이 종료되었습니다.';
    div.style =
      'display:flex; justify-content:center; align-items:center; position:absolute; top:30vh; left:30vw; background-color:white;  font-size: 50px;';
    document.body.appendChild(div);
  };

  const gameOver = () => {
    removeEventListener('keydown', handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameOver();
    attempts += 1;
    index = 0;
  };

  const handleEnterkey = () => {
    let 맞은개수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      const 키보드 = document.querySelector(
        `.keyboard-column[data-key='${입력한_글자}`
      );
      if (입력한_글자 === 정답_글자) {
        맞은개수 += 1;
        block.style.background = '#6AAA64';
        block.style.color = 'white';
        block.classList.add('block-correct');
        if (키보드) {
          키보드.style.background = '#6AAA64';
          키보드.style.color = 'white';
        }
      } else if (정답.includes(입력한_글자)) {
        block.style.background = '#C9B458';
        block.style.color = 'white';
        block.classList.add('block-wrong');
        if (키보드 && 키보드.style.background !== '#6AAA64') {
          키보드.style.background = '#C9B458';
          키보드.style.color = 'white';
        }
      } else {
        block.style.background = '#787C7E';
        block.style.color = 'white';
        block.classList.add('block-wrong');
        if (
          키보드 &&
          키보드.style.background !== '#6AAA64' &&
          키보드.style.background !== '#C9B458'
        ) {
          키보드.style.background = '#787C7E';
          키보드.style.color = 'white';
        }
      }
      //중복으로 사용하는걸 최대한 지향해야됨. 알고리즘으로..
    }

    if (맞은개수 === 5) gameOver();
    else nextLine();
  };

  const handleKeydown = (eventOrKey) => {
    let key;

    if (typeof eventOrKey === 'string') {
      key = eventOrKey.toUpperCase();
    } else {
      key = eventOrKey.key.toUpperCase();
    }

    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    const handleBackspace = () => {
      if (index > 0) {
        const preBlock = document.querySelector(
          `.board-block[data-index='${attempts}${index - 1}']`
        );
        preBlock.innerText = '';
      }
      if (index !== 0) index -= 1;
    };

    if (key === 'BACKSPACE') handleBackspace();
    else if (index === 5) {
      if (key === 'ENTER') handleEnterkey();
      else return;
    } else if (/^[A-Z]$/.test(key)) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTime = () => {
    const firstTime = new Date();

    function setTime() {
      const nowTime = new Date();
      const clockTime = new Date(nowTime - firstTime);
      const minutesTime = clockTime.getMinutes().toString().padStart(2, '0');
      const secondTime = clockTime.getSeconds().toString().padStart(2, '0');
      const timeDiv = document.querySelector('#timer');
      timeDiv.innerText = `${minutesTime}:${secondTime}`;
    }
    timer = setInterval(setTime, 1000);
    console.log(timer);
  };

  startTime();
  window.addEventListener('keydown', handleKeydown);

  const keys = document.querySelectorAll(
    '.keyboard-column, .keyboard-big-column'
  );

  for (let i = 0; i < keys.length; i++) {
    const el = keys[i];
    el.addEventListener('click', () => {
      const key = el.dataset.key;
      handleKeydown(key);
    });
  }
}

appStrat();

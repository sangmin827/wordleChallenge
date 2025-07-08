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
      if (입력한_글자 === 정답_글자) {
        맞은개수 += 1;
        block.style.background = '#6AAA64';
      } else if (정답.includes(입력한_글자)) {
        block.style.background = '#C9B458';
      } else block.style.background = '#787C7E';
      block.style.color = 'white';
      //중복으로 사용하는걸 최대한 지향해야됨. 알고리즘으로..
    }

    if (맞은개수 === 5) gameOver();
    else nextLine();
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
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

    if (event.key === 'Backspace') handleBackspace();
    else if (index === 5) {
      if (event.key === 'Enter') handleEnterkey();
      else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
      // 위랑 완전히 같지 않지만 같은표현이라고 볼수있음 : index = index + 1;  //  index++;
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
}

appStrat();

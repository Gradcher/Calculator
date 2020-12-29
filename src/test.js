// let strForArr =
//   'ice, wife, price, like, climate, invite, alive, surprise, lie, die, pie, tie, skies, cries, island, idle, title, Bible, library, fibre, micron, microbe, child, wild, mind, find, kind, behind, high, sigh, light, night, right, might, sign, mineral, minister, military, political, visitor, unlimited, it, incident, lip, big, thin, since, little, simple, mirror, middle, resistance, indeed, infinitive, direct, divorce, mistake, family, visit, logic, service, rapid, tennis, niece, piece, brief, chief, thief, belief, million, opinion, union, champion, sir, fir, third, shirt, bird, dirt, girl, birth, first, skirt, circle, firmly, fire, wire, tired, desire, retire, admire, liar, diary, flier, prior, pirate, spiral, irony, virus';
const strForArr =
  'take, name, baby, paper, station, aid, rain, waiting, say, play, maybe, away, able, table, enable, maple, staple, sabre, April, apricot, matrix, patriot, patron, angel, change, danger, range, strange, exchange, dictate, celebrate, decorate, populate, operate, separate, animal, Saturday, tragedy, paradise, family, and, apple, can, bag, map, sand, flat, stand, happy, language, perhaps, marry, rare, square, prepare, farewell, daring, various, Mary, air, hair, fair, chair, fairy, aerial, bald, talk, walk, chalk, all, ball, wall, small, almost, also, false, alter, salt, always, war, warm, ward, award, towards, quarter, autumn, August, daughter, cause, fault, taught, awful, law, draw, saw, jaw, bath, path, father, rather, arm, far, star, hard, dark, apart, large, garden, darling, market';

const arr = strForArr.split(',');

// let shuffledArr = arr.sort(function () {
//   return Math.random() - 0.5;
// });

function shuffle(arr) {
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  console.log(arr.join(','));
}
console.log([][0]);

// // shuffle(arr)

const contentDisplay = document.querySelector('#displayNum');

const showNum = function () {
  if (+contentDisplay.textContent === 0) {
    contentDisplay.textContent = '';
  }
  const num = (contentDisplay.textContent += this.textContent);
  return num;
};

const clearDisplay = function () {
  contentDisplay.textContent = '';
};

const delElDisplay = function () {
  const cuttedNum = contentDisplay.textContent.match(/./gu) || []; // For Pi

  cuttedNum.pop();
  // return cuttedNum.length === 0
  //   ? (contentDisplay.textContent = '0')
  //   : (contentDisplay.textContent = cuttedNum.join(''));
  return (contentDisplay.textContent = cuttedNum.join(''));

  /* Не поместил метод pop() в выражение переменной cuttedNum, после split()
  а выделил отдельно так как овтетом бы
  являлся не обрезанный массив, а то число, которое обрезалось:

  Вот пример с сайта:
  let myFish = ['ангел', 'клоун', 'мандарин', 'хирург'];
  let popped = myFish.pop();
  console.log(myFish); // ['ангел', 'клоун', 'мандарин']
  console.log(popped); // 'хирург'
  */
};

const changeSign = function () {
  const DisplayContent = contentDisplay.textContent;
  const lastNum = DisplayContent.match(/\d+$/);

  if (/\(-\d+$/.test(DisplayContent)) {
    const changePlus = DisplayContent.replace(/\(-\d+$/, lastNum);
    return (contentDisplay.textContent = changePlus);
  }
  const changeMinus = DisplayContent.replace(/\d+$/, `(-${lastNum}`);
  return (contentDisplay.textContent = changeMinus);
};

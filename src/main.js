let contentDisplay = document.querySelector('#displayNum');

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
  const cuttedNum = contentDisplay.textContent.match(/./gu) || []; //For Pi

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
  let DisplayContent = contentDisplay.textContent;
  const lastNum = DisplayContent.match(/\d+$/);

  if (/\(-\d+$/.test(DisplayContent)) {
    let changePlus = DisplayContent.replace(/\(-\d+$/, lastNum);
    return (contentDisplay.textContent = changePlus);
  } else {
    let changeMinus = DisplayContent.replace(/\d+$/, '(-' + lastNum);
    return (contentDisplay.textContent = changeMinus);
  }
};

const buffer = {
  valueBuffer: 0,

  get memorySave() {
    return (this.valueBuffer = contentDisplay.textContent);
  },

  get memoryRead() {
    return !isNaN(this.valueBuffer)
      ? (contentDisplay.textContent = this.valueBuffer)
      : (contentDisplay.textContent = 'ERROR');
  },

  get memoryClear() {
    return (this.valueBuffer = 0);
  },

  get add() {
    return (this.valueBuffer =
      +this.valueBuffer.toString() + +contentDisplay.textContent.toString());
  },

  get subtr() {
    return (this.valueBuffer =
      +this.valueBuffer.toString() - +contentDisplay.textContent.toString());
  },
};

const parantheses = {
  get openParanth() {
    const valueOfDisplay = contentDisplay.textContent;
    const testOpenBracket = /.*(\)|\(\d[×÷.+-]|\d)$/.test(valueOfDisplay);
    if (!testOpenBracket) {
      return (contentDisplay.textContent += '(');
    }
  },
  get closeParanth() {
    const valueOfDisplay = contentDisplay.textContent;
    const testCloseBracket = /.*(\(-?|[×÷.+-])$/.test(valueOfDisplay);
    if (!testCloseBracket && valueOfDisplay.length !== 0) {
      return (contentDisplay.textContent += ')');
    }
  },
};

const verification = function (symb) {
  const regexpLastSymb = /.$/u;
  let lastSymb =
    contentDisplay.textContent[contentDisplay.textContent.length - 1];
  if (regexpLastSymb.test(contentDisplay.textContent)) {
    lastSymb = contentDisplay.textContent.match(regexpLastSymb)[0];
  }

  switch (symb) {
    case '√':
      if (/[^)\d]/.test(lastSymb)) {
        return (contentDisplay.textContent += `${symb}(`);
      }
      break;

    case 'e':
    case '𝜋':
      if (/[^)\d𝜋e]/.test(lastSymb) && lastSymb !== symb) {
        return (contentDisplay.textContent += symb);
      }
      break;

    case '!':
      const symbUniqueAndNotFirstAndFullNum =
        lastSymb !== symb &&
        typeof lastSymb === 'string' &&
        /\d/.test(lastSymb) &&
        !/\d+\.\d+$/.test(contentDisplay.textContent);
      if (symbUniqueAndNotFirstAndFullNum) {
        return (contentDisplay.textContent += symb);
      }
      break;
    case '^':
    case '%':
      const symbUniqueAndNotFirstAndNum =
        lastSymb !== symb &&
        typeof lastSymb === 'string' &&
        /\d/.test(lastSymb);
      if (symbUniqueAndNotFirstAndNum) {
        return (contentDisplay.textContent += symb);
      }
      break;

    case '.':
      const symbUnique =
        lastSymb !== symb &&
        !/\d+\.\d+$/.test(contentDisplay.textContent) &&
        !/^0*$|\D0*$/.test(contentDisplay.textContent);
      if (symbUnique) {
        return (contentDisplay.textContent += symb);
      }
      break;

    case '-':
      if (/[0-9()𝜋e!^%]/.test(lastSymb)) {
        return (contentDisplay.textContent += symb);
      } else {
        return (contentDisplay.textContent = `${delElDisplay()}${symb}`);
      }

    default:
      if (/[^)\d𝜋e!^%]/.test(lastSymb)) {
        const symbUniqueAndNotFirstAndConstToMinus =
          lastSymb !== symb &&
          typeof lastSymb === 'string' &&
          !/^-$|\(-?$/.test(contentDisplay.textContent);
        if (
          symbUniqueAndNotFirstAndConstToMinus
          // /.+/.test(contentDisplay.textContent)
        ) {
          return (contentDisplay.textContent = `${delElDisplay()}${symb}`);
        }
      } else {
        return (contentDisplay.textContent += symb);
      }
  }
};

const findFac = function () {
  let numFac = contentDisplay.textContent.match(/(\d+)!/)[1];
  let countFac = function (numFac) {
    if (numFac === 1) {
      return 1;
    }
    return numFac * countFac(numFac - 1);
  };
  return countFac(numFac);
};

const findPer = function (processValue) {
  const regexpPer = /(?<base>\d+|\d+\.\d+)(?<sign>[/+*-])(?<per>\d+|\d+\.\d+)%/;
  let groupsPer = processValue.match(regexpPer).groups;
  const perToNumFromBase = (groupsPer.base / 100) * groupsPer.per;
  const result = eval(`${groupsPer.base}${groupsPer.sign}${perToNumFromBase}`);
  return result;
};

const findPow = function () {
  const regexpPow = /(?<base>\d+|\d+\.\d+)\^(?<exponent>\d+)/;
  const groupsPow = contentDisplay.textContent.match(regexpPow).groups;
  return Math.pow(groupsPow.base, groupsPow.exponent);
};

const showResult = function () {
  let valueOfDisplay = contentDisplay.textContent;
  if (/.+[^×÷.+-]$/.test(valueOfDisplay)) {
    let processValue = valueOfDisplay
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/𝜋/g, '3.141592')
      .replace(/e/g, '2.718281')
      .replace(/√/g, 'Math.sqrt');

    if (/!/g.test(processValue)) {
      processValue = processValue.replace(/(\d+)!/g, findFac());
    }
    if (/%/g.test(processValue)) {
      processValue = processValue.replace(
        /(\d+|\d+\.\d+)[/+*-](\d+|\d+\.\d+)%/g,
        findPer(processValue)
      );
    }
    if (/\^/g.test(processValue)) {
      processValue = processValue.replace(/(\d+|\d+\.\d+)\^\d+/g, findPow());
    }
    try {
      let result = new Function('return ' + processValue)().toString();
      if (/\d+\.\d{6,}/.test(result)) {
        result = result.match(/\d+\.\d{6}/)[0];
      }
      return (contentDisplay.textContent = result);
    } catch (error) {
      return (contentDisplay.textContent = '*ERROR*');
    }
  }
};

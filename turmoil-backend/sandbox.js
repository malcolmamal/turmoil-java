const outer = (outerVariable) => {
  return (innerVariable) => {
      console.log('outer', outerVariable);
      console.log('inner', innerVariable);
  }
};

const inner = outer('outside');
//inner('inside');

let x = 100,
    y = 1;
console.log(3**4);

const
    a = 1, b = 2, c = 3,
obj = {
    a,
    b,
    c,
};

console.log(obj);
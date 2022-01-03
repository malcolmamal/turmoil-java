import * as Fs from 'fs';

const myarr = ['a', 'b', 'c', "d"];

for (let entry of myarr) {
    Fs.appendFileSync("lalal.txt", entry + '\n');
}

const item = {
    name: "excalibur",
    weight: 23,
    print() {
        console.log (this.name, this.weight)
    }
}

//myarr.forEach(a => {console.log(a)});
//console.log(myarr.map(a => a + 'w'));
//item.print();
//console.log({...item});

function printName (item) {
    console.log(item.name);

    item.print();
}

printName(item);
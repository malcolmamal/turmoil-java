const fields = [];
for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 9; j++) {
        fields.push({ column: i, row: j });
    }
}

const cells = [];
for (let i = 1; i < 11;) {
    for (let j = 1; j < 9;) {
        cells.push({ column: i, row: j });
        j += 1;
    }
    i += 1;
}

//console.log(fields);
//console.log(cells);
console.log(JSON.stringify(fields) === JSON.stringify(cells));
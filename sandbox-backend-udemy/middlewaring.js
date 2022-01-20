import express from "express";

const app = new express();

app.use((req, res, next) => {
    console.log('This is a middleware')
    next()
    console.log('This is first-half middleware')
})

app.use((req, res, next) => {
    console.log('This is second middleware')
    next()
    console.log('This is second-half middleware')

    next()
    console.log('This is "third"-half middleware')
})

app.use((req, res, next) => {
    console.log('This is third middleware')
    next() // comment out and observe the difference
})

app.use((req, res, next) => {
    console.log('This is fourth middleware')
    next()  // comment out and observe the difference

    console.log('This is fourth-half middleware')
})

app.use((req, res, next) => {
    console.log('This is fifth middleware')

})

app.listen(8888);

console.log("done!");
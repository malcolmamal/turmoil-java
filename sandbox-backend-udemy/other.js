export let something = 0;

export const whatever = () => {
    something++;
    console.log("something", something);

    return something;
}
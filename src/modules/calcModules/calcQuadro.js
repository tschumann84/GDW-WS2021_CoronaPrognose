async function calcQuadro(array, deep) {

    // console.log(array+' '+deep);
    let summeXt = 0;
    for (let i=0;i<deep;i++) {
        summeXt = summeXt+array[i];
        // await console.log(summeXt);
    }
    let b2 = (deep/2)*((deep/2)+1)*summeXt;
    // await console.log(b2)

    let summeXtt = 0;
    for (let i=1;i<(deep+1);i++) {
        summeXtt = summeXtt+(array[i-1]*i);
        // await console.log(summeXtt);
    }
    let b1 = deep*summeXtt;

    let b = (b1-b2)/(deep*((Math.pow(deep, 2))-1));
    let a = (1/deep*summeXt-b*((deep+1)/2));

    // await console.log(a);
    return Math.abs(a);
}
module.exports = calcQuadro
export default class Ratio {

    static minmax(arr) {
        let min;
        let max;

        for(let el of arr) {
            let elNumber = Number(el.y);

            if(typeof min !== 'number') min = elNumber;
            if(typeof max !== 'number') max = elNumber;

            if(min > elNumber) min = elNumber;
            if(max < elNumber) max = elNumber;
        }
        return [min, max];
    }

    static computeBoundaries(arrays) {

        let phRes = this.minmax(arrays.ph);
        let hRes = this.minmax(arrays.h);
        let mRes = this.minmax(arrays.m);
        
        return {
            ph: {
                min: phRes[0],
                max: phRes[1]
            },
            h: {
                min: hRes[0],
                max: hRes[1]
            },
            m: {
                min: mRes[0],
                max: mRes[1]
            }
        }
    }
}
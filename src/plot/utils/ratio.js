import Convert from '@/plot/utils/convert';
export default class Ratio {

    static minmax(arr) {
        let minY;
        let maxY;
        let minX;
        let maxX;

        for(let el of arr) {
            let elNumber = Number(el.y);

            if(typeof minY !== 'number') minY = elNumber;
            if(typeof maxY !== 'number') maxY = elNumber;

            if(minY > elNumber) minY = elNumber;
            if(maxY < elNumber) maxY = elNumber;
        }
        for(let el of arr) {
            let elNumber = Number(el.x);

            if(typeof minX !== 'number') minX = elNumber;
            if(typeof maxX !== 'number') maxX = elNumber;

            if(minX > elNumber) minX = elNumber;
            if(maxX < elNumber) maxX = elNumber;
        }
        return [[minX, maxX],[minY, maxY]];
    }

    static minmax_plain(arr) {
        let min;
        let max;

        for(let el of arr) {

            if(typeof min !== 'number') min = el;
            if(typeof max !== 'number') max = el

            if(min > el) min = el;
            if(max < el) max = el;
        }
        return [min, max];
    }

    static computeRatio(view, maxValue) {
        return view / maxValue;
    }

    static maxBoundary(boundaries) {
        let maxBoundary;
    
        for(let param in boundaries) {
            if(typeof maxBoundary !== 'number') maxBoundary = boundaries[param].maxY;
            if(boundaries[param].maxY > maxBoundary) maxBoundary = boundaries[param].maxY;
        }

        return maxBoundary;
    }

    static getAxisBoundaries(records) {

        let values = records.map(el => {
            return {
                ph: {
                    max: el.measurements.ph.max,
                    min: el.measurements.ph.min
                },
                h: {
                    max: el.measurements.humidity.max,
                    min: el.measurements.humidity.min
                },
                t: {
                    max: el.measurements.temperature.max,
                    min: el.measurements.temperature.min
                }
            }
        });

        let res = {
            ph: {
                min: this.minmax_plain(values.map(e => e.ph.min))[0],
                max: this.minmax_plain(values.map(e => e.ph.max))[1]
            },
            h: {
                min: this.minmax_plain(values.map(e => e.h.min))[0],
                max: this.minmax_plain(values.map(e => e.h.max))[1]
            },
            t: {
                min: this.minmax_plain(values.map(e => e.t.min))[0],
                max: this.minmax_plain(values.map(e => e.t.max))[1]
            }
        }

        return res;
    }

    static computeBoundaries(arrays) {

        let phRes = this.minmax(arrays.ph);
        let hRes = this.minmax(arrays.h);
        let mRes = this.minmax(arrays.t);
        
        return {
            ph: {
                minX: phRes[0][0],
                maxX: phRes[0][1],
                minY: phRes[1][0],
                maxY: phRes[1][1]
            },
            h: {
                minX: hRes[0][0],
                maxX: hRes[0][1],
                minY: hRes[1][0],
                maxY: hRes[1][1]
            },
            t: {
                minX: mRes[0][0],
                maxX: mRes[0][1],
                minY: mRes[1][0],
                maxY: mRes[1][1]
            }
        }
    }

    static computeGlobalBoundaries(coordsArr) {
        let measurement = Convert.spreadCoordinates(Convert.toSequentialCoordinates(coordsArr));
        return this.computeBoundaries(measurement);
    }
}
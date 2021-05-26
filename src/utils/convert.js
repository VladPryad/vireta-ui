export default class Convert {

    static fit(array, delay) {
        let shift  = array[0].x;
        let res =  array.map(el =>  {
            return {
                x: +el.x ,
                y: el.y
            }
        });
        return res;
    }

    static toCoordinates(records, { dPh, dH, dM} ) {
        let [ph, h, m] = [[], [], []];

        for( let el of records.measurements.ph) {
            ph.push({
                x: el.timestamp,
                y: el.value
            })
        }
        for( let el of records.measurements.humidity) {
            h.push({
                x: el.timestamp,
                y: el.value
            })
        }
        for( let el of records.measurements.mineralization) {
            m.push({
                x: el.timestamp,
                y: el.value
            })
        }

        let res = { ph: this.fit(ph, dPh), h: this.fit(h, dH), m: this.fit(m, dM) };

        return res;
    }

    static toSequentialCoordinates(records) {
        let partial = records.map((el, i) => {
            let delay = {
                dPh: 0,
                dH: 0,
                dM: 0 
            }
            if(i != 0) {
                delay.dPh = el.measurements.ph[0].timestamp - records[i - 1].measurements.ph[records[i - 1].measurements.ph.length - 1].timestamp;
                delay.dH = el.measurements.humidity[0].timestamp - records[i - 1].measurements.humidity[records[i - 1].measurements.humidity.length - 1].timestamp;
                delay.dM = el.measurements.mineralization[0].timestamp - records[i - 1].measurements.mineralization[records[i - 1].measurements.mineralization.length - 1].timestamp;
            }

            return this.toCoordinates(el, delay);
        });

        let shift = {
            ph: partial[0].ph[0].x,
            h: partial[0].h[0].x,
            m: partial[0].m[0].x
        }

        partial.forEach((element, index) => {
            for(let param in element) {
                element[param].forEach((el, i) => {
                    el.x -= shift[param]
                });
            }
        });

        return partial;
    }

    static spreadCoordinates(coords) {
        let res = {
            ph: [],
            h: [],
            m: []
        }

        for( let part of coords) {
            res.ph.push(...part.ph);
            res.h.push(...part.h);
            res.m.push(...part.m);
        }
        return res;
    }

    static toSpreadedSequentialCoordinates(records) {
        return this.spreadCoordinates(this.toSequentialCoordinates(records));
    }
}
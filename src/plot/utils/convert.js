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

    static toCoordinates(records, { dPh, dH, dT} ) {
        let [ph, h, t] = [[], [], []];

        for( let el of records.measurements.ph.values) {
            ph.push({
                x: el.timestamp,
                y: el.value
            })
        }
        for( let el of records.measurements.humidity.values) {
            h.push({
                x: el.timestamp,
                y: el.value
            })
        }
        for( let el of records.measurements.temperature.values) {
            t.push({
                x: el.timestamp,
                y: el.value
            })
        }

        let res = { ph: this.fit(ph, dPh), h: this.fit(h, dH), t: this.fit(t, dT) };

        return res;
    }

    static toSequentialCoordinates(records) {
        let partial = records.map((el, i) => {
            let delay = {
                dPh: 0,
                dH: 0,
                dT: 0 
            }
            if(i != 0) {
                delay.dPh = el.measurements.ph.values[0].timestamp - records[i - 1].measurements.ph.values[records[i - 1].measurements.ph.values.length - 1].timestamp;
                delay.dH = el.measurements.humidity.values[0].timestamp - records[i - 1].measurements.humidity.values[records[i - 1].measurements.humidity.values.length - 1].timestamp;
                delay.dM = el.measurements.temperature.values[0].timestamp - records[i - 1].measurements.temperature.values[records[i - 1].measurements.temperature.values.length - 1].timestamp;
            }

            return this.toCoordinates(el, delay);
        });

        let shift = {
            ph: partial[0].ph[0].x,
            h: partial[0].h[0].x,
            t: partial[0].t[0].x
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
            t: []
        }

        for( let part of coords) {
            res.ph.push(...part.ph);
            res.h.push(...part.h);
            res.t.push(...part.t);
        }
        return res;
    }

    static toSpreadedSequentialCoordinates(records) {
        return this.spreadCoordinates(this.toSequentialCoordinates(records));
    }
}
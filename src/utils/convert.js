export default class Convert {

    static fit(array, delay) {
        let shift  = array[0].x;
        let arr = array.map((el, i) => {
            return {
                x: el.x - shift + delay,
                y: el.y
            }
        });
        return arr;
    }

    static toCoordinates(records, { dPh = 0, dH = 0, dM = 0} ) {
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

        ph = this.fit(ph, dPh);
        h = this.fit(h, dH);
        m = this.fit(m, dM);

        return { ph, h, m };
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

        let acc = {
            ph: 0,
            h: 0,
            m: 0
        }
        partial.forEach((element, index) => {
            element.ph.forEach((el, i) => {
                el.x += acc.ph;
                acc.ph = el.x;
            });
            element.h.forEach((el, i) => {
                el.x += acc.h;
                acc.h = el.x;
            });
            element.m.forEach((el, i) => {
                el.x += acc.m;
                acc.m = el.x;
            });
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
}
export default class Convert {

    static fit(arrays) {
        return arrays;
    }

    static toCoordinates(records) {
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

        return this.fit({ ph, h, m });
    }
}
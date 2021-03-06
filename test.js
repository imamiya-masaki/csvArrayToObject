const csvArrayToObject = require('./index.js')
const fs = require('fs');
const csv = require('csv');
const main = async () => {
  fs.createReadStream("csv/testCSV.csv").pipe(csv.parse(function (err, data) {
    if (err) {
      throw Error(err)
    }
    // console.log('csvData', data, csvArrayToObject)
    const toObject = new csvArrayToObject(data[0], "Key")
    output = toObject.exec(data.slice(1))
    console.log('output', output, toObject)
    toObject.init()
    toObject.registHeader(data[0])
    toObject.registUUIDIndex(0)
    output = toObject.exec(data.slice(1))
    console.log('output', output, toObject)
  }))
}
main()
const csvArrayToObject = require('./index.js').csvToObject
const fs = require('fs');
const csv = require('csv');
const main = async () => {
  fs.createReadStream("csv/testCSV.csv").pipe(csv.parse(function (err, data) {
    if (err) {
      throw Error(err)
    }
    console.log('csvData', data, csvArrayToObject.csvToObject)
    const toObject = new csvArrayToObject(data[0], "Key")
    output = toObject.exec(data.slice(1))
    console.log('output', output)
  }))
}
main()
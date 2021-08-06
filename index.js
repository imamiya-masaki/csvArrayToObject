function _isObject(value) {
  return value !== null && typeof value === 'object'
}
function _changeType (key) {
  try {
    if (typeof key != "string") {
      key = string(key)
    }
  } catch(e) {
    throw Error(e)
  }
  return key
}
class csvToObject {
  _outputKeys = {} // src -> dst
  _header = {} // key -> number
  _numberHeader = {} // number -> key
  _uuidKey = "" // string
  registOutputKey(src, dst) {
    this._outputKeys[_changeType(src)] = _changeType(dst)
  }
  changeOutputKeys(src,dst) {
    // 一応registでも同じ役割できるがあえて用意
    if (this.outputKey.hasOwnProperty(src)) {
      this.registOutputKey(src, dst)
    } else {
      return Error("outputKey not has srcKey")
    }
  }
  registUUIDKey(key) {
    if (!this._header.hasOwnProperty(key)) {
      return Error("registed header has not uuidKey")
    }
    this._uuidKey = _changeType(key)
  }
  registOutputKeys(outputKeys) {
    if (!_isObject(outputKeys)) {
      return Error("not objectType")
    }
    for (const [key,val] of Object.entries(outputKeys)) {
      this.registOutputKey(key,val)
    }
  }
  registHeader(header, _uuidKey) {
    if (!Array.isArray(header)) {
      return Error("not array")
    }
    for (let i = 0; i < header.length; i++) {
      this._header[_changeType(header[i])] = i
      this._numberHeader[i] = _changeType(header[i])
      if (!this._outputKeys.hasOwnProperty(header[i])) {
        this.registOutputKey(header[i], header[i])
      }
    }
    if (_uuidKey) {
      const e = this.registUUIDKey(_uuidKey)
      if (e) {
        throw Error(e)
      }
    }
  }
  init() {
    this._outputKeys = {}
    this._header = {}
  }
  constructor(header = [], _uuidKey, outputKeys = {}) {
    this.init()
    this.registHeader(header, _uuidKey)
    this.registOutputKeys(outputKeys)
  }
  exec(data = []) {
    const output = {}
    if (!Array.isArray(data)) {
      return Error("not parent array")
    }
    const e = this.registUUIDKey(this._uuidKey)
    if (e) {
      return e
    }
    const uuidIndex = this._header[this._uuidKey]
    for (let i = 0; i < data.length; i++) {
      const arr = data[i]
      if (!Array.isArray(arr)) {
        return Error("not child array: " + String(i))
      }
      const uuidKey = arr[uuidIndex]
      for (const [key, index] of Object.entries(this._header)) {
        if (this._uuidKey == key) {
          // uuidの場合はcontinue
          continue
        }
        const pickOutputKey = this._outputKeys[key]
        const pickOutValue = arr[index]
        if (!output.hasOwnProperty(pickOutputKey)) {
          output[pickOutputKey] = {}
        }
        output[pickOutputKey][uuidKey] = pickOutValue
      }
    }
    return output
  }
  allInOneExec(data, _uuidKey) {
    const header = data[0]
    registHeader(header, _uuidKey)
    return this.exec(data.slice(1))
  }
}
// export default csvToObject
module.exports = { csvToObject }
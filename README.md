# how to simplely use

exSetCSV:

    [
        ["Key", "column1", "column2"],
        ["uuid1", val1, val3], 
        ["uuid2", val2, val4]
    ]

ex1:
    
    import csvToObject from "csvToObject"

    const toObject = new csvToObject()

    // regist header && UUIDKey
    toObject.registHeader(header, "Key")
    const output = toObject.exec(csvArray) // without header
    /*
    ex data:

    output {
        column1:
            uuid1: val1,
            uuid2: val2

        column2:
            uuid1: val3,
            uuid2: val4
    }
    */

ex2:

    import csvToObject from "csvToObject"

    const toObject = new csvToObject(header, "Key") // setConstructor
    const output = toObject.exec(csvArray) // without header

ex3:

    import csvToObject from "csvToObject"

    const toObject = new csvToObject()

    const output = toObject.allInOneExec(csvArray, "Key") // with header




# parameter

## header

一次元配列を受け取ります。

要素をkeyとしてindexをvalueとして保存します。

## numberHeader

一次元配列を受け取ります。

要素をvalueとしてindexをkeyとして保存します。

## uuidKey

ユニークなKey名になる列のcolumn名を保存します。

## outputKeys

Object化する時のColumn名(ex: column1, column2)を指定の名前で保存します。

# function

## constructor(header = [], _uuidKey, outputKeys = {})
headerの登録と、outputKeysが存在すれば、outputKeysも登録します。

## registOutputKey(src, dst)

srcにheader名,keyに出力したいKey名を入力し、登録します。

## changeOutputKeys(src,dst)

srcにheader名,keyに出力したいKey名を入力し、登録します。
ただし、登録されていないheader名の場合Errorを返します。

## registUUIDKey(key)

UUIDKeyをkeyで登録します。

## registOutputKeys(outputKeys)

key名とvalueでOutputKeysを登録します。

## registHeader(header, uuidKey)

headerを登録し、まだheader名で登録されていないOutputKeyがあれば、valueをheader名として、登録します。

また第二引数でuuidKeyを登録します。

## init()

parameterをすべて初期状態に戻します。

## exec(data)

引数を、二次元配列で受け取り(headerが存在する場合は除けてください。)出力を返します。

## allInOneExec(data, _uuidKey)

引数を、二次元配列で受け取り(header付きで)出力を返します。



### githubURL

https://github.com/imamiya-masaki/csvArrayToObject

### npmURL

https://www.npmjs.com/package/csv-array-to-object
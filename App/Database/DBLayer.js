import * as SQLite from 'expo-sqlite'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'


bulkInsertOrUpdate = async (items, type) => {
    type.createTable()
    let database = await type.database
    const databaseLayer = new DatabaseLayer(database, type.tableName)
    databaseLayer.bulkInsertOrReplace(items).then(response => {
        // console.log(response)
    })
}

insertOrUpdate = (item, type) => {

    type.create(item).then(response => {
        console.log(response)
    })
    
}

export default {
    bulkInsertOrUpdate,
    insertOrUpdate,
}
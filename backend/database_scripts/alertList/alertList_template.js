
db = db.getSiblingDB('demo');
db.alertList.insert({
    "_id":  ObjectId() ,
    "alertList_id": 1,
    "alertTitle": "InvalidLocationID"
});
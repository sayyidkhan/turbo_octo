//demo is the name of our database
db = db.getSiblingDB('demo');
db.locations.insert({
    "_id":  ObjectId() ,
    "location_id": 1,
    "location_name": "singapore Place"
});
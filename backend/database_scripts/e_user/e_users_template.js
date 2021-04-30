//demo is the name of our database
db = db.getSiblingDB('demo');
db.e_users.insert({
    "_id":  ObjectId() ,
    "eNRIC": "F0769666M",
    "firstName": "Tonya",
    "lastName" : "Walker",
    "password" : "password",
    "adminType" : "G",
});
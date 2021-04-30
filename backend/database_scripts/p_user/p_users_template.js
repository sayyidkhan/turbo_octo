//demo is the name of our database
db = db.getSiblingDB('demo');
db.p_users.insert({
    "_id":  ObjectId() ,
    "p_nric": "T3233582E",
    "firstname": "Ron",
    "lastname" : "funchess",
    "covid_status" : false
});
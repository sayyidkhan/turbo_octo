db = db.getSiblingDB('demo');
db.v_certs.insert({
    "_id":  ObjectId() ,
    "v_cert_id": 1,
    "p_nric": "S7599799Z",
    "v_date": new Date("2021-03-16T00:00-06:00"),
    "e_nric": "T2178025H"
});
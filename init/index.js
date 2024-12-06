const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(MONGO_URL);
};

main().then(res=>console.log("database working"));

const initDB =async ()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"674f19b4a08735b5e540a6fc"}))
    await Listing.insertMany(initdata.data);
    console.log("data was initialize");
}

initDB();
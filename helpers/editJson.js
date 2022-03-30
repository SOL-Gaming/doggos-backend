
const db = require("./initDB");

async function editJson(target_trait, new_value, file_id) {
    const doc = await db.collection('files').doc(file_id).get();

    if (doc.exists) {

        try {
            const docData = doc.data();
            console.log(docData.attributes);
            if(target_trait in await docData.attributes) {

                const index = await docData.attributes.findIndex(element => element.trait_type === target_trait);
            
                const new_attributes = await docData.attributes;
                new_attributes[index] = {trait_type: target_trait, value: new_value}

                const res = await db.collection('files').doc(file_id).update({
                    attributes: new_attributes
                 }); 

                return true;
            
                } else { return false; }
        } catch(e) {
            return false;
        }
}}

module.exports = editJson;
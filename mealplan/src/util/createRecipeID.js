import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";


const createRecipeID = async (userID, recipeTitle) => {
    let recID = recipeTitle.trim().toLowerCase().replace(/\s+/g, "-");
    let i = 1;
    try {
        let testID = await getDoc(doc(db, "users", userID, "recipes", recID));
        let newID;
        while (testID.exists()){
            newID = recID + "-" + i;
            testID = await getDoc(doc(db, "users", userID, "recipes", newID));
            i++;
        }
        recID = newID || recID;
    } catch (e) {
        console.log(e);
    }
    return (recID);
}

export default createRecipeID;
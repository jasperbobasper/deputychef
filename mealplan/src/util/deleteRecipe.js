import { collection, query } from "firebase/firestore"
import { auth, db } from "../firebase"

const deleteRecipe = (recipeID) => {

    const q = query(collection(db, "users", auth.currentUser.uid, "mealPlans"));
    
}
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import mealPlanID from "./mealPlanID";

const newMealPlan = async () => {
    const planID = mealPlanID();

    const mealPlan = await setDoc(doc(db, "users", auth.currentUser.uid, "mealPlans", planID), {
        Monday: {lunch: [], dinner: []},
        Tuesday: {lunch: [], dinner: []},
        Wednesday: {lunch: [], dinner: []},
        Thursday: {lunch: [], dinner: []},
        Friday: {lunch: [], dinner: []}, 
        Saturday: {lunch: [], dinner: []}, 
        Sunday: {lunch: [], dinner: []},
    })
    return mealPlan;
}

export default newMealPlan;
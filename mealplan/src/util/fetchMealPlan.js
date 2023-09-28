import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import mealPlanID from "./mealPlanID";
import newMealPlan from "./newMealPlan";

export default async function fetchMealPlan(userID) {
    const userMealPlan = doc(db, "users", userID, "mealPlans", mealPlanID());
    
    try {
        let mealPlan;
        const mealSnap = await getDoc(userMealPlan);
        if (mealSnap.data()) {
            mealPlan = mealSnap.data();
        } else {
            const mealPlanData = await newMealPlan();
            mealPlan = mealPlanData.data();
        }
        return (mealPlan);
    } catch (e) {
        console.log(e);
    }
}

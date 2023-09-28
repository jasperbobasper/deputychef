import { useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FontButton from "./FontButton";

const AddNewCollection = ({setAddNewCollection}) => {
    const [collection, setCollection] = useState("");

    const handleSubmit = () => {
        if (collection.trim() != "")
        updateDoc(doc(db, "users", auth.currentUser.uid), {
            recipeCollections: arrayUnion(collection),
        })
        .then(() => setAddNewCollection(false))
        .catch((e) => alert(e));
        setCollection("");
    }

    return (
        <Box 
        sx={{
            marginTop: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        component="form" 
        onSubmit={handleSubmit}>
            <TextField
            sx={{m: 1, maxWidth: "40%",}}
            size="small"
            required
            name="collection"
            onChange={(e) => setCollection(e.target.value)}
            label="New Collection..."/>
            <FontButton
              type="submit"
              font="wildwest"
              size="20px">
                Submit
            </FontButton>
        </Box>
    )
}

export default AddNewCollection;
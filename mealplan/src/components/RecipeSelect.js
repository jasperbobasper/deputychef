import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const RecipeSelect = ({recipeNames, index, selection, setSelection, userCollections, sx = []}) => {
    return (
        <FormControl fullWidth>
            <Select
                native
                id="sort"
                value={selection}
                onChange={(e) => setSelection(e.target.value, index)}
                sx={sx}
            >
                {/* {userCollections?.map((collection, index) => (
                    <optgroup label={collection} key={index}>
                    {recipeNames.find((a) => a.collection === collection)?.map((recipe) => (
                        <option 
                        value={recipe.id}
                        key={recipe.id}>
                            {recipe.title}
                        </option>
                    ))}
                    </optgroup>
                ))} */}
                        <option 
                        value="default">
                            Select one...
                        </option>
                 {recipeNames?.map((recipe) => (
                        <option 
                        value={recipe.id}
                        key={recipe.id}>
                            {recipe.name}
                        </option>
                    ))}
            </Select>
        </FormControl>
    );
  };

  export default RecipeSelect;
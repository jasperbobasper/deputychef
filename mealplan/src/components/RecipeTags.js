import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


const filter = createFilterOptions();

export default function RecipeTags({tags, user, value, setValue}) {

  return (
    <Stack spacing={3} sx={{ width: "90%", ml: 1, mt: 1}}>
      <Autocomplete
        multiple
        id="tags-filled"
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue(...value, newValue);
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue(...value, newValue.inputValue);
          } else {
            setValue(newValue);
          }
        }}
        options={user?.recipeTags?.map((option) => option)}
        value={value}
        freeSolo
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
  
          const { inputValue } = params;
          const isExisting = options?.some((option) => inputValue === option);
          if (inputValue !== '' && !isExisting) {
            filtered.push(
              inputValue,
            );
          }
  
          return filtered;
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderOption={(props, option) => <li {...props}>{option}</li>}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tags"
          />
        )}
      />
    </Stack>
  );
}
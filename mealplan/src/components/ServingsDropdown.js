import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import calculateServings from "../util/calculateServings";
import LoadingPage from "../pages/LoadingPage";

export default function ServingsDropdown({ originalServings, servings, handleServingsChange }) {
    const defaultServings = originalServings;

    const minServings = Math.floor(defaultServings / 3);
    const maxServings = defaultServings * 3;

    if (!servings) {
        return <LoadingPage />
    }
    return (
        <FormControl >
            <Select
                id="servings"
                value={servings}
                onChange={handleServingsChange}
                sx={{width: 70, height: 30, ml:2, mb:2}}
            >
                {Array.from({ length: maxServings - minServings + 1}, (_, i) => (
                    <MenuItem key={i} value={minServings + i}>{minServings + i}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
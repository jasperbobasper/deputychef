import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AccordionContainer = ({children, id, title, expanded, onChange, sx}) => {
    return (
        <Accordion expanded={expanded} onChange={() => onChange("email")} sx={sx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{color: "white"}}/>}
            aria-controls={`${id}-content`}
            id={`${id}-header`}>
            <Typography>{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {children}
          </AccordionDetails>
        </Accordion>
    )
}

export default AccordionContainer;
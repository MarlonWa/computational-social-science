import { Link } from 'react-router-dom';
import { Box, ButtonBase } from '@mui/material';

//old colours
/* const color_primary_default = "#1976d2";
const color_secondary1_default = '#e3f2fd';
const color_secondary2_default = '#bbdefb'; */

//default pink: #d159c7ff
const color_primary_default = "rgb(185, 34, 173)"; //darker pink for better readability
const color_secondary1_default = '#f5e3f3';
const color_secondary2_default = '#f0ccec';

/**
 * 
 * @param {string} color_primary - Primary color for text and icons
 * @param {string} color_secondary1 - Background color for the button
 * @param {string} color_secondary2 - Background color for the button on hover
 * @param {number} user_id - ID of the user to construct the link
 * @returns A back button component linking to the help seeking's home page
 */
export function Hilfe_Back_Home({color_primary = color_primary_default, color_secondary1 = color_secondary1_default, color_secondary2 = color_secondary2_default, user_id}) {
    return (
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <ButtonBase
                component={Link}
                to={`/hilfe/${user_id}`}
                sx={{
                    p: 1.5,     
                    backgroundColor: color_secondary1,
                    borderRadius: 1,
                    color: color_primary,
                    fontWeight: '600',
                    '&:hover': {
                        backgroundColor: color_secondary2,
                        transform: 'translateX(-4px)',
                        color: color_primary,
                    },
                    transition: 'all 0.2s ease',
                    width: 'auto',
                    fontSize: { xs: '1.6rem', sm: '2.2rem' }
                }}
            >
                ← Zurück zur Startseite
            </ButtonBase>
        </Box>
    );
}
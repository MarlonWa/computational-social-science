import Constants from '../constants/constants.js';
import { Link } from 'react-router-dom';
import { Box, ButtonBase } from '@mui/material';

/**
 * 
 * @param {string} color_primary - Primary color for text and icons
 * @param {string} color_secondary1 - Background color for the button
 * @param {string} color_secondary2 - Background color for the button on hover
 * @param {number} user_id - ID of the user to construct the link
 * @returns A back button component linking to the help seeking's home page
 */
export function Hilfe_Back_Home({color_primary = Constants.secondary_color_text, color_secondary1 = Constants.secondary_color_very_light, color_secondary2 = Constants.secondary_color_light, user_id}) {
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
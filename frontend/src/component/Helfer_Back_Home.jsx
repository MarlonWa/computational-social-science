import { Link } from 'react-router-dom';
import { Box, ButtonBase } from '@mui/material';

/**
 * 
 * @param {string} color_primary - Primary color for text and icons
 * @param {string} color_secondary1 - Background color for the button
 * @param {string} color_secondary2 - Background color for the button on hover
 * @param {number} user_id - ID of the user to construct the link
 * @returns A back button component linking to the helper's home page
 */
export function Helfer_Back_Home({color_primary = "#1976d2", color_secondary1 = '#e3f2fd', color_secondary2 = '#bbdefb', user_id}) {
    return (
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <ButtonBase
                component={Link}
                to={`/helfer/${user_id}`}
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
                    width: 'auto'
                }}
            >
                ← Zurück zur Startseite
            </ButtonBase>
        </Box>
    );
}
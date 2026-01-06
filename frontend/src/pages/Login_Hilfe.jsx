import { Link } from 'react-router-dom'
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography'
import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import Divider from "@mui/material/Divider"
import Avatar from "@mui/material/Avatar"

export function Login() {
    const topUsers = [
  { name: "Alice", points: 150 },
  { name: "Bob", points: 120 },
  { name: "Charlie", points: 100 },
];

const currentUser = { name: "You", points: 85, rank: 7 };

    return (
  <Box
    sx={{
      maxWidth: 400,
      mx: "auto",
      mt: 4,
      p: 3,
      borderRadius: 3,
      boxShadow: 4,
      bgcolor: "background.paper",
    }}
  >
    <Typography variant="h5" sx={{ mb: 3, textAlign: "center", fontWeight: 600 }}>
      Leaderboard
    </Typography>

    <Stack spacing={1}>
      {topUsers.map((user, index) => {
        const rankColors = ["#FFD700", "#C0C0C0", "#CD7F32"]; // Gold, Silver, Bronze
        return (
          <Paper
            key={user.name}
            sx={{
              p: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: currentUser.name === user.name ? "primary.light" : "grey.100",
              borderLeft: `5px solid ${rankColors[index]}`,
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: rankColors[index], color: "#fff" }}>
                {user.name[0]}
              </Avatar>
              <Typography variant="body1" fontWeight={500}>
                {user.name}
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight={500}>
              {user.points} pts
            </Typography>
          </Paper>
        );
      })}

      {/* Show current user if not in top 3 */}
      {currentUser.rank > 3 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Paper
            sx={{
              p: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderLeft: "5px solid #1976d2", // primary accent
              borderRadius: 2,
              bgcolor: "#97cbffff",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: "#1976d2", color: "#fff" }}>
                {currentUser.name[0]}
              </Avatar>
              <Typography variant="body1" fontWeight={500}>
                {currentUser.rank}. {currentUser.name}
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight={500}>
              {currentUser.points} pts
            </Typography>
          </Paper>
        </>
      )}
    </Stack>
  </Box>
);

}
import { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log({ email, password });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f172a, #1e3a8a)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            padding: 5,
            borderRadius: 4,
            backgroundColor: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              color: "white",
              fontWeight: "bold",
              mb: 4,
            }}
          >
            Login
          </Typography>

          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                input: { color: "white" },
                label: { color: "#cbd5e1" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#94a3b8",
                  },
                  "&:hover fieldset": {
                    borderColor: "#60a5fa",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3b82f6",
                  },
                },
              }}
            />

            <TextField 
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mt: 2,
                input: { color: "white" },
                label: { color: "#cbd5e1" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#94a3b8",
                  },
                  "&:hover fieldset": {
                    borderColor: "#60a5fa",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3b82f6",
                  },
                },
              }}
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
                background:
                  "linear-gradient(to right, #2563eb, #3b82f6)",
                "&:hover": {
                  background:
                    "linear-gradient(to right, #1d4ed8, #2563eb)",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
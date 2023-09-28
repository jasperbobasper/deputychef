import { CircularProgress } from "@mui/material";
import Container from "@mui/material/Container";

export default function LoadingPage() {
    return (
        <Container component="main" sx={{mt: "110px", display: "flex", alignContent: "center"}}>
            <CircularProgress />
        </Container>
    );
};
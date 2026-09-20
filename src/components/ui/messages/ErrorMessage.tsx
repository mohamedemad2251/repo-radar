import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type ErrorMessageProps = {
  error: string;
};

// GitHub can frequently give us this status code error so it is getting special treatment
const RATE_LIMIT_STATUS_CODE = 403;

const ErrorMessage = ({error}: ErrorMessageProps) => {
  return (
    <Stack
      spacing={1}
      sx={{
        flex: 1,
        minHeight: 150,
        justifyContent: "center",
        alignItems: "center",
        px: 5,
        textAlign: "center",
      }}
    >
      <CancelOutlinedIcon color="error" fontSize="large" />

      <Typography color="error">
        {error.includes(RATE_LIMIT_STATUS_CODE.toString())
          ? "Whoops! Looks like we got rate-limited. Please try again after some time."
          : "Something went wrong. Please try again later."}
      </Typography>
    </Stack>
  );
};

export default ErrorMessage;

import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";

type Props = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#2020d0", // Your primary color
      light: "rgba(32, 32, 208, 0.2)",
      dark: "#2020d0",
    },
  },
});

export const DatePicker: React.FC<Props> = ({ value, onChange, label }) => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  // Color definitions (now using theme if set globally)
  const primaryColor = theme.palette.primary.main;
  const primaryLight = theme.palette.primary.light;
  const primaryDark = theme.palette.primary.dark;

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MuiDatePicker
          value={value}
          onChange={onChange}
          label={label}
          format="dd/MM/yyyy"
          views={["day", "month", "year"]}
          desktopModeMediaQuery={
            isMobile ? "@media (pointer: coarse)" : "@media (pointer: fine)"
          }
          slotProps={{
            textField: {
              variant: "outlined",
              fullWidth: true,
              sx: {
                "& .MuiOutlinedInput-root": {
                  borderRadius: "9999px !important",
                  height: "48px",
                  "& fieldset": {
                    borderRadius: "9999px",
                    borderColor: muiTheme.palette.grey[400],
                  },
                  "&:hover fieldset": {
                    borderColor: primaryColor,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: primaryColor,
                    borderWidth: "1px",
                    boxShadow: `0 0 0 3px ${primaryLight}`,
                  },
                  "& .MuiOutlinedInput-input": {
                    borderRadius: "9999px !important",
                    padding: "12px 16px",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: muiTheme.palette.grey[600],
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: primaryColor,
                },
                "& .Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: primaryColor,
                  },
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: primaryColor,
                    boxShadow: `0 0 0 3px ${primaryLight}`,
                  },
                },
                "& .Mui-focused:after": {
                  borderColor: primaryColor,
                },
              },
            },
            openPickerButton: {
              sx: {
                color: primaryColor,
                "&:hover": {
                  backgroundColor: primaryLight,
                },
              },
            },
            popper: {
              sx: {
                "& .MuiPaper-root": {
                  borderRadius: "12px",
                  overflow: "hidden",
                },
                "& .MuiPickersDay-root": {
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: primaryLight,
                  },
                  "&.Mui-selected": {
                    backgroundColor: primaryColor,
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: primaryDark,
                    },
                  },
                  "&.MuiPickersDay-today": {
                    borderColor: `${primaryColor} !important`,
                  },
                },
                "& .MuiPickersYear-yearButton": {
                  borderRadius: "8px",
                  "&.Mui-selected": {
                    backgroundColor: primaryLight,
                    color: primaryColor,
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: primaryLight,
                    },
                  },
                  "&:hover": {
                    backgroundColor: primaryLight,
                  },
                },
                "& .MuiPickersCalendarHeader-switchViewButton": {
                  color: primaryColor,
                  "&:hover": {
                    backgroundColor: primaryLight,
                  },
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

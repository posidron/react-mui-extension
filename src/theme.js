import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: document.body,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: document.body,
      },
    },
    MuiDialog: {
      defaultProps: {
        container: document.body,
      },
    },
  },
});

export default theme;

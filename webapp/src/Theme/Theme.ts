import { createMuiTheme } from "@material-ui/core/styles";
import FormControl from "./FormControl";
import Typography from "./Typography";
import TextField from "./TextField";
import InputBase from "./InputBase";

const Theme = createMuiTheme({
  overrides: {
    MuiTextField: TextField,
    MuiTypography: Typography,
    MuiFormControl: FormControl,
    MuiInputBase: InputBase
  }
});

export default Theme;

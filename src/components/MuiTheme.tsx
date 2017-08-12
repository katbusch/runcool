import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Colors } from '../constants';

export const MuiTheme = getMuiTheme({
    palette: {
        textColor: Colors.textColor,
        alternateTextColor: Colors.alternateTextColor,
        primary1Color: Colors.primary1Color,
        primary2Color: Colors.primary2Color,
        accent1Color: Colors.accent1Color,
    },
});

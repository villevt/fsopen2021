import { Platform } from "react-native";

const theme = {
  avatars: {
    small: {
      borderRadius: 2,
      height: 50,
      width: 50
    }
  },
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#113323',
    white: "#ffffff",
    primary: '#51eda4',
    secondary: "#ebedec",
    error: "#b83a27"
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial"
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
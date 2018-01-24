import Typography from "typography";
import sternGroveTheme from "typography-theme-stern-grove";

const typography = new Typography(sternGroveTheme);

sternGroveTheme.overrideThemeStyles = ({ rhythm }, options) => ({
    'h1,h2,h3': {
        Typeface: Oswald
    }
});

export default typography;
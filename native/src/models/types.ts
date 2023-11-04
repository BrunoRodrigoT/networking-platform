// Theme colors

interface IMode {
    mode: 'light' | 'dark';
  }
  
  interface IColorsPattern {
    main: string;
    dark?: string;
    light?: string;
  }
  
  interface IColors {
    primary: IColorsPattern;
    secondary?: IColorsPattern;
    background?: string;
    text?: IColorsPattern;
    common?: {
      white: string;
      black: string;
    };
    info?: IColorsPattern;
    success?: IColorsPattern;
    warning?: IColorsPattern;
    error?: IColorsPattern;
    divider: string;
  }
  
  // Theme Typography
  
  interface ITypography {
    size: {
      body?: number;
      caption: number;
      title?: number;
      regular?: number;
    };
    fonts: {
      primary: {
        normal?: string;
        medium?: string;
        light?: string;
      };
    };
  }
  
  interface ITheme {
    colors: IColors;
    typography: ITypography;
    shape: IShape;
  }
  
  //Theme Shape
  
  interface IShape {
    borderRadius: number;
    padding: number;
    opacity: number;
    shadow?: string;
  }
  export { IMode, ITheme, IColors, ITypography, IShape };
  
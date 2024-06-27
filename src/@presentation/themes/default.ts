import {  ThemeConfig } from 'antd';

interface ITheme {
    colors: {
        primary: string;
        white: string;
    },
    text: {
        primaryColor: string;
    }

}

export const theme: ITheme = {
    colors: {
        primary: '#1bb96b',
        white: '#FFFFFF',
    },
    text: {
        primaryColor: '#FFFFFF'
    }
}

export const defaultThemeConfig: ThemeConfig = {
    token: {
        colorPrimary: theme.colors.primary,
    }
}

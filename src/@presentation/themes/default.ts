import { theme as antdTheme, ThemeConfig } from 'antd';

const { darkAlgorithm } = antdTheme;

export const defaultThemeConfig: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    // sua paleta já definida
    colorPrimary: '#2f855a',
    colorSuccess: '#48bb78',
    colorWarning: '#ecc94b',
    colorError:   '#f56565',
    colorInfo:    '#68d391',

    // fundos
    colorBgLayout:     '#202123',
    colorBgBase:       '#202123',
    colorBgContainer:  '#343541',
    colorBgElevated:   '#3e3f4b',
    colorBgMask:       'rgba(0, 0, 0, 0.45)',

    // textos: **todos** estes garantem que seja branco/pastel
    colorTextBase:         '#ffffff',             // texto normal
    colorText:             '#ffffff',             // idem
    colorTextSecondary:    'rgba(255, 255, 255, 0.65)', // texto secundário
    colorTextHeading:      '#ffffff',             // headings (titles)
    colorTextDescription:  'rgba(255, 255, 255, 0.45)', // descrições
    colorTextDisabled:     'rgba(255, 255, 255, 0.25)', // disabled

    // contorno, bordas
    colorBorder:           'rgba(255, 255, 255, 0.15)',
    colorBorderSecondary:  'rgba(255, 255, 255, 0.10)',

    // cantos & tipografia
    borderRadius: 6,
    fontFamily: 'Poppins, sans-serif',
  },
};

export interface IBorderColors {
    allowed: string;
    warning: string;
    danger: string;
    empty: string;
}

export const borderColors: IBorderColors = {
    allowed: 'rgb(0, 230, 118)',
    warning: '#B71C1C',
    danger: '#FF9800',
    empty: '#00000000',
};

export type warningType = ('EMAIL' | 'PSW' | 'LOGIN');

export const allowedColor: string = borderColors.allowed;

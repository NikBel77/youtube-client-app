export interface IBorderColors {
    allowed: string;
    warning: string;
    danger: string;
    empty: string;
}

export const borderColors: IBorderColors = {
    allowed: 'green',
    warning: 'red',
    danger: 'orange',
    empty: '#00000000',
};

export type warningType = ('EMAIL' | 'PSW' | 'LOGIN');

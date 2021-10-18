import { SvgIcon, SvgIconProps } from '@mui/material';

export const LocateOutline = (props: SvgIconProps) => (
    <SvgIcon {...props} viewBox="0 0 512 512">
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="48"
            d="M256 96V56M256 456v-40"
        />
        <path
            d="M256 112a144 144 0 10144 144 144 144 0 00-144-144z"
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="32"
        />
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="48"
            d="M416 256h40M56 256h40"
        />
    </SvgIcon>
);

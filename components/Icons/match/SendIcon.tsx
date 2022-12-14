import * as React from 'react';
import { SVGProps } from 'react';

const SendIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M15.07 5.51 6.51 1.23C.76-1.65-1.6.71 1.28 6.46l.87 1.74c.25.51.25 1.1 0 1.61l-.87 1.73c-2.88 5.75-.53 8.11 5.23 5.23l8.56-4.28c3.84-1.92 3.84-5.06 0-6.98Zm-3.23 4.24h-5.4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5.4c.41 0 .75.34.75.75s-.34.75-.75.75Z"
            fill="#7A56FE"
        />
    </svg>
);

export default SendIcon;

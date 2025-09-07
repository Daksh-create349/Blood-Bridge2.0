import { cn } from "@/lib/utils";

const BloodDropIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("w-6 h-6", className)}
    {...props}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12c0 3.69 2.47 6.86 6 8.25V22h8v-1.75c3.53-1.39 6-4.56 6-8.25C22 6.48 17.52 2 12 2zm0 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
    <path d="M12,2C6.48,2,2,6.48,2,12c0,3.69,2.47,6.86,6,8.25L12,22l4-1.75c3.53-1.39,6-4.56,6-8.25C22,6.48,17.52,2,12,2z M12,19.5 c-3.86,0-7-3.14-7-7s3.14-7,7-7s7,3.14,7,7S15.86,19.5,12,19.5z" opacity="0.1" />
    <path d="M12 4.5c-4.14 0-7.5 3.36-7.5 7.5S7.86 19.5 12 19.5s7.5-3.36 7.5-7.5S16.14 4.5 12 4.5zm0 11.5c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="url(#bloodgradient)" />
    <defs>
      <radialGradient id="bloodgradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.7 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
      </radialGradient>
    </defs>
  </svg>
);

export default BloodDropIcon;

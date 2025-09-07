import { cn } from "@/lib/utils";

const BloodDropIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-6 h-6", className)}
    {...props}
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0L12 2.69z" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" />
  </svg>
);

export default BloodDropIcon;

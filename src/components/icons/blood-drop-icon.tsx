import { cn } from "@/lib/utils";
import { HeartPulse } from "lucide-react";

const BloodDropIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <HeartPulse className={cn("w-6 h-6", className)} {...props} />
);

export default BloodDropIcon;

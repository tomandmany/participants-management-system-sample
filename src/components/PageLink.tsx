import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type PageLinkProps = {
    department?: Department;
    name: string;
    handleLinkClick: () => void;
};

export default function PageLink({ department, name, handleLinkClick }: PageLinkProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            href={`${department ? `/programs/${department}` : `/participants`}`}
            className="hover:bg-slate-200 p-2 rounded transition flex justify-between items-center"
            onClick={handleLinkClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span>{name}</span>
            {isHovered && <ChevronRight />}
        </Link>
    )
}
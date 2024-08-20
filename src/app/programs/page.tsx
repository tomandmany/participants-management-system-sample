import { ChevronRight } from "lucide-react";
import Link from "next/link";

type PageLinkProps = {
    link: string;
    children: React.ReactNode;
}

function PageLink({ link, children }: PageLinkProps) {
    return (
        <Link
            href={link}
            className="w-64 h-32 rounded-md flex gap-4 items-center border-4 justify-center bg-white hover:bg-gray-400 hover:text-white transition"
        >
            {children}
            <ChevronRight />
        </Link>
    )
}

export default async function Page() {
    return (
        <div className="flex flex-col items-center justify-center gap-12 min-h-full">
            <PageLink link='/participants'>参加団体</PageLink>
            <PageLink link='/programs/booth'>模擬店</PageLink>
            <PageLink link='/programs/outstage'>屋外ステージ</PageLink>
            <PageLink link='/programs/room'>教室</PageLink>
        </div>
    )
}
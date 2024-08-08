// app/components/Header.tsx

import ProgramDropdown from "./ProgramDropdown";
import Link from "next/link";

export default function Header() {
    return (
        <header className="py-4 px-20 border-b-2 relative left-0 top-0 bg-white space-x-10 flex z-10">
            <ProgramDropdown />
            <Link
                href={'/participants'}
                className="hover:bg-slate-200 p-2 rounded transition flex cursor-pointer relative"
            >
                参加団体管理
            </Link>
        </header>
    );
}

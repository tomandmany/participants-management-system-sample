// @/components/PageLinkListButton.tsx
'use client';

import { ChevronLeft } from 'lucide-react';
import { useRef, useState } from 'react';
import PageLink from './PageLink';

type PageLinkListButtonProps = {
    heading: string;
};

export default function PageLinkListButton({ heading }: PageLinkListButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isSubmenuHovered, setIsSubmenuHovered] = useState(false);
    const headingRef = useRef<HTMLDivElement | null>(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleSubmenuMouseEnter = () => {
        setIsSubmenuHovered(true);
    };

    const handleSubmenuMouseLeave = () => {
        setIsSubmenuHovered(false);
    };

    const handleLinkClick = () => {
        setIsHovered(false);
        setIsSubmenuHovered(false);
    };

    const isMenuActive = isHovered || isSubmenuHovered;
    const headingWidth = headingRef.current ? headingRef.current.clientWidth : 0;

    return (
        <div
            className={`text-lg bg-white shadow-md max-w-fit px-4 py-2 flex relative items-center gap-2 cursor-pointer z-10 rounded-md`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={headingRef}
        >
            <span>{heading}</span>
            <ChevronLeft
                className={`transition-transform ${isMenuActive ? "rotate-180" : "rotate-0"}`}
            />
            <div
                className={`absolute flex-col gap-4 top-0 rounded-md shadow-lg border p-4 min-w-[250px] bg-white transition-opacity ${isMenuActive ? "flex" : "hidden"}`}
                onMouseEnter={handleSubmenuMouseEnter}
                onMouseLeave={handleSubmenuMouseLeave}
                style={{ left: `${headingWidth}px` } as React.CSSProperties}
            >
                <PageLink name="参加団体" handleLinkClick={handleLinkClick} />
                <PageLink department="booth" name="模擬店" handleLinkClick={handleLinkClick} />
                <PageLink department="outstage" name="屋外ステージ" handleLinkClick={handleLinkClick} />
                <PageLink department="room" name="教室" handleLinkClick={handleLinkClick} />
            </div>
        </div>
    );
}

// // SocialMediaInterface.tsx
// import { FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";
// import { ExternalLink, Rss } from "lucide-react";
// import Image from 'next/image';
// import { ReactNode } from 'react';

// export type SocialMediaModel = {
//     id: string;
//     socialMediaModelName: string;
// };

// export type SocialMediaEntry = {
//     id: string;
//     name: string;
//     url: string;
// };

// export const iconMap: { [key: string]: ReactNode } = {
//     x: <FaXTwitter />,
//     instagram: <FaInstagram />,
//     tiktok: <FaTiktok />,
//     note: <Image src={"/note.svg"} alt='note' width={13} height={13} className='ml-[2px] mr-[1px]' />,
//     blog: <Rss className='w-4' />,
// };

// export const getIconForSocialMedia = (name: string): ReactNode => {
//     return iconMap[name.toLowerCase()] || <ExternalLink />;
// };

// export const validateSocialMediaEntry = (entry: Partial<SocialMediaEntry>): string | null => {
//     if (!entry.name || !entry.url) {
//         return 'Both name and URL are required';
//     }
//     if (entry.url.trim() === '') {
//         return 'URL cannot be empty';
//     }
//     return null;
// };
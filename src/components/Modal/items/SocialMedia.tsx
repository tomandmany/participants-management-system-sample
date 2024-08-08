'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import getSocialMediaModels from '@/data/socialMediaModels';
import { FaInstagram, FaTiktok, FaXTwitter } from 'react-icons/fa6';
import Image from 'next/image';
import { ExternalLink, PlusIcon, Rss, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

type SocialMediaProps = {
    newParticipantSocialMedias: NewSocialMedia[];
    setNewParticipantSocialMedias: Dispatch<SetStateAction<NewSocialMedia[]>>;
};

export type NewSocialMedia = {
    id: string;
    name: string;
    url: string;
};

const iconMap: { [key: string]: React.ReactNode } = {
    x: <FaXTwitter />,
    instagram: <FaInstagram />,
    tiktok: <FaTiktok />,
    note: <Image src={"/note.svg"} alt='note' width={13} height={13} className='ml-[2px] mr-[1px]' />,
    blog: <Rss className='w-4' />,
};

export default function SocialMedia({ newParticipantSocialMedias, setNewParticipantSocialMedias }: SocialMediaProps) {
    const [newParticipantSocialMediaName, setNewParticipantSocialMediaName] = useState<string>('');
    const [newParticipantSocialMediaUrl, setNewParticipantSocialMediaUrl] = useState<string>('');
    const [socialMediaModels, setSocialMediaModels] = useState<SocialMediaModel[]>([]);
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSocialMediaModels() {
            const models = await getSocialMediaModels();
            setSocialMediaModels(models);
        }
        fetchSocialMediaModels();
    }, []);

    const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const name = event.target.value;
        setNewParticipantSocialMediaName(name);
    };

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setNewParticipantSocialMediaUrl(url);
    };

    const handleAddSocialMedia = () => {
        if (!newParticipantSocialMediaName || !newParticipantSocialMediaUrl) {
            setError('種類とURLの両方を入力してください');
            return;
        }

        const selectedModel = socialMediaModels.find(model => model.socialMediaModelName === newParticipantSocialMediaName);
        if (!selectedModel) {
            setError('選択されたSNSの種類が無効です');
            return;
        }

        const updatedSocialMedias = [
            ...newParticipantSocialMedias,
            { id: selectedModel.id, name: selectedModel.socialMediaModelName, url: newParticipantSocialMediaUrl },
        ];

        setNewParticipantSocialMedias(updatedSocialMedias);

        setNewParticipantSocialMediaName('');
        setNewParticipantSocialMediaUrl('');
        setPopoverOpen(false);
        setError(null);
    };

    const handleRemoveSocialMedia = (modelName: string) => {
        const updatedSocialMedias = newParticipantSocialMedias.filter(m => m.name !== modelName);
        setNewParticipantSocialMedias(updatedSocialMedias);
        // setNewParticipantSocialMedias('socialMedia', updatedSocialMedias.map(media => media.data));
    };

    const handleUrlUpdate = (modelId: string, newUrl: string) => {
        const updatedSocialMedias = newParticipantSocialMedias.map(media =>
            media.name === modelId ? { ...media, data: { ...media, url: newUrl } } : media
        );
        setNewParticipantSocialMedias(updatedSocialMedias);
        // setNewParticipantSocialMedias('socialMedia', updatedSocialMedias.map(media => media.data));
    };

    return (
        <div className='w-full'>
            <label className="block mb-1">SNSアカウント</label>
            <div className="flex flex-col gap-2 mb-4">
                {newParticipantSocialMedias.map((media) => (
                    <div key={media.name} className="flex items-center">
                        {iconMap[media.name.toLowerCase()] || <ExternalLink />}
                        <span className='ml-2'>:</span>
                        <input
                            type="text"
                            value={media.url}
                            onChange={(e) => handleUrlUpdate(media.name, e.target.value)}
                            className="cursor-pointer rounded px-2 py-1 ml-2 border w-full hover:bg-gray-200 focus:bg-inherit"
                        />
                        <Button
                            variant="ghost"
                            className="p-2 w-[36px] ml-auto"
                            type='button'
                            onClick={() => handleRemoveSocialMedia(media.name)}
                        >
                            <Trash2 className="text-red-600" />
                        </Button>
                    </div>
                ))}
            </div>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="p-2 flex justify-center items-center gap-3 hover:border-gray-600 max-w-fit mx-auto">
                        <PlusIcon />
                        SNSを追加する
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-fit p-4">
                    <div className="flex flex-col gap-3">
                        <select
                            value={newParticipantSocialMediaName}
                            onChange={handleNameChange}
                            className='cursor-pointer rounded px-2 py-1 hover:bg-gray-200 border'
                        >
                            <option value="">選択してください</option>
                            {socialMediaModels
                                .filter((model) => !newParticipantSocialMedias.some(socialMedia => socialMedia.name === model.socialMediaModelName))
                                .map((model) => (
                                    <option key={model.id} value={model.socialMediaModelName}>{model.socialMediaModelName}</option>
                                ))}
                        </select>
                        <input
                            type="text"
                            value={newParticipantSocialMediaUrl}
                            onChange={handleUrlChange}
                            placeholder="リンクを入力"
                            className="cursor-pointer rounded px-2 py-1 hover:bg-gray-200 border focus:bg-inherit"
                        />
                        {error && <div className="text-red-600">{error}</div>}
                        <Button onClick={handleAddSocialMedia} className="self-end">
                            追加
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

// @filename: /components/AddRowButton.tsx
'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PlusIcon, X } from "lucide-react";
import AddRowModal from './AddRowModal';
import TargetSelector from './TargetSelector';

type AddRowButtonProps = {
    participants: Participant[];
}

export default function OpenModalButton({ participants }: AddRowButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
    const [target, settarget] = useState<Target>('participant');

    const handleModalOpen = (target: Target) => {
        setIsPopoverOpen(false);
        setIsModalOpen(true);
        settarget(target);
        document.body.style.overflow = "hidden"; // スクロールを止める
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        document.body.style.overflow = ""; // スクロールを元に戻す
    };

    return (
        <div className='ml-auto'>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                    {
                        isPopoverOpen ? (
                            <Button
                                className="mr-12 flex justify-center items-center gap-3 shadow-md bg-white text-gray-700 border hover:bg-gray-100 hover:border-gray-600"
                                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                            >
                                <X />
                                <span>閉じる</span>
                            </Button>
                        ) : (
                            <Button
                                className="flex justify-center items-center gap-3 shadow-md bg-white text-gray-700 border hover:bg-gray-100 hover:border-gray-600"
                                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                            >
                                <PlusIcon />
                                <span>データを追加する</span>
                            </Button>
                        )
                    }
                </PopoverTrigger>
                <PopoverContent className="w-fit mt-4">
                    <div className="flex flex-col justify-around items-center gap-3">
                        <TargetSelector handleModalOpen={handleModalOpen} target='participant' />
                        <hr className='bg-black w-full' />
                        <div className='space-y-2'>
                            <TargetSelector handleModalOpen={handleModalOpen} target='booth' />
                            <TargetSelector handleModalOpen={handleModalOpen} target='outstage' />
                            <TargetSelector handleModalOpen={handleModalOpen} target='room' />
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            {isModalOpen && <AddRowModal onClose={handleModalClose} participants={participants} target={target} />}
        </div>
    );
}

import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import React from 'react'

type TargetSelectorProps = {
    handleModalOpen: (target: Target) => void;
    target: Target;
}

export default function TargetSelector({ handleModalOpen, target }: TargetSelectorProps) {
    let targetName;
    switch (target) {
        case 'participant':
            targetName = '団体';
            break;
        case 'booth':
            targetName = '模擬店';
            break;
        case 'outstage':
            targetName = '屋外ステージ';
            break;
        case 'room':
            targetName = '教室';
            break;
        default:
            return;
    }

    return (
        <Button
            variant='ghost'
            className="flex justify-start items-center gap-3 bg-white w-full text-gray-700 border border-transparent hover:border-gray-700"
            onClick={() => handleModalOpen(target)}
        >
            <PlusIcon />
            {target === 'participant' ? (
                <span>{targetName}を追加する</span>
            ) : (
                <span>{targetName}企画を追加する</span>
            )}
        </Button>
    )
}

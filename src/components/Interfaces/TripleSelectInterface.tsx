// @filename: /app/components/items/TripleSelectInterface.tsx
'use client';

import { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Circle, X } from 'lucide-react';
import IconQuestion from '@/components/icons/IconQuestion';

type TripleSelectInterfaceProps = {
    options: { value: string, label: string }[];
    value: string;
    columnKey: string;
    onIconChange: (newValue: string) => void;
};

const iconMap: Record<string, Record<string, JSX.Element>> = {
    photographPermission: {
        "撮影可": <Circle />,
        "撮影不可": <X />,
    },
    isDrinkAvailable: {
        "販売有り": <Circle />,
        "販売無し": <X />,
    },
    isEcoTrayUsed: {
        "利用有り": <Circle />,
        "利用無し": <X />,
    },
    isEventTicketAvailable: {
        "チケット有り": <Circle />,
        "チケット無し": <X />,
    },
    isReservationRequired: {
        "整理券有り": <Circle />,
        "整理券無し": <X />,
    },
    isGoodsAvailable: {
        "販売有り": <Circle />,
        "販売無し": <X />,
    },
};

export default function TripleSelectInterface({
    options,
    value: initialValue,
    columnKey,
    onIconChange,
}: TripleSelectInterfaceProps) {
    const [value, setValue] = useState<string>(initialValue);
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleIconChange = (newValue: string) => {
        setValue(newValue);
        onIconChange(newValue);
        setPopoverOpen(false);
    };

    const renderIconAndLabel = (option: { value: string, label: string }) => {
        const icon = iconMap[columnKey]?.[option.value] || <IconQuestion />;
        return (
            <>
                {icon}
                {option.label}
            </>
        );
    };

    return (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={`flex cursor-pointer rounded mx-auto hover:border-gray-600 transition ${value === "不明" ? "py-[5px] pl-[5px] pr-[12px] gap-1" : "p-2 gap-3"}`}
                >
                    {renderIconAndLabel({ value, label: options.find(option => option.value === value)?.label || '不明' })}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
                <div className="flex justify-around items-center gap-3">
                    {options.map(option => (
                        <Button
                            key={option.value}
                            variant="ghost"
                            onClick={() => handleIconChange(option.value)}
                            className='flex justify-center items-center gap-3 py-1 px-2'
                        >
                            {renderIconAndLabel(option)}
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

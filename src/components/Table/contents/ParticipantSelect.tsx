// @filename: /components/ParticipantSelect.tsx
'use client'

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent, useState, useEffect, useRef, KeyboardEvent, FocusEvent } from "react";

type ParticipantSelectProps = {
    participants: Participant[];
    setInputValue: (value: string) => void;
}

export default function ParticipantSelect({ participants, setInputValue }: ParticipantSelectProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setIsDropdownOpen(e.target.value !== ''); // 検索クエリが空でない場合にのみドロップダウンを表示
    };

    const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if ((e.metaKey && e.key === 'Enter') || (e.ctrlKey && e.key === 'Enter')) {
            const target = e.target as HTMLInputElement;
            target.blur(); // Blur the input to trigger the handleBlur event
        }
    };

    const handleSearchBlur = (e: FocusEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); // フォーカスが外れた時に値を設定
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredParticipants = participants.filter(participant =>
        participant.participantName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="flex border rounded">
                <input
                    id='participantName'
                    name='participantName'
                    type="text"
                    placeholder="参加団体名を検索する"
                    value={searchQuery}
                    onKeyDown={handleSearchKeyDown}
                    onChange={handleSearchChange}
                    onBlur={handleSearchBlur}
                    className="w-full p-2"
                />
                <Button
                    variant={'ghost'}
                    type="button"
                    onClick={toggleDropdown}
                    className="cursor-pointer rounded p-2 border border-transparent flex items-center justify-between"
                >
                    {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
            </div>
            {
                isDropdownOpen && (
                    <div className="absolute top-10 left-0 w-full bg-white border border-gray-300 mt-1 rounded shadow-lg z-10">
                        <div className="max-h-48 overflow-y-auto">
                            {filteredParticipants.map((participant) => (
                                <div
                                    key={`${participant.id}-${participant.participantName}`}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                        setSearchQuery(participant.participantName || '');
                                        setInputValue(participant.participantName || ''); // 項目が選択された時に値を設定
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {participant.participantName}
                                </div>
                            ))}
                            {filteredParticipants.length === 0 && (
                                <div className="p-2 text-gray-500">
                                    該当する団体が見つかりません
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        </div>
    );
}

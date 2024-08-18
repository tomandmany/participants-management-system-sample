// @filename: /components/ParticipantSelect.tsx
'use client'

import { ChangeEvent, useState, useRef, KeyboardEvent } from "react";

type Participant = {
    id: string;
    participantName?: string;
    ruby?: string;
};

type ParticipantSelectProps = {
    participants: Participant[];
    setInputValue: (value: string) => void;
};

export default function ParticipantSelect({ participants, setInputValue }: ParticipantSelectProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setError(null);
    };

    const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if ((e.metaKey && e.key === 'Enter') || (e.ctrlKey && e.key === 'Enter')) {
            const target = e.target as HTMLInputElement;
            target.blur();
        }
    };

    const handleSearchBlur = () => {
        // 少しの遅延を入れてからフォーカス状態を解除しないと、クリックが無視されてしまう可能性がある
        setTimeout(() => {
            setIsFocused(false);

            if (searchQuery.trim() === '') {
                setError('入力してください。');
                // setInputValue('');
                // setSearchQuery('');
                return;
            }

            const matchingParticipant = participants.find(participant =>
                participant.participantName?.toLowerCase() === searchQuery.toLowerCase()
            );

            if (!matchingParticipant) {
                setError('該当する団体が見つかりません。');
                setInputValue('');
                // setSearchQuery('');
            } else {
                setInputValue(searchQuery);
            }
        }, 200);
    };

    const handleSearchFocus = () => {
        setIsFocused(true);
    };

    const searchQueryLower = searchQuery.toLowerCase();

    const filteredParticipants = participants.filter(participant => {
        const nameLower = participant.participantName?.toLowerCase() || '';
        const rubyLower = participant.ruby?.toLowerCase() || '';
        return nameLower.includes(searchQueryLower) || rubyLower.includes(searchQueryLower);
    });

    return (
        <div className="relative" ref={containerRef}>
            <input
                id='participantName'
                name='participantName'
                type="text"
                placeholder="参加団体名を検索する"
                value={searchQuery}
                onKeyDown={handleSearchKeyDown}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                autoComplete="new-off"
                className="w-full p-2 border rounded"
            />
            {isFocused && (
                <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 mt-1 rounded shadow-lg z-10">
                    <div className="max-h-48 overflow-y-auto">
                        {filteredParticipants.map((participant) => (
                            <div
                                key={`${participant.id}-${participant.participantName}`}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                                onMouseDown={() => {
                                    setSearchQuery(participant.participantName || '');
                                    setInputValue(participant.participantName || ''); // 項目が選択された時に値を設定
                                    setIsFocused(false);
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
            )}
            {error && (
                <div className="mt-2 text-red-500">
                    {error}
                </div>
            )}
        </div>
    );
}

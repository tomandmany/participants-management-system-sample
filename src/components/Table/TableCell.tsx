// @filename: /src/components/TableCell.tsx
'use client';

import {
    useContext,
    useEffect,
    useRef,
    useState,
    KeyboardEvent,
    FocusEvent,
    Dispatch,
    SetStateAction,
    useId
} from 'react';
import Context from '@/app/contexts/context';
import updateParticipant from '@/actions/participants/updateParticipant';
import SelectableDropdown from './contents/SelectableDropdown';
import TripleSelect from './contents/TripleSelect';
import SocialMedia from './contents/SocialMedia';
import ProgramImage from './contents/ProgramImage';
import updateProgram from '@/actions/programs/updateProgram';
import { tripleOptions, selectOptions } from '@/data/options';
import { getWidth } from '@/lib/getWidth';

type TableCellProps = {
    program?: UnionProgram
    participant: Participant;
    participantSocialMedias: ParticipantSocialMedia[];
    columnKey: string;
    onParticipantSocialMediaChanges: Dispatch<SetStateAction<ParticipantSocialMedia[]>>;
};

export default function TableCell({
    program,
    participant,
    participantSocialMedias,
    columnKey,
    onParticipantSocialMediaChanges: handleParticipantSocialMediaChanges
}: TableCellProps) {
    const context = useContext(Context);
    if (!context) {
        throw new Error('TableCell must be used within a Provider');
    }
    const { maxWidths, setMaxWidth, rowHeights, setRowHeight, department } = context;

    const [inputValue, setInputValue] = useState<string>('');
    const [inputWidth, setInputWidth] = useState<number>(50);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const tableCellRef = useRef<HTMLDivElement>(null);
    const uniqueSelectId = useId();

    useEffect(() => {
        if (columnKey === 'socialMedia' || columnKey === 'programImage') {
            return;
        }

        if (program && program[columnKey as keyof UnionProgram]) {
            setInputValue(program[columnKey as keyof UnionProgram] || '');
        } else if (participant && participant[columnKey as keyof Participant]) {
            setInputValue(participant[columnKey as keyof Participant] || '');
        } else {
            setInputValue('');
        }
    }, [program, participant, columnKey, department]);

    useEffect(() => {
        const font = getComputedStyle(document.body).font;
        const width = getWidth(inputValue, font) + 18; // 余白のために少し幅を追加
        setInputWidth(width);
        setMaxWidth(columnKey, width);
    }, [inputValue, columnKey, setMaxWidth]);

    useEffect(() => {
        if (tableCellRef.current) {
            const currentHeight = tableCellRef.current.offsetHeight;
            setRowHeight(participant.id, currentHeight);
        }
    }, [participant.id, setRowHeight]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasUnsavedChanges]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInputValue(event.target.value);
        setHasUnsavedChanges(true);
    };

    const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
        if ((event.metaKey && event.key === 'Enter') || (event.ctrlKey && event.key === 'Enter')) {
            const target = event.target as HTMLInputElement;
            target.blur(); // Blur the input to trigger the handleBlur event
        }
    };

    const handleBlur = async (event: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const newValue = event.target.value;
        if (newValue.trim() === '') {
            setError('このフィールドは空にできません');
            return;
        }
        if (!program?.id && !participant.id) {
            setError('No ID provided');
            return;
        }
        const formData = new FormData();
        if (program && department) {
            formData.append('id', program.id);
            if (columnKey) {
                formData.append(columnKey, newValue);
            }
            const response = await updateProgram(formData, department);
            if (!response.success) {
                console.error('Failed to update program:', response.error);
                setError('Failed to update program');
            } else {
                setError(null);
            }
        } else if (participant) {
            formData.append('id', participant.id);
            if (columnKey) {
                formData.append(columnKey, newValue);
            }
            const response = await updateParticipant(formData);
            if (!response.success) {
                console.error('Failed to update participant:', response.error);
                setError('Failed to update participant');
            } else {
                setError(null);
            }
        } else {
            console.error('No program or participant provided');
        }

        setHasUnsavedChanges(false);
    };

    const maxWidth = maxWidths[columnKey] || inputWidth;
    const maxHeight = Math.max(...Object.values(rowHeights)) || 'auto';

    let content;
    if (selectOptions[columnKey]) {
        content = (
            <SelectableDropdown
                value={inputValue}
                options={selectOptions[columnKey]}
                onChange={handleChange}
                onBlur={handleBlur}
                maxWidth={maxWidth}
            />
        );
    } else if (tripleOptions[columnKey]) {
        content = (
            <TripleSelect
                programId={program?.id!}
                value={inputValue}
                columnKey={columnKey}
                options={tripleOptions[columnKey]}
                setHasUnsavedChanges={setHasUnsavedChanges}
            />
        );
    } else {
        switch (columnKey) {
            case 'socialMedia':
                content = (
                    <SocialMedia
                        participantId={participant.id}
                        participantSocialMedias={participantSocialMedias}
                        tableCellRef={tableCellRef}
                        onParticipantSocialMediaChanges={handleParticipantSocialMediaChanges}
                    />
                );
                break;
            case 'programImage':
                content = (
                    <ProgramImage
                        programId={program?.id!}
                        participantId={participant.id}
                        imageUrl={program?.programImage!}
                        tableCellRef={tableCellRef}
                    />
                );
                break;
            default:
                if (!department || program && program[columnKey as keyof UnionProgram]) {
                    content = (
                        <input
                            type="text"
                            id={uniqueSelectId}
                            name={uniqueSelectId}
                            value={inputValue}
                            className={`cursor-pointer rounded px-2 py-1 hover:bg-gray-200 focus:bg-inherit focus:hover:bg-inherit focus:cursor-text ${error && 'border-2 border-red-600'}`}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            onBlur={handleBlur}
                            style={{ minWidth: `${maxWidth}px` }}
                        />
                    )
                } else if (department) {
                    content = (
                        <div className='mx-10'>
                            {inputValue}
                        </div>
                    )
                }
            /* 企画一覧でも参加団体名やフリガナを変更したい場合は、上記をコメントアウトして下記をアンコメントする。

            content = (
                <input
                    type="text"
                    id={uniqueSelectId}
                    name={uniqueSelectId}
                    value={inputValue}
                    className={`cursor-pointer rounded px-2 py-1 hover:bg-gray-200 focus:bg-inherit focus:hover:bg-inherit focus:cursor-text ${error && 'border-2 border-red-600'}`}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    style={{ minWidth: `${maxWidth}px` }}
                />
            )
            */
        }
    }

    return (
        <div
            ref={tableCellRef}
            className={`min-w-max p-2 bg-white border-b flex flex-col justify-center items-center ${columnKey === 'SNSアカウント' && 'justify-center'}`}
            style={{ minHeight: `${maxHeight}px` }}
        >
            {content}
            {error && <div className="text-red-600">{error}</div>}
        </div>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { boothProgramColumns, outstageProgramColumns, participantColumns, roomProgramColumns } from '@/data/columns';
import ParticipantSelect from './items/ParticipantSelect';
import InputItem from './items/InputItem';
import ProgramImage from './items/ProgramImage';
import SelectableDropdown from './items/SelectableDropdown';
import createParticipant from '@/actions/participants/createParticipant';
import createProgram from '@/actions/programs/createProgram';
import createProgramImage from '@/actions/storages/programImages/createProgramImage';
import createParticipantSocialMedia from '@/actions/participantSocialMedia/createParticipantSocialMedia';
import TripleSelect from './items/TripleSelect';
import { selectOptions, tripleOptions } from '@/data/options';
import SocialMedia, { NewSocialMedia } from './items/SocialMedia';

type AddRowModalProps = {
    onClose: () => void;
    participants: Participant[];
    target: Target;
};

export default function AddRowModal({ onClose: handleModalClose, participants, target }: AddRowModalProps) {
    const [columns, setColumns] = useState<{ label: string, key: string }[]>([]);
    const [targetName, setTargetName] = useState<string>('');
    const [inputValues, setInputValues] = useState<{ [key: string]: string | File | { type: string, url: string } }>({});
    const [programImageFile, setProgramImageFile] = useState<File | null>(null);
    const [newParticipantSocialMedias, setNewParticipantSocialMedias] = useState<NewSocialMedia[]>([]);

    useEffect(() => {
        switch (target) {
            case 'participant':
                setTargetName('団体');
                setColumns(participantColumns);
                break;
            case 'booth':
                setTargetName('模擬店企画');
                setColumns(boothProgramColumns);
                break;
            case 'outstage':
                setTargetName('屋外ステージ企画');
                setColumns(outstageProgramColumns);
                break;
            case 'room':
                setTargetName('教室企画');
                setColumns(roomProgramColumns);
                break;
            default:
                return;
        }
    }, [target]);

    const handleInputChange = (key: string, value: string | File | { type: string, url: string }) => {
        setInputValues({
            ...inputValues,
            [key]: value
        });
    };

    const handleParticipantSelect = (participantName: string) => {
        setInputValues({
            ...inputValues,
            participantName
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        columns
            .filter(column => column.key !== 'socialMedia')
            .map((column) => {
            formData.append(column.key, inputValues[column.key] as string | Blob);
        });

        if (target !== 'participant') {
            const participant = participants.find(participant => participant.participantName === inputValues['participantName']);
            if (participant) {
                formData.append('participantId', participant.id);
            }
        }

        if (programImageFile) {
            const imageFormData = new FormData();
            imageFormData.append('file', programImageFile);

            const imageResponse = await createProgramImage(imageFormData, target);
            if (imageResponse.success && imageResponse.url) {
                formData.append('programImage', imageResponse.url);
            } else {
                console.error('Failed to upload image:', imageResponse.error);
                return;
            }
        }

        if (target === 'participant') {
            const response = await createParticipant(formData);

            if (response.success) { // id が正しく返されることを確認
                const participantId = response.data?.id;

                if (newParticipantSocialMedias.length > 0) {
                    const socialMediaResponses = await Promise.all(newParticipantSocialMedias.map(socialMedia => {
                        const socialMediaFormData = new FormData();
                        socialMediaFormData.append('socialMediaModelId', socialMedia.id);
                        socialMediaFormData.append('participantId', participantId!); // ここで取得した id を使用
                        socialMediaFormData.append('url', socialMedia.url);
                        console.log("socialMedia.id: ", socialMedia.id);
                        console.log("participantId: ", participantId);
                        console.log("socialMedia.url: ", socialMedia.url);
                        return createParticipantSocialMedia(socialMediaFormData);
                    }));

                    if (socialMediaResponses.some(response => !response.success)) {
                        console.error('Failed to create social media:', socialMediaResponses);
                    }
                }

                handleModalClose(); // すべての処理が成功した後でモーダルを閉じる

            } else {
                console.error('Failed to submit participant:', response.error);
            }
        } else {
            const response = await createProgram(formData, target);

            if (!response.success) {
                console.error('Failed to submit:', response.error);
            } else {
                handleModalClose();
            }
        }

    };

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className='w-full h-full fixed' onClick={handleModalClose} />
            <div className="bg-white rounded-lg p-6 w-96 relative">
                <div className="flex justify-between items-center rounded-t-lg absolute top-0 left-0 bg-white border-b min-w-full px-4 py-6 z-10">
                    <h2 className="text-xl font-bold">新しい{targetName}を追加</h2>
                    <Button variant="ghost" onClick={handleModalClose} className='p-2 border border-transparent hover:border-gray-600'>
                        <X />
                    </Button>
                </div>
                <form className="flex flex-col gap-10 items-end overflow-y-auto max-h-[80vh] pt-24 px-6 -mx-6" onSubmit={handleSubmit}>
                    {target !== 'participant' && (
                        <div className='w-full'>
                            <label className="block mb-1">参加団体名</label>
                            <ParticipantSelect participants={participants} setInputValue={handleParticipantSelect} />
                        </div>
                    )}
                    {columns
                        .filter(column => column.key !== 'programImage' && column.key !== 'socialMedia')
                        .map((column, index) => (
                            selectOptions[column.key] ? (
                                <SelectableDropdown
                                    key={`${column.key}-${index}`}
                                    column={column}
                                    value={inputValues[column.key] as string}
                                    options={selectOptions[column.key]}
                                    onChange={(value) => handleInputChange(column.key, value)}
                                />
                            ) : (
                                tripleOptions[column.key] ? (
                                    <TripleSelect
                                        key={`${column.key}-${index}`}
                                        column={column}
                                        value={inputValues[column.key] as string}
                                        options={tripleOptions[column.key]}
                                        onInputChange={handleInputChange}
                                    />
                                ) : (
                                    <InputItem key={`${column.key}-${index}`} column={column} onInputChange={handleInputChange} />
                                )
                            )
                        ))}
                    {
                        target !== 'participant' ? (
                            <ProgramImage onUploadSuccess={setProgramImageFile} />
                        ) : (
                            <SocialMedia newParticipantSocialMedias={newParticipantSocialMedias} setNewParticipantSocialMedias={setNewParticipantSocialMedias} />
                        )
                    }
                    <Button
                        type="submit"
                        variant="default"
                    >
                        追加
                    </Button>
                </form>
            </div>
        </div>,
        document.body
    );
}

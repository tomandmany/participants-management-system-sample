import { Skeleton } from "@/components/ui/skeleton";

export default function PageSuspense() {
    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-lg bg-white shadow-md max-w-fit px-4 py-2 rounded-md">読み込み中...</h1>
                <div className="px-4 py-2 flex justify-center items-center gap-3 shadow-md bg-white text-gray-700 border">読み込み中...</div>
            </div>
            <Skeleton className="w-full h-[500px] mx-auto rounded-md flex justify-center items-center text-2xl text-gray-600">
                読み込み中...
            </Skeleton>
        </>
    )
}
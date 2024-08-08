import { Metadata } from "next";
import { getBoothPrograms } from "@/data/programs/boothPrograms";
import PageInterface from "@/components/Interfaces/PageInterface";
import PageSuspense from "@/components/PageSuspense";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "模擬店企画管理ページ",
    description: "模擬店企画の管理ページです。",
};

export default async function Page() {
    const programs = await getBoothPrograms();

    return (
        <Suspense fallback={<PageSuspense />}>
            <PageInterface programs={programs} heading="模擬店" />
        </Suspense>
    );
}

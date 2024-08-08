import { Metadata } from "next";
import { getOutstagePrograms } from "@/data/programs/outstagePrograms";
import PageInterface from "@/components/Interfaces/PageInterface";
import PageSuspense from "@/components/PageSuspense";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "屋外ステージ企画管理ページ",
    description: "屋外ステージ企画の管理ページです。",
};

export default async function Page() {
    const programs = await getOutstagePrograms();

    return (
        <Suspense fallback={<PageSuspense />}>
            <PageInterface programs={programs} heading="屋外ステージ" />
        </Suspense>
    );
}

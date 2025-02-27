import { useEffect } from "react";
import { useRouter } from "next/router";
import { Layout } from "@/components/layout";
import { Subject } from "@/components/subject";
import { useSession } from "next-auth/react";

export default function Home() {
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        //ログインしていない場合はログインページにリダイレクト
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [router, status]); // routerが変更された時に再実行される


    return (
        <Layout headerImgSrc="/home-header.jpg">
            <div className="mt-[25px]">
                <Subject subject="HTML" subjectColor="#EC6630" subjectSlug1="html-1" subjectSlug2="html-2" subjectSlug3="html-3"></Subject>
                <Subject subject="CSS" subjectColor="#0096E6" subjectSlug1="css-1" subjectSlug2="css-2" subjectSlug3="css-3"></Subject>
                <Subject subject="Python" subjectColor="#FFCC3E" subjectSlug1="python-1" subjectSlug2="python-2" subjectSlug3="python-3"></Subject>
                <Subject subject="Django" subjectColor="#33604F" subjectSlug1="django-1" subjectSlug2="django-2" subjectSlug3="django-3"></Subject>
            </div>
        </Layout>
    );
}

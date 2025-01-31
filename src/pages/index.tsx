import { Layout } from "@/components/layout";
import { Subject } from "@/components/subject";
// import { useState } from "react";

export default function Home() {

    return (
        <Layout headerImgSrc="/home-header.jpg">
            <div className="mt-[25px]">
                <Subject subject="HTML" subjectColor="#EC6630" subjectSlug1="html1" subjectSlug2="html2" subjectSlug3="html3"></Subject>
                <Subject subject="CSS" subjectColor="#0096E6" subjectSlug1="css1" subjectSlug2="css2" subjectSlug3="css3"></Subject>
                <Subject subject="Python" subjectColor="#FFCC3E" subjectSlug1="python1" subjectSlug2="python2" subjectSlug3="python3"></Subject>
                <Subject subject="Django" subjectColor="#33604F" subjectSlug1="django1" subjectSlug2="django2" subjectSlug3="django3"></Subject>
            </div>
        </Layout>
    );
}

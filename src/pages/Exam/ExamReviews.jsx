import React from 'react';
import Table from '../../components/Table/Table.jsx'
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import {useNavigate} from "react-router-dom";

const ExamReviews = () => {
    // use Navigate
    const navigate = useNavigate()

    // bread crumb items
    const breadCrumbItems = [
        { label: "الرئيسية", href: "/" },
        { label: "المرحلة الابتدائية", href: "/stage_details" },
        { label: "الصف الاول", href: "/level_details" },
        { label: "رياضيات", href: "/lessons" },
        { label: "الامتحان الاول"},
    ];
    const headers = ['الأسئلة الخاطئة', 'الأسئلة المحلولة', 'النتيجة'];
    const rows = [5, 5, 5];

    // handling navigating to review solutions page
    const handleNavigate = (examId) => {
        navigate('/app/exam/review_solutions', { state : {id: examId}});
    }

    return (
        <>
            <Breadcrumb items={breadCrumbItems} />
            <div className="flex flex-col mx-4  min-h-screen rounded-xl shadow-lg lg:ml-42 bg-gray-100 p-4">
                <div className="w-full max-w-4xl mx-auto mt-8">
                    <Table headers={headers} rows={rows} />
                    <button
                        onClick={()=>handleNavigate(1)}
                        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded cursor-pointer flex mx-auto">
                        إظهار الحل
                    </button>
                </div>
            </div>
        </>
    );
};

export default ExamReviews;
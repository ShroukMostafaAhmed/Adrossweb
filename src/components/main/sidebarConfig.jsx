import React from "react";
import {Subscription, Grid2x2, WatchLater, Calendar} from "lucide-react";
import { GiTeacher} from "react-icons/gi";
import {GoPerson} from "react-icons/go";

export const sidebarConfig = [
    {
        title: "الرئيسية",
        icon: <Grid2x2 />,
        path: "/",
        subcategories: [],
        key: "home"
    },
    {
        title: "التنزيلات",
        path: "/WatchLater",
        icon: <WatchLater />,
        subcategories: [],
        key: "students"
    },
    {
        title: "التقويم",
        path: "/calendar",
        icon: <Calendar />,
        subcategories: [],
        key: "calendar"
    },
    {
        title: "الاشتراكات",
        path: "/Subscription",
        icon: <Subscription />,
        subcategories: [],
        key: "Subscription"
    },
    {
        title: "الملف الشخصى",
        path: "/profile",
        icon: <GoPerson/>,
        subcategories: [],
        key: "exams"
    },
];

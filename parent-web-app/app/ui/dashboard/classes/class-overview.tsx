"use client";
import { useState } from "react";
import { AddClassButton } from "./add-class";
import ClassGroups from "./class-list";

export default function ClassOverview(){
    const [refreshKey, setRefreshKey] = useState(0);

    const handleClassAdded = () => {
        // Force a refresh of the ClassGroups component
        setRefreshKey(prev => prev + 1);
    };

    return(
        <>
            <AddClassButton onClassAdded={handleClassAdded}/>
            <ClassGroups key={refreshKey}/>
        </>
    )
}
"use client";
import AdminNav from "./admin-nav"
import AdminCard from "./admin-card";
import AdminCardEdit from "./admin-card-edit";
import { useState } from "react";

const initialAdminData = [
  { label: 'Full Name', value: 'Tola Diamond', key: 'fullName' },
  { label: 'Email Addres', value: 'tendertouch@gmail.com', key: 'email' },
  { label: 'Phone number', value: '08037743942', key: 'phone' },
  { label: 'School Name', value: 'Tenderkids School', key: 'schoolName' },
  { label: 'Role', value: 'Principal', key: 'role' },
  { label: 'Teachers Name', value: 'Mr JS Brown', key: 'teacherName' },
  { label: 'Account Created On', value: '10-12-2023', key: 'createdOn' },
  { label: 'Total Students', value: '456', key: 'totalStudents' },
  { label: 'Number of Clases', value: '25', key: 'numClasses' },
];

export default function AdminOverview(){
    const [adminData, setAdminData] = useState(initialAdminData);
    // 0 is view, 1 is edit
    const [activeTab, setActiveTab] = useState(0); 

    const handleEditSave = (newData: typeof adminData) => {
      setAdminData(newData);
      setActiveTab(0);
    };

    return(
        <>
            <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 0 ? (
              <AdminCard adminData={adminData} onEdit={() => setActiveTab(1)} />
            ) : (
              <AdminCardEdit adminData={adminData} onSave={handleEditSave} onCancel={() => setActiveTab(0)} />
            )}
        </>
    )
}
"use client"
import React, { useState, useEffect } from 'react'
import RoutineComponent from './RoutineComponent'
import { ClassXIBehalaRoutineSet1, ClassXIBehalaRoutineSet2, ClassXIIBehalaRoutineSet1, ClassXIIBehalaRoutineSet2, ClassXIIKhanakulRoutineSet1, ClassXIIKhanakulRoutineSet2, ClassXIKhanakulRoutineSet1, ClassXIKhanakulRoutineSet2, ClassXRoutineBehala } from "@/lib/data"

const RoutineClient = ({ selectedClass }: { selectedClass: "10" | "11" | "12" | "All" }) => {
  const allItems = [
    <RoutineComponent header="Class XI Exam Routine - Behala Centre" year="2026-27" setNo="1" data={ClassXIBehalaRoutineSet1} />,
    <RoutineComponent header="Class XI Exam Routine - Behala Centre" year="2026-27" setNo="2" data={ClassXIBehalaRoutineSet2} />,
    <RoutineComponent header="Class XI Exam Routine - Khanakul Centre" year="2026-27" setNo="1" data={ClassXIKhanakulRoutineSet1} />,
    <RoutineComponent header="Class XI Exam Routine - Khanakul Centre" year="2026-27" setNo="2" data={ClassXIKhanakulRoutineSet2} />,
    <RoutineComponent header="Class XII Exam Routine - Behala Centre" year="2026-27" setNo="1" data={ClassXIIBehalaRoutineSet1} />,
    <RoutineComponent header="Class XII Exam Routine - Behala Centre" year="2026-27" setNo="2" data={ClassXIIBehalaRoutineSet2} />,
    <RoutineComponent header="Class XII Exam Routine - Khanakul Centre" year="2026-27" setNo="1" data={ClassXIIKhanakulRoutineSet1} />,
    <RoutineComponent header="Class XII Exam Routine - Khanakul Centre" year="2026-27" setNo="2" data={ClassXIIKhanakulRoutineSet2} />,
    <RoutineComponent header="Class - X - IIT & Medical Foundation - Behala Centre" year="2026-27" setNo="1" data={ClassXRoutineBehala} />
  ];

  const [items, setItems] = useState(allItems);

  useEffect(() => {
    if (selectedClass === "10") {
      setItems([allItems[8]]);
    } else if (selectedClass === "11") {
      setItems(allItems.slice(0, 4));
    } else if (selectedClass === "12") {
      setItems(allItems.slice(4, 8));
    } else {
      setItems(allItems);
    }
  }, [selectedClass]);

  return (
    <>
      {items.map((item, index) => (
        <div key={index} className="mb-8">
          {item}
        </div>
      ))}
    </>
  );
};

export default RoutineClient;

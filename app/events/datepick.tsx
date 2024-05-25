"use client";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DatePick = () => {
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    const handleValueChange = (newValue: any) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    };

    return (
        <Datepicker
            containerClassName={'border relative rounded'} // Mengubah padding untuk ukuran kecil
            inputClassName={'py-1 px-2'}
            primaryColor="red"
            placeholder="Periode Waktu"
            useRange={false}
            value={value}
            onChange={handleValueChange}
        />
    );
};
export default DatePick;

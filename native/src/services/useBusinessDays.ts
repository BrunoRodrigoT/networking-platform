import { useState, useEffect } from "react";
import Holidays from "date-holidays";
import { eachDayOfInterval, isWeekend } from "date-fns";

interface BusinessDay {
  date: Date;
}

function useBusinessDays(
  year: number,
  month: number,
  countryCode: string = "BR"
) {
  const [businessDays, setBusinessDays] = useState<BusinessDay[]>([]);

  useEffect(() => {
    const holidays = new Holidays(countryCode);
    const holidaysList = holidays.getHolidays(year);

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    const filteredDays = dateRange.filter(
      (date) => !isWeekend(date) && !isHoliday(date, holidaysList)
    );

    const businessDaysData: BusinessDay[] = filteredDays.map((date) => ({
      date,
    }));

    setBusinessDays(businessDaysData);
  }, [year, month, countryCode]);

  function isHoliday(date: Date, holidaysList: any[]) {
    const formattedDate = formatDate(date);
    return holidaysList.some((holiday) => holiday.date === formattedDate);
  }

  function formatDate(date: Date) {
    return date.toISOString().slice(0, 10);
  }

  return businessDays;
}

export default useBusinessDays;

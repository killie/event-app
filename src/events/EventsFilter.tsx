import React, { ReactElement } from 'react';

interface EventsFilterProps {
    sources: string[],
    onFilterChange: (fromDate: number, toDate: number, sourceId?: string) => void
}

export default function EventsFilter(props: EventsFilterProps): ReactElement {
    let thisYear = new Date().getUTCFullYear();
    let thisMonth = new Date().getUTCMonth();

    // TODO: Type ahead for sources
    
    const months = () => {
	    const months = [];
	    for (let month = 0; month < 12; month++) {
	        months.push(new Date(thisYear, month, 1).toLocaleString("default", {month: "short"}));
	    }
	    return months.map((month, index) => {
	        return <option key={month} value={index}>{month}</option>;
	    });
    };

    const onMonthChange = (e: any) => thisMonth = e.target.value;

    const years = () => {
	    const years = [];
	    for (let year = new Date().getUTCFullYear(); year >= 2010; year--) {
            years.push(year);
        }
	    return years.map((year) => <option key={year}>{year}</option>);
    };

    const onYearChange = (e: any) => thisYear = e.target.value;

    const onFilter = () => {
	    const fromDate = Date.UTC(thisYear, thisMonth, 1);
	    const toDate = (thisMonth === 11 ? Date.UTC(thisYear + 1, 0, 1) : Date.UTC(thisYear, thisMonth + 1, 1));
	    props.onFilterChange(fromDate, toDate - 1);
    };
    
    return (
	    <div className="EventsFilter">
	        <div><span>Month:</span><select defaultValue={thisMonth} onChange={onMonthChange}>{months()}</select></div>
	        <div><span>Year:</span><select onChange={onYearChange}>{years()}</select></div>
	        <div><span>Source:</span><input type="text"></input></div>
	        <div><button onClick={onFilter}>Filter</button></div>
	    </div>
    );
}



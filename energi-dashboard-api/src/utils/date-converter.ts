export const convertDateRef2SDate = (date: string): Date => {
    const [month, year] = date.split('/');
    console.log('MONTH ==>', month);
    const monthsMap: Record<string, number> = {
        '--': 0,
        'JAN': 1,
        'FEV': 2,
        'MAR': 3,
        'ABR': 4,
        'MAI': 5,
        'JUN': 6,
        'JUL': 7,
        'AGO': 8,
        'SET': 9,
        'OUT': 10,
        'NOV': 11,
        'DEZ': 12,
    };

    const idx = monthsMap[month.toUpperCase() || '--'];

    console.log('MONTH ==>', idx);
    const monthNumber = idx;
    console.log('Data ===> ', `${year}-${monthNumber}-01`);
    const d = new Date(`${year}-${monthNumber}-01`);
    return d;
};


export const convertDueDate = (date: string): Date => {
    const [day, month, year] = date.split('/');
    console.log('MONTH ==>', month);

    return new Date(`${year}-${month}-${day}`);
};



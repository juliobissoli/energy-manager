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
    const monthNumber = idx + 1;
    return new Date(`${year}-${monthNumber}-01`);
};


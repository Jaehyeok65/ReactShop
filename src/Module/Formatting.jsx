


export const Formatting = (source, delimiter = '-') => {
    const year = source.getFullYear();
    let month = (source.getMonth() + 1);
    if(parseInt(month) < 10 && parseInt(month) > 0) {
        month = '0' + month;
    }
    let day = (source.getDate());
    if(parseInt(day) < 10 && parseInt(day) > 0) {
        day = '0' + day;
    }

    return [year, month, day].join(delimiter);
}
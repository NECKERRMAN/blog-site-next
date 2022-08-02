const formatDate = (dateString: string) => {
    const fullDate = new Date(dateString);
    let month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const readable = `${fullDate.getDate()} ${
        month[fullDate.getMonth()]
    } ${fullDate.getFullYear()} - ${fullDate.getHours()}:${fullDate.getMinutes()}`;
    return readable;
};

export default formatDate;

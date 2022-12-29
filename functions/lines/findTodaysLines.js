export const findTodaysLines = (date, lines) => {
    const parsedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    let result = []
    for (const line in lines) {
        if (lines[line].snapshot.substring(0, 10) == parsedDate) result.push(lines[line])
    }
    return result
}
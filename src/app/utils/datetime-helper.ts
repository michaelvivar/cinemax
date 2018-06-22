export function combineDateTime(date: Date, time: string) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = parseInt(time.split(':')[0]);
    let minute = parseInt(time.split(':')[1].split(' ')[0]);
    if (time.split(':')[1].split(' ')[1] == 'PM' && hour != 12) {
      hour += 12;
    }
    return new Date(year, month, day, hour, minute);
}

export function computeEndTime(time: string, runtime: number) {
    let hour = parseInt(time.split(':')[0]);
    let minute = parseInt(time.split(':')[1].split(' ')[0]);
    if (time.split(':')[1].split(' ')[1] == 'PM' && hour != 12) {
        hour += 12;
    }
    minute += runtime;
    const date = new Date(2000, 1, 1, hour, minute, 0);
    const t = date.toLocaleString().split(', ')[1];
    const h = t.split(':')[0];
    const m = parseInt(t.split(':')[1]);
    const a = t.split(' ')[1];
    return h + ':' + (m < 10 ? '0' + m : m) + ' ' + a;
}
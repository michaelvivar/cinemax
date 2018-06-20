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
    if (time.split(':')[1].split(' ')[1] == 'PM') {
      if (hour > 12) {
        hour += 12;
      }
    }
    if (runtime > 60) {
      hour += parseInt(<any>(runtime / 60));
    }
    minute += runtime % 60;
    if (minute > 59) {
      hour++;
      minute = minute - 60;
    }
    if (minute == 0) {
        minute = <any>'00';
    }
    if (hour >= 12) {
        if (hour > 12) {
            hour -= 12;
        }
      return hour + ':' + minute + ' PM';
    }
    else {
      return hour + ':' + minute + ' AM';
    }
}
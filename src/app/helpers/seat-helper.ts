export const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export function  generateSeats(row: number, column: number) {
    const seats = {};
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            const key = i + '' + j;
            seats[key] = { id: key, row: i, column: j, value: 0, name: letters[i] + '' + (j + 1) }
        }
    }
    return seats;
}
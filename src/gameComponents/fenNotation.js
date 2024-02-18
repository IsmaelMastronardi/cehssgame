/* eslint-disable no-restricted-globals */
//   displayBoard() {
//     for (let rank = 0; rank <= 7; rank++) {
//       let row = "";
//       for (let file = 0; file < 8; file++) {
//         const index = rank * 8 + file;
//         row += this.board[index] + " ";
//       }
//       console.log(row);
//     }
//   }

const initialPostion = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

const convertToBoard = (fen) => {
  const result = [];
  const rows = fen.split('/');
  rows.forEach((row) => {
    const temp = [];
    row.split(' ').forEach((char) => {
      if (isNaN(Number(char))) {
        temp.push(char);
      } else {
        const val = Number(char);
        for (let i = 0; i < val; i += 1) {
          temp.push('0');
        }
      }
    });
    result.push(temp.join(''));
  });
  return (result.join(''));
};
const convertToFen = (board) => {
  const result = [];
  board.match(/.{1,8}/g).forEach((row, index) => {
    let count = 0;
    const temp = [];
    const splitted = row.split('');
    for (let i = 0; i < splitted.length; i += 1) {
      if (isNaN(Number(splitted[i]))) {
        if (count > 0) {
          temp.push(count);
          count = 0;
        }
        temp.push(splitted[i]);
      } else {
        count += 1;
        if (i === 7) {
          temp.push(count);
          count = 0;
        }
      }
    }
    if (index !== 7) { result.push(`${temp.join('')}/`); } else {
      result.push(temp.join(''));
    }
  });
  return (result.join(''));
};

const board = convertToBoard(initialPostion);
console.log(convertToFen(board));

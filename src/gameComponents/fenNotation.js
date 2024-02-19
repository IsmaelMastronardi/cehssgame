/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
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

const pawnMoveRules = () => {

};

const isSquareEmpty = (index) => (board[index] === '0');
const isOppoentsPiece = (index, playerColor) => {
  console.log(playerColor);
  const pieceColor = board[index].toUpperCase() === board[index] ? 'white' : 'black';
  return pieceColor !== playerColor;
};
const clearSquare = (index) => {
  board[index] = '0';
};

const generatePawnMoves = (initSquare) => {
  const result = [];
  const pieceColor = board[initSquare].toUpperCase() === board[initSquare] ? 'white' : 'black';

  if (((initSquare) % 8 !== 0) && board[initSquare + 7] && !isSquareEmpty(board[initSquare + 7] && isOppoentsPiece(board[initSquare + 7], pieceColor))) {
    result.push(initSquare + 7);
  }
  if (board[initSquare + 8] && isSquareEmpty(board[initSquare + 8])) {
    result.push(initSquare + 8);
  }
  if (((initSquare + 9) % 8 !== 0) && board[initSquare + 9] && !isSquareEmpty(board[initSquare + 9] && isOppoentsPiece(board[initSquare + 9], pieceColor))) {
    result.push(initSquare + 9);
  }
  return result;
};

const generateRookMoves = (initSquare) => {
  const pieceColor = board[initSquare].toUpperCase() === board[initSquare] ? 'white' : 'black';
  const result = [
    ...moveVertical(initSquare, -1, pieceColor),
    ...moveHorizontal(initSquare, -1, pieceColor),
    ...moveHorizontal(initSquare, +1, pieceColor),
    ...moveVertical(initSquare, +1, pieceColor),
  ];
  return result;
};

const generateBishopMoves = (initSquare) => {
  const pieceColor = board[initSquare].toUpperCase() === board[initSquare] ? 'white' : 'black';
  const result = [
    ...moveDiagonal(initSquare, -1, +1, pieceColor),
    ...moveDiagonal(initSquare, +1, +1, pieceColor),
    ...moveDiagonal(initSquare, -1, -1, pieceColor),
    ...moveDiagonal(initSquare, +1, -1, pieceColor),
  ];
  return result;
};

const moveVertical = (initSquare, direction, pieceColor) => {
  const moves = [];
  const newSquare = initSquare + direction * 8;
  if (board[newSquare]) {
    if (isSquareEmpty(newSquare)) {
      moves.push(newSquare, ...moveVertical(newSquare, direction, pieceColor));
    } else if (isOppoentsPiece(newSquare, pieceColor)) {
      moves.push(newSquare);
    }
  }
  return moves;
};

const moveHorizontal = (initSquare, direction, pieceColor) => {
  const moves = [];
  const newSquare = initSquare + direction;
  if (board[newSquare]) {
    if (direction === -1 && ((initSquare) % 8 !== 0)) {
      if (isSquareEmpty(newSquare)) {
        moves.push(newSquare, ...moveHorizontal(newSquare, direction, pieceColor));
      } else if (isOppoentsPiece(newSquare, pieceColor)) {
        moves.push(newSquare);
      }
    }
    if (direction === +1 && ((initSquare + 9) % 8 !== 0)) {
      if (isSquareEmpty(newSquare)) {
        moves.push(newSquare, ...moveHorizontal(newSquare, direction, pieceColor));
      } else if (isOppoentsPiece(newSquare, pieceColor)) {
        moves.push(newSquare);
      }
    }
  }
  return moves;
};

const moveDiagonal = (initSquare, direction, horizontalDirection, pieceColor) => {
  const moves = [];
  const newSquare = initSquare + horizontalDirection * 8 + direction;
  if (board[newSquare]) {
    if (direction === -1 && (initSquare) % 8 !== 0) {
      if (isSquareEmpty(newSquare)) {
        moves.push(newSquare, ...moveDiagonal(newSquare, direction, horizontalDirection, pieceColor));
      } else if (isOppoentsPiece(newSquare, pieceColor)) {
        moves.push(newSquare);
      }
    }
    if (direction === +1 && ((initSquare + 9) % 8 !== 0)) {
      console.log(pieceColor);
      if (isSquareEmpty(newSquare)) {
        moves.push(newSquare, ...moveDiagonal(newSquare, direction, horizontalDirection, pieceColor));
      } else if (isOppoentsPiece(newSquare, pieceColor)) {
        moves.push(newSquare);
      }
    }
  }
  return moves;
};
// generatePawnMoves(15, board);
// generateRookMoves(16, board);
console.log(generateBishopMoves(8, board));
// console.log(generateMoves(board));
// console.log(convertToFen(board));

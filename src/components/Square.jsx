/* eslint-disable react/prop-types */
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { selectPieceIcon } from '../gameComponents/pieces';

import { movePiece } from '../redux/slices/boardSlice';

const Square = ({ value, isDark, index }) => {
  const bgColor = isDark ? 'bg-green-500' : 'bg-white';
  const dispatch = useDispatch();

  const handleDrop = (oldPost, newPos) => {
    dispatch(movePiece(oldPost, newPos));
  };

  const [, drag] = useDrag({
    type: 'PIECE',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'PIECE',
    drop: (item) => handleDrop(item.value, value),
  });

  const piece = selectPieceIcon(value);
  return (
    <div className={`border border-gray-500 p-4 text-center ${bgColor}`} ref={drop}>
      <div className="w-12 h-12" ref={drag}>{piece}</div>
    </div>
  );
};

export default Square;

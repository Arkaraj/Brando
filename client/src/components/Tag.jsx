import React from 'react';
import { Link } from 'react-router-dom';

const colorMap = {
  blue: {
    bg: 'bg-blue-200',
    text: 'text-blue-700',
  },
  green: {
    bg: 'bg-green-200',
    text: 'text-green-700',
  },
  red: {
    bg: 'bg-red-200',
    text: 'text-red-700',
  },
  yellow: {
    bg: 'bg-yellow-200',
    text: 'text-yellow-700',
  },
};

const genreColorMap = {
  Action: 'blue',
  Animation: 'blue',
  'Science Fiction': 'blue',
  Western: 'blue',
  Mystery: 'blue',
  Adventure: 'green',
  Comedy: 'green',
  Documentary: 'green',
  Fantasy: 'green',
  Thriller: 'green',
  Crime: 'red',
  Horror: 'red',
  History: 'red',
  Romance: 'red',
  War: 'red',
};

const Tag = ({ genre }) => {
  const clr = genreColorMap[genre] || 'yellow';
  const { bg, text } = colorMap[clr];

  return (
    <Link
      to={`/genres/${genre}`}
      className={`text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 ${bg} ${text} rounded-full cursor-pointer mx-4 my-2`}
    >
      {genre}
    </Link>
  );
};

export default Tag;

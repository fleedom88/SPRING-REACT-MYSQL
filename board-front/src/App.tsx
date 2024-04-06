import React from 'react';

import './App.css';
import BoardItem from 'components/BoardListitem';
import { latestBoardListMock } from 'mocks';

function App() {
  return (
    <>
      {latestBoardListMock.map(boardListItem =><BoardItem boardListItem={boardListItem} />)}     
    </>
  );
}

export default App;

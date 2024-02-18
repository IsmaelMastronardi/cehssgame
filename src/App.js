import { DndProvider } from 'react-dnd';
import './App.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Home from './pages/Home';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main>
        <Home />
      </main>
    </DndProvider>
  );
}

export default App;

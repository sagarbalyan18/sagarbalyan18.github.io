import './App.css';
import GamesList from './components/GamesList';
import Search from './components/Search';
import GameDetails from './components/GameDetails';
import Navbar from './components/Navbar'; // ✅ Move navigation to a separate file
import { Routes, Route } from 'react-router-dom';
import UpcomingEvents from './components/UpcomingEvents';

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<GamesList />} />
          <Route path="/search" element={<Search />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
          <Route path="/game/:id" element={<GameDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
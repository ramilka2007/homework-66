import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './containers/Home/Home';
import NewMeal from './containers/NewMeal/NewMeal';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-meal" element={<NewMeal />} />
      </Routes>
    </Layout>
  );
};

export default App;

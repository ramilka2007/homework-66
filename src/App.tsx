import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './containers/Home/Home';
import NewMeal from './containers/NewMeal/NewMeal';
import EditMeal from './containers/EditMeal/EditMeal';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-meal" element={<NewMeal />} />
        <Route path="/edit-meal/:id" element={<EditMeal />} />
      </Routes>
    </Layout>
  );
};

export default App;

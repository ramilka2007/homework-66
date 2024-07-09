import React, { useState } from 'react';
import { ApiMeal } from '../../types';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MealForm from '../../components/MealForm/MealForm';

const NewDish: React.FC = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const createMeal = async (meal: ApiMeal) => {
    try {
      setIsCreating(true);
      await axiosApi.post('/meals.json', meal);
      navigate('/');
      toast.success('Meal created successfully.');
    } catch {
      toast.error('There was an error while creating meal.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <MealForm onSubmit={createMeal} isLoading={isCreating} />
      </div>
    </div>
  );
};

export default NewDish;

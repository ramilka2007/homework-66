import React from 'react';
import { Meal } from '../../types';
import MealsItem from './MealsItem';
import { NavLink } from 'react-router-dom';

interface Props {
  meals: Meal[];
  totalKcal: number;
  deleteMeal: (id: string) => void;
  deletingProcess: boolean;
}

const Meals: React.FC<Props> = ({
  meals,
  totalKcal,
  deleteMeal,
  deletingProcess,
}) => {
  return (
    <div>
      <div className="d-flex justify-content-evenly align-items-center">
        <h4>Total calories: {totalKcal} kcal</h4>
        <NavLink
          className="navbar-brand fs-4 text-black fw-bold"
          to="/add-meal"
        >
          Add new meal
        </NavLink>
      </div>

      {meals.map((meal) => (
        <MealsItem
          key={meal.id}
          meal={meal}
          onDelete={() => deleteMeal(meal.id)}
          isLoading={deletingProcess}
        />
      ))}
    </div>
  );
};

export default Meals;

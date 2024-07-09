import React from 'react';
import { Meal } from '../../types';
import { Link } from 'react-router-dom';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  meal: Meal;
  onDelete: VoidFunction;
  isLoading: boolean;
}

const MealsItem: React.FC<Props> = ({ meal, onDelete, isLoading = false }) => {
  return (
    <div className="container-fluid d-flex justify-content-between align-items-center border border-2 border-black p-4 mb-3">
      <div className="col-6 text-start">
        <span className="opacity-50 fs-2">{meal.mealTime}</span>
        <p className="fs-4 fw-bold">{meal.description}</p>
      </div>
      <div className="col-6 d-flex justify-content-between align-items-center">
        <div className="fs-3 fw-bold">
          <strong>{meal.calories} kcal</strong>
        </div>
        <div>
          <button
            className="btn btn-danger mb-3"
            onClick={onDelete}
            disabled={isLoading}
          >
            {isLoading && <ButtonSpinner />}
            Delete
          </button>
          <br />
          <Link className="btn btn-success" to={`/edit-meal/${meal.id}`}>
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealsItem;

import React, { useState } from 'react';
import { ApiMeal, MealMutation } from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import Spinner from '../Spinner/Spinner';

interface Props {
  onSubmit: (meal: ApiMeal) => void;
  existingMeal?: ApiMeal;
  isLoading?: boolean;
}

const MealForm: React.FC<Props> = ({ onSubmit, existingMeal, isLoading = false }) => {
  const [mealMutation, setMealMutation] = useState<MealMutation>({
    mealTime: 'breakfast',
    description: '',
    calories: '',
  });
  const [loading, setLoading] = useState(false);

  const changeMeal = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setMealMutation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    onSubmit({
      ...mealMutation,
      calories: parseInt(mealMutation.calories),
    });

    setLoading(false);
  };
  return (
    <form onSubmit={onFormSubmit}>
      <h1>Add new dish</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="mealTime" className="fs-4">
              Meal time
            </label>
            <select
              name="mealTime"
              id="mealTime"
              className="form-control"
              value={mealMutation.mealTime}
              onChange={changeMeal}
            >
              <option value="breakfast">Breakfast</option>
              <option value="snack">Snack</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>
          <div className="form-group mt-4 mb-4">
            <label htmlFor="description" className="fs-4">
              Meal description
            </label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Meal description"
              onChange={changeMeal}
              value={mealMutation.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="calories" className="fs-4">
              Meal calories (kcal)
            </label>
            <input
              type="number"
              name="calories"
              id="calories"
              required
              min="1"
              className="form-control"
              onChange={changeMeal}
              value={mealMutation.calories}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={isLoading}
          >
            {isLoading && <ButtonSpinner />}
            Create
          </button>
        </>
      )}
    </form>
  );
};

export default MealForm;

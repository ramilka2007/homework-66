import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import { ApiMeal } from '../../types';
import { toast } from 'react-toastify';
import MealForm from '../../components/MealForm/MealForm';

const EditDish = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState<ApiMeal | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchMeal = useCallback(async () => {
    const { data: meal } = await axiosApi.get<ApiMeal | null>(
      `/meals/${id}.json`,
    );
    setMeal(meal);
  }, [id]);

  const updateMeal = async (meal: ApiMeal) => {
    try {
      setIsUpdating(true);
      await axiosApi.put(`/meals/${id}.json`, meal);
      toast.success('Meal updated successfully.');
    } catch {
      toast.error('There was an error updating the meal!');
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    void fetchMeal();
  }, [fetchMeal]);

  return (
    <div className="row mt-2">
      <div className="col">
        {meal && (
          <MealForm
            onSubmit={updateMeal}
            existingMeal={meal}
            isLoading={isUpdating}
          />
        )}
      </div>
    </div>
  );
};

export default EditDish;

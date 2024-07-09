import React, { useCallback, useEffect } from 'react';
import { ApiMeals, Meal } from '../../types';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';
import Meals from '../../components/Meals/Meals';
import { toast } from 'react-toastify';

const Home = () => {
  const [meals, setMeals] = React.useState<Meal[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      const { data: meals } = await axiosApi.get<ApiMeals | null>(
        '/meals.json',
      );

      if (!meals) {
        return setMeals([]);
      }

      const newMeals: Meal[] = Object.keys(meals).map((id) => {
        return {
          id,
          ...meals[id],
        };
      });

      setMeals(newMeals);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals]);

  const deleteMeals = async (id: string) => {
    try {
      if (window.confirm('Are you sure you want to delete this dish?')) {
        setDeleting(true);
        await axiosApi.delete(`/meals/${id}.json`);
        toast.success('Meal deleted successfully');
        await fetchMeals();
      }
    } catch (e) {
      toast.error('Could not delete this meal');
    } finally {
      setDeleting(false);
    }
  };

  const totalKcal = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Meals
          meals={meals}
          deleteMeal={deleteMeals}
          totalKcal={totalKcal}
          deletingProcess={deleting}
        />
      )}
    </div>
  );
};

export default Home;

export interface Meal {
  id: string;
  mealTime: string;
  description: string;
  calories: number;
}

export type ApiMeal = Omit<Meal, 'id'>;

export interface MealMutation {
  mealTime: string;
  description: string;
  calories: string;
}

export interface ApiMeals {
  [id: string]: ApiMeal;
}

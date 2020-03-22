export interface SelectOption {
  value: any;
  label: string;
}

export enum IntensityUnit {
  none,
  weight,
  speed
}

export enum WeightUnits {
  lbs,
  kg
}

export enum SpeedUnits {
  mps
}

export enum DistanceUnits {
  m,
  ft,
  km,
  mi
}

export enum HeightUnits {
  cm,
  in,
  ft,
  m
}

export enum IntensityType {
  absolute,
  relative
}
export type CurrentUserData = {
  authorizedUser: User;
};
export type TokenData = { login: { token: string } };
export type User = {
  id: number;
  username: string;
};
export type NewExercise = Omit<Exercise, "id">;
export type Exercise = {
  id: number;
  name: string;
  intensityUnit: IntensityUnit;
};
export type NewWorkout = Omit<Workout, "id">;

export type Workout = {
  id: number;
  name?: string;
  description?: string;
  workgroups: Workgroup[];
};
export type NewWorkgroup = Omit<Workgroup, "id" | "rounds"> & {
  rounds: NewRound[];
};

export type Workgroup = {
  id: number;
  sortOrder: number;
  note?: string;
  rounds: Round[];
};

export enum IntervalType {
  none,
  inclusive,
  exclusive
}
export type NewRound = Omit<Round, "id" | "worksets"> & {
  worksets: NewWorkset[];
};

export type Round = {
  id: number;
  sortOrder: number;
  interval: number;
  intervalType: IntervalType;
  worksets: Workset[];
};
export type NewWorkset = Omit<Workset, "id">;

export type Workset = {
  id: number;
  exercise: Exercise;
  exerciseName?: string;
  reps: number;
  intensityType: IntensityType;
  intensity: number;
  intervalType: IntervalType;
  interval: number;
};

export interface SelectOption {
  value: any;
  label: string;
}

export enum IntensityUnit {
  none,
  weight,
  speed,
}

export enum WeightUnits {
  lbs,
  kg,
}

export enum SpeedUnits {
  mps,
}

export enum DistanceUnits {
  m,
  ft,
  km,
  mi,
}

export enum HeightUnits {
  cm,
  in,
  ft,
  m,
}

export enum IntensityType {
  absolute,
  relative,
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
export type NewWorkout = Omit<Workout, "id" | "user"> & { userId?: number };

export type Workout = {
  id: number;
  name?: string;
  description?: string;
  user: User;
  workgroups: Workgroup[];
};

export type NewResult = Omit<Result, "id" | "user"> & { userId?: number };

export type Result = {
  id: number;
  name?: string;
  description?: string;
  completedAt: Date;
  user: User;
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
  exclusive,
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

export type Program = {
  id: number;
  name: string;
  description: string;
  user: User;
  phases: Phase[];
};
export type NewProgram = Omit<Program, "id" | "phases" | "user"> & {
  phases: NewPhase[];
  userId: number;
};

export type Phase = {
  id: number;
  name: string;
  sortOrder: number;
  description: string;
  cycles: Cycle[];
};
export type NewPhase = Omit<Phase, "id" | "cycles"> & { cycles: NewCycle[] };
export type Cycle = {
  id: number;
  name: string;
  sortOrder: number;
  description: string;
  trainingSessions: TrainingSession[];
};
export type NewCycle = Omit<Cycle, "id" | "trainingSessions"> & {
  trainingSessions: NewTrainingSession[];
};
export type TrainingSession = {
  id: number;
  sortOrder: number;
  name: string;
  description: string;
  workout: Workout;
  result: Result;
};
export type NewTrainingSession = Omit<
  TrainingSession,
  "id" | "workout" | "result"
> & { workoutId?: number; resultId?: number };

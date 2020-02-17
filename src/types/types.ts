export interface SelectOption {
  value: any;
  label: string;
}

export enum IntensityUnit {
  none,
  weight,
  speed
}

export type Exercise = {
  name: string;
  intensityUnit: IntensityUnit;
};

export type Workout = {
  name: string;
  description: string;
  workgroups: Workgroup[];
};

export type Workgroup = {
  sortOrder: number;
  note: string;
  rounds: Round[];
};

export enum IntervalType {
  none,
  inclusive,
  exclusive
}
export type Round = {
  sortOrder: number;
  interval: number;
  intervalType: IntervalType;
  worksets: Workset[];
};

export type Workset = {
  exercise: Exercise;
  exerciseName?: string;
  reps: number;
  intensity: number;
  intervalType: IntervalType;
  interval: number;
};

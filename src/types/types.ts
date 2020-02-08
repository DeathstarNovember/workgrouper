export enum IntensityUnit {
  pounds,
  meters,
  seconds
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
  inclusive,
  exclusive,
  none
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
  relativeIntensity: number;
  intensityUnit: IntensityUnit;
  intervalType: IntervalType;
  interval: number;
};

import {
  Workout,
  IntervalType,
  IntensityUnit,
  Exercise,
  SelectOption,
  NewWorkset,
  NewWorkgroup,
  NewRound,
  NewExercise,
  Workset,
  Round,
  Workgroup,
  IntensityType,
  NewWorkout,
  NewProgram,
  NewPhase,
  NewCycle,
  NewTrainingSession,
} from "./types";

export const newWorkset: NewWorkset = {
  reps: 1,
  intensity: 0,
  intensityType: IntensityType.absolute,
  intervalType: IntervalType.none,
  interval: 0,
  exercise: {
    id: 0,
    name: "",
    intensityUnit: IntensityUnit.none,
  },
};

export const newTrainingSession: NewTrainingSession = {
  sortOrder: 0,
  name: "",
  description: "",
};

export const newCycle: NewCycle = {
  name: "",
  sortOrder: 0,
  description: "",
  trainingSessions: [{ ...newTrainingSession }],
};

export const newPhase: NewPhase = {
  sortOrder: 0,
  name: "",
  description: "",
  cycles: [{ ...newCycle }],
};

export const newRound: NewRound = {
  sortOrder: 0,
  interval: 0,
  intervalType: IntervalType.none,
  worksets: [{ ...newWorkset }],
};

export const newWorkgroup: NewWorkgroup = {
  sortOrder: 0,
  note: "",
  rounds: [{ ...newRound }],
};

export const newWorkout: NewWorkout = {
  name: "",
  description: "",
  workgroups: [
    // {
    //   ...newWorkgroup,
    //   rounds: [{ ...newRound, worksets: [{ ...newWorkset }] }]
    // }
  ],
};

export const newProgram: NewProgram = {
  userId: 1,
  name: "",
  description: "",
  phases: [],
};
export const intervalTypeOptions: SelectOption[] = [
  { value: IntervalType.inclusive, label: "Inclusive" },
  { value: IntervalType.exclusive, label: "Exclusive" },
  { value: IntervalType.none, label: "No Interval" },
];
export const intensityTypeOptions: SelectOption[] = [
  { value: IntensityUnit.weight, label: "Pounds" },
  { value: IntensityUnit.speed, label: "Meters/Sec" },
];
export const exercisesOptions = (exercises: Exercise[]) =>
  <SelectOption[]>exercises.map((exercise, _index) => ({
    value: exercise.id,
    label: exercise.name,
  }));

export const layout = {
  header: {
    height: 75,
  },
};

export const ordinals = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
export const jsonWorkout = {
  workout: {
    name: "Workout Title",
    description: "This is the description for this workout",
    workgroups: [
      {
        sortOrder: 0,
        note: "single set of a single exercise",
        rounds: [
          {
            intervalType: 1,
            interval: 150,
            sortOrder: 0,
            worksets: [
              {
                sortOrder: 0,
                exerciseId: 1,
                reps: 9,
                intensity: 185,
                intensityType: 0,
                intervalType: 1,
                interval: 140,
              },
            ],
          },
        ],
      },
      {
        sortOrder: 1,
        note: "multiple identical sets of a single exercise",
        rounds: [
          {
            intervalType: 1,
            interval: 150,
            sortOrder: 0,
            worksets: [
              {
                sortOrder: 0,
                exerciseId: 1,
                reps: 9,
                intensity: 185,
                intensityType: 0,
                intervalType: 1,
                interval: 140,
              },
              {
                sortOrder: 1,
                exerciseId: 1,
                reps: 9,
                intensity: 185,
                intensityType: 0,
                intervalType: 1,
                interval: 140,
              },
              {
                sortOrder: 2,
                exerciseId: 1,
                reps: 9,
                intensity: 185,
                intensityType: 0,
                intervalType: 1,
                interval: 140,
              },
            ],
          },
        ],
      },
      {
        sortOrder: 2,
        note: "multiple and different sets of a single exercise",
        rounds: [
          {
            intervalType: 1,
            interval: 150,
            sortOrder: 0,
            worksets: [
              {
                sortOrder: 0,
                exerciseId: 1,
                reps: 5,
                intensity: 185,
                intensityType: 0,
                intervalType: 1,
                interval: 150,
              },
              {
                sortOrder: 1,
                exerciseId: 1,
                reps: 5,
                intensity: 185,
                intensityType: 0,
                intervalType: 1,
                interval: 150,
              },
              {
                sortOrder: 2,
                exerciseId: 1,
                reps: 5,
                intensity: 195,
                intensityType: 0,
                intervalType: 1,
                interval: 150,
              },
              {
                sortOrder: 3,
                exerciseId: 1,
                reps: 5,
                intensity: 195,
                intensityType: 0,
                intervalType: 1,
                interval: 150,
              },
            ],
          },
        ],
      },
      {
        sortOrder: 3,
        note:
          "multiple identical rounds of identical sets of a single exercise",
        rounds: [
          {
            sortOrder: 0,
            intervalType: 1,
            interval: 150,
            worksets: [
              {
                sortOrder: 0,
                exerciseId: 2,
                reps: 5,
                intensity: 155,
                intensityType: 0,
                intervalType: 1,
                interval: 150,
              },
              {
                sortOrder: 1,
                exerciseId: 2,
                reps: 5,
                intensity: 155,
                intensityType: 0,
                intervalType: 1,
                interval: 150,
              },
              {
                sortOrder: 2,
                exerciseId: 2,
                reps: 5,
                intensity: 155,
                intensityType: 0,
                intervalType: 1,
                interval: 150,
              },
            ],
          },
          {
            sortOrder: 1,
            intervalType: 1,
            interval: 150,
            worksets: [
              {
                sortOrder: 0,
                exerciseId: 2,
                reps: 5,
                intensity: 155,
                intensityType: 0,
                intervalType: 1,
                interval: 150,
              },
              {
                sortOrder: 1,
                exerciseId: 2,
                reps: 5,
                intensity: 155,
                intensityType: 0,
                intervalType: 1,
                interval: 150,
              },
              {
                sortOrder: 2,
                exerciseId: 2,
                reps: 5,
                intensity: 155,
                intensityType: 0,
                intervalType: 1,
                interval: 150,
              },
            ],
          },
        ],
      },
    ],
  },
};

import {
  Workout,
  IntervalType,
  IntensityUnit,
  Exercise,
  SelectOption,
  Workset,
  Round,
  Workgroup,
  IntensityType
} from "./types";

export const exercises: Exercise[] = [
  {
    name: "",
    intensityUnit: IntensityUnit.none
  },
  {
    name: "Barbell Back Squat",
    intensityUnit: IntensityUnit.weight
  },
  {
    name: "Barbell Overhead Press",
    intensityUnit: IntensityUnit.weight
  },
  {
    name: "Barbell Bench Press",
    intensityUnit: IntensityUnit.weight
  },
  {
    name: "Rower Erg",
    intensityUnit: IntensityUnit.speed
  }
];

export const workouts: Workout[] = [
  {
    name: "Workout Title",
    description: "This is the description for this workout",
    workgroups: [
      {
        sortOrder: 0,
        note: "single set of a single exercise",
        rounds: [
          {
            intervalType: IntervalType.inclusive,
            interval: 150,
            sortOrder: 0,
            worksets: [
              {
                exercise: {
                  name: "Barbell Back Squat",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 9,
                intensity: 185,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 140
              }
            ]
          }
        ]
      },
      {
        sortOrder: 1,
        note: "multiple identical sets of a single exercise",
        rounds: [
          {
            intervalType: IntervalType.inclusive,
            interval: 150,
            sortOrder: 0,
            worksets: [
              {
                exercise: {
                  name: "Barbell Back Squat",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 9,
                intensity: 185,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 140
              },
              {
                exercise: {
                  name: "Barbell Back Squat",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 9,
                intensity: 185,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 140
              },
              {
                exercise: {
                  name: "Barbell Back Squat",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 9,
                intensity: 185,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 140
              }
            ]
          }
        ]
      },
      {
        sortOrder: 2,
        note: "multiple and different sets of a single exercise",
        rounds: [
          {
            intervalType: IntervalType.inclusive,
            interval: 150,
            sortOrder: 0,
            worksets: [
              {
                exercise: {
                  name: "Barbell Bench Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 185,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Bench Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 185,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Bench Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 195,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Bench Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 195,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              }
            ]
          }
        ]
      },
      {
        sortOrder: 3,
        note:
          "multiple identical rounds of identical sets of a single exercise",
        rounds: [
          {
            sortOrder: 0,
            intervalType: IntervalType.inclusive,
            interval: 150,
            worksets: [
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 155,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 155,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 155,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              }
            ]
          },
          {
            sortOrder: 1,
            intervalType: IntervalType.inclusive,
            interval: 150,
            worksets: [
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 155,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 155,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 155,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Workout 2 Title",
    description: "This is the description for this other workout",
    workgroups: [
      {
        sortOrder: 0,
        note:
          "multiple identical rounds of different sets of a single exercise",
        rounds: [
          {
            sortOrder: 0,
            intervalType: IntervalType.inclusive,
            interval: 150,
            worksets: [
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 155,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 155,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 160,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 165,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              }
            ]
          },
          {
            sortOrder: 1,
            intervalType: IntervalType.inclusive,
            interval: 150,
            worksets: [
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 155,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 155,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 160,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 165,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              }
            ]
          }
        ]
      },
      {
        sortOrder: 1,
        note:
          "multiple identical rounds of identical sets of multiple exercises",
        rounds: [
          {
            sortOrder: 0,
            intervalType: IntervalType.inclusive,
            interval: 150,
            worksets: [
              {
                exercise: {
                  name: "Barbell Back Squat",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 155,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Back Squat",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 155,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Bench Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 165,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 155,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              }
            ]
          },
          {
            sortOrder: 1,
            intervalType: IntervalType.inclusive,
            interval: 150,
            worksets: [
              {
                exercise: {
                  name: "Barbell Back Squat",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 155,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Back Squat",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 155,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Bench Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 165,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 155,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              }
            ]
          }
        ]
      },
      {
        sortOrder: 2,
        note: "multiple different rounds",
        rounds: [
          {
            sortOrder: 0,
            intervalType: IntervalType.inclusive,
            interval: 150,
            worksets: [
              {
                exercise: {
                  name: "Barbell Back Squat",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 155,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Back Squat",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 155,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Bench Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 160,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 135,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              }
            ]
          },
          {
            sortOrder: 1,
            intervalType: IntervalType.inclusive,
            interval: 150,
            worksets: [
              {
                exercise: {
                  name: "Barbell Back Squat",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 160,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Back Squat",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 160,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Bench Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 165,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.weight
                },
                reps: 5,
                intensity: 125,
                intensityType: IntensityType.absolute,
                intervalType: IntervalType.inclusive,
                interval: 150
              }
            ]
          }
        ]
      }
    ]
  }
];

export const newWorkset: Workset = {
  exercise: {
    name: "",
    intensityUnit: IntensityUnit.none
  },
  reps: 1,
  intensity: 0,
  intensityType: IntensityType.absolute,
  intervalType: IntervalType.none,
  interval: 0
};

export const newRound: Round = {
  sortOrder: 0,
  interval: 0,
  intervalType: IntervalType.none,
  worksets: [{ ...newWorkset }]
};

export const newWorkgroup: Workgroup = {
  sortOrder: 0,
  note: "",
  rounds: [{ ...newRound }]
};

export const newWorkout: Workout = {
  name: "",
  description: "",
  workgroups: [
    // {
    //   ...newWorkgroup,
    //   rounds: [{ ...newRound, worksets: [{ ...newWorkset }] }]
    // }
  ]
};
export const intervalTypeOptions: SelectOption[] = [
  { value: IntervalType.inclusive, label: "Inclusive" },
  { value: IntervalType.exclusive, label: "Exclusive" },
  { value: IntervalType.none, label: "No Interval" }
];
export const intensityTypeOptions: SelectOption[] = [
  { value: IntensityUnit.weight, label: "Pounds" },
  { value: IntensityUnit.speed, label: "Meters/Sec" }
];
export const exercisesOptions: SelectOption[] = exercises.map(
  (exercise, _index) => ({
    value: exercise.name,
    label: exercise.name
  })
);

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
  "Z"
];

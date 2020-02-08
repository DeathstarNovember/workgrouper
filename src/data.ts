import { Workout, IntervalType, IntensityUnit, Exercise } from "./types";

export const exercises: Exercise[] = [
  {
    name: "Barbell Back Squat",
    intensityUnit: IntensityUnit.pounds
  },
  {
    name: "Barbell Overhead Press",
    intensityUnit: IntensityUnit.pounds
  },
  {
    name: "Barbell Bench Press",
    intensityUnit: IntensityUnit.pounds
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
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 9,
                intensity: 185,
                relativeIntensity: 50,
                intensityUnit: IntensityUnit.pounds,
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
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 9,
                intensity: 185,
                relativeIntensity: 50,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 140
              },
              {
                exercise: {
                  name: "Barbell Back Squat",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 9,
                intensity: 185,
                relativeIntensity: 50,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 140
              },
              {
                exercise: {
                  name: "Barbell Back Squat",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 9,
                intensity: 185,
                relativeIntensity: 50,
                intensityUnit: IntensityUnit.pounds,
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
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 185,
                relativeIntensity: 83,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Bench Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 185,
                relativeIntensity: 83,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Bench Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 195,
                relativeIntensity: 87,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Bench Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 195,
                relativeIntensity: 87,
                intensityUnit: IntensityUnit.pounds,
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
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 155,
                relativeIntensity: 83,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 155,
                relativeIntensity: 83,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 155,
                relativeIntensity: 83,
                intensityUnit: IntensityUnit.pounds,
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
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 155,
                relativeIntensity: 83,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 155,
                relativeIntensity: 83,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 155,
                relativeIntensity: 83,
                intensityUnit: IntensityUnit.pounds,
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
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 155,
                relativeIntensity: 83,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 155,
                relativeIntensity: 83,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 160,
                relativeIntensity: 85,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 165,
                relativeIntensity: 87,
                intensityUnit: IntensityUnit.pounds,
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
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 155,
                relativeIntensity: 83,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 155,
                relativeIntensity: 83,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 160,
                relativeIntensity: 85,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 165,
                relativeIntensity: 87,
                intensityUnit: IntensityUnit.pounds,
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
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 155,
                relativeIntensity: 70,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Back Squat",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 155,
                relativeIntensity: 70,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Bench Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 165,
                relativeIntensity: 80,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 155,
                relativeIntensity: 80,
                intensityUnit: IntensityUnit.pounds,
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
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 155,
                relativeIntensity: 70,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Back Squat",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 155,
                relativeIntensity: 70,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Bench Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 165,
                relativeIntensity: 80,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 155,
                relativeIntensity: 80,
                intensityUnit: IntensityUnit.pounds,
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
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 155,
                relativeIntensity: 70,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Back Squat",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 155,
                relativeIntensity: 70,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Bench Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 160,
                relativeIntensity: 75,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 135,
                relativeIntensity: 87,
                intensityUnit: IntensityUnit.pounds,
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
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 160,
                relativeIntensity: 73,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Back Squat",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 160,
                relativeIntensity: 73,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Bench Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 165,
                relativeIntensity: 78,
                intensityUnit: IntensityUnit.pounds,
                intervalType: IntervalType.inclusive,
                interval: 150
              },
              {
                exercise: {
                  name: "Barbell Overhead Press",
                  intensityUnit: IntensityUnit.pounds
                },
                reps: 5,
                intensity: 125,
                relativeIntensity: 85,
                intensityUnit: IntensityUnit.pounds,
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

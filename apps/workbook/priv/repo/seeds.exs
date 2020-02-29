# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Workbook.Repo.insert!(%Workbook.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Workbook.Repo
alias Workbook.Auth.User
alias Workbook.Workouts.{Exercise, Workout, Workgroup, Round, Workset}
bench_press = Repo.insert!(%Exercise{
  name: "Barbell Bench Press",
  intensity_unit: 1})
back_squat = Repo.insert!(%Exercise{
  name: "Barbell Back Squat",
  intensity_unit: 1})
overhead_press = Repo.insert!(%Exercise{
  name: "Barbell Overhead Press",
  intensity_unit: 1})
rower = Repo.insert!(%Exercise{
  name: "Rower Erg",
  intensity_unit: 2})
walk = Repo.insert!(%Exercise{
  name: "Walk",
  intensity_unit: 2})
run = Repo.insert!(%Exercise{
  name: "Run",
  intensity_unit: 2})
push_up = Repo.insert!(%Exercise{
  name: "Push Up",
  intensity_unit: 0})
pull_up = Repo.insert!(%Exercise{
  name: "Pull Up",
  intensity_unit: 0})
air_squat = Repo.insert!(%Exercise{
  name: "Air Squat",
  intensity_unit: 0})

Repo.insert!(%User{
  username: "DeathstarNovember", 
  password: "password", 
  workouts: [
    Repo.insert!(%Workout{
      name: "Workout Title",
      description: "This is the description for this workout",
      workgroups: [
        %Workgroup{
          sort_order: 0,
          note: "single set of a single exercise",
          rounds: [
            %Round{
              interval_type: 1,
              interval: 150,
              sort_order: 0,
              worksets: [
                %Workset{
                  sort_order: 0,
                  exercise_id: 1,
                  reps: 9,
                  intensity: 185,
                  intensity_type: 0,
                  interval_type: 1,
                  interval: 140
                }
              ]
            }
          ]
        },
        %Workgroup{
          sort_order: 1,
          note: "multiple identical sets of a single exercise",
          rounds: [
            %Round{
              interval_type: 1,
              interval: 150,
              sort_order: 0,
              worksets: [
                %Workset{
                  sort_order: 0,
                  exercise_id: 1,
                  reps: 9,
                  intensity: 185,
                  intensity_type: 0,
                  interval_type: 1,
                  interval: 140
                },
                %Workset{
                  sort_order: 1,
                  exercise_id: 1,
                  reps: 9,
                  intensity: 185,
                  intensity_type: 0,
                  interval_type: 1,
                  interval: 140
                },
                %Workset{
                  sort_order: 2,
                  exercise_id: 1,
                  reps: 9,
                  intensity: 185,
                  intensity_type: 0,
                  interval_type: 1,
                  interval: 140
                }
              ]
            }
          ]
        },
        %Workgroup{
          sort_order: 2,
          note: "multiple and different sets of a single exercise",
          rounds: [
            %Round{
              interval_type: 1,
              interval: 150,
              sort_order: 0,
              worksets: [
                %Workset{
                  sort_order: 0,
                  exercise_id: 1,
                  reps: 5,
                  intensity: 185,
                  intensity_type: 0,
                  interval_type: 1,
                  interval: 150
                },
                %Workset{
                  sort_order: 1,
                  exercise_id: 1,
                  reps: 5,
                  intensity: 185,
                  intensity_type: 0,
                  interval_type: 1,
                  interval: 150
                },
                %Workset{
                  sort_order: 2,
                  exercise_id: 1,
                  reps: 5,
                  intensity: 195,
                  intensity_type: 0,
                  interval_type: 1,
                  interval: 150
                },
                %Workset{
                  sort_order: 3,
                  exercise_id: 1,
                  reps: 5,
                  intensity: 195,
                  intensity_type: 0,
                  interval_type: 1,
                  interval: 150
                }
              ]
            }
          ]
        },
        %Workgroup{
          sort_order: 3,
          note:
            "multiple identical rounds of identical sets of a single exercise",
          rounds: [
            %Round{
              sort_order: 0,
              interval_type: 1,
              interval: 150,
              worksets: [
                %Workset{
                  sort_order: 0,
                  exercise_id: 2,
                  reps: 5,
                  intensity: 155,
                  intensity_type: 0,
                  interval_type: 1,
                  interval: 150
                },
                %Workset{
                  sort_order: 1,
                  exercise_id: 2,
                  reps: 5,
                  intensity: 155,
                  intensity_type: 0,
                  interval_type: 1,
                  interval: 150
                },
                %Workset{
                  sort_order: 2,
                  exercise_id: 2,
                  reps: 5,
                  intensity: 155,
                  intensity_type: 0,
                  interval_type: 1,
                  interval: 150
                }
              ]
            },
            %Round{
              sort_order: 1,
              interval_type: 1,
              interval: 150,
              worksets: [
                %Workset{
                  sort_order: 0,
                  exercise_id: 2,
                  reps: 5,
                  intensity: 155,
                  intensity_type: 0,
                  interval_type: 1,
                  interval: 150
                },
                %Workset{
                  sort_order: 1,
                  exercise_id: 2,
                  reps: 5,
                  intensity: 155,
                  intensity_type: 0,
                  interval_type: 1,
                  interval: 150
                },
                %Workset{
                  sort_order: 2,
                  exercise_id: 2,
                  reps: 5,
                  intensity: 155,
                  intensity_type: 0,
                  interval_type: 1,
                  interval: 150
                }
              ]
            }
          ]
        }
      ]
    }),
  ], 
  results: []})
Repo.insert!(%User{
  username: "FelixTheDestroyer", 
  password: "password", 
  workouts: [], 
  results: []})
Repo.insert!(%User{
  username: "MattTheProphit", 
  password: "password", 
  workouts: [], 
  results: []})







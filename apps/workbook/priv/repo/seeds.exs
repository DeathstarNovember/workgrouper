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
alias Workbook.Training.{TrainingSession, Cycle, Phase, Program, Schedule}
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

p1_c1_training_session_1 = Repo.insert!(%TrainingSession{
  sort_order: 0,
})
p1_c1_training_session_2 = Repo.insert!(%TrainingSession{
  sort_order: 1,
})
p1_c1_training_session_3 = Repo.insert!(%TrainingSession{
  sort_order: 2,
})
p1_c2_training_session_1 = Repo.insert!(%TrainingSession{
  sort_order: 0,
})
p1_c2_training_session_2 = Repo.insert!(%TrainingSession{
  sort_order: 1,
})
p1_c2_training_session_3 = Repo.insert!(%TrainingSession{
  sort_order: 2,
})
p2_c1_training_session_1 = Repo.insert!(%TrainingSession{
  sort_order: 0,
})
p2_c1_training_session_2 = Repo.insert!(%TrainingSession{
  sort_order: 1,
})
p2_c1_training_session_3 = Repo.insert!(%TrainingSession{
  sort_order: 2,
})
p2_c2_training_session_1 = Repo.insert!(%TrainingSession{
  sort_order: 0,
})
p2_c2_training_session_2 = Repo.insert!(%TrainingSession{
  sort_order: 1,
})
p2_c2_training_session_3 = Repo.insert!(%TrainingSession{
  sort_order: 2,
})
workout_1 = Repo.insert!(%Workout{
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
  ],
  training_sessions: [
    p1_c1_training_session_1,
    p1_c1_training_session_3,
    p1_c2_training_session_1,
    p1_c2_training_session_3,
    p2_c1_training_session_1,
    p2_c1_training_session_3,
    p2_c2_training_session_1,
    p2_c2_training_session_3
  ]
})
workout_2 = Repo.insert!(%Workout{
  name: "Workout 2 Title",
  description: "This is the description for this other workout",
  workgroups: [
    %Workgroup{
      sort_order: 0,
      note:
        "multiple identical rounds of different sets of a single exercise",
      rounds: [
        %Round{
          sort_order: 0,
          interval_type: 1,
          interval: 150,
          worksets: [
            %Workset{
              sort_order: 0,
              exercise_id: 3,
              reps: 5,
              intensity: 155,
              intensity_type: 0,
              interval_type: 1,
              interval: 150
            },
            %Workset{
              sort_order: 1,
              exercise_id: 3,
              reps: 5,
              intensity: 155,
              intensity_type: 0,
              interval_type: 1,
              interval: 150
            },
            %Workset{
              sort_order: 2,
              exercise_id: 3,
              reps: 5,
              intensity: 160,
              intensity_type: 0,
              interval_type: 1,
              interval: 150
            },
            %Workset{
              sort_order: 3,
              exercise_id: 3,
              reps: 5,
              intensity: 165,
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
              exercise_id: 3,
              reps: 5,
              intensity: 155,
              intensity_type: 0,
              interval_type: 1,
              interval: 150
            },
            %Workset{
              sort_order: 1,
              exercise_id: 3,
              reps: 5,
              intensity: 155,
              intensity_type: 0,
              interval_type: 1,
              interval: 150
            },
            %Workset{
              sort_order: 2,
              exercise_id: 3,
              reps: 5,
              intensity: 160,
              intensity_type: 0,
              interval_type: 1,
              interval: 150
            },
            %Workset{
              sort_order: 3,
              exercise_id: 3,
              reps: 5,
              intensity: 165,
              intensity_type: 0,
              interval_type: 1,
              interval: 150
            }
          ]
        }
      ]
    },
    %Workgroup{
      sort_order: 1,
      note:
        "multiple identical rounds of identical sets of multiple exercises",
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
              exercise_id: 1,
              reps: 5,
              intensity: 165,
              intensity_type: 0,
              interval_type: 1,
              interval: 150
            },
            %Workset{
              sort_order: 3,
              exercise_id: 3,
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
              exercise_id: 1,
              reps: 5,
              intensity: 165,
              intensity_type: 0,
              interval_type: 1,
              interval: 150
            },
            %Workset{
              sort_order: 3,
              exercise_id: 3,
              reps: 5,
              intensity: 155,
              intensity_type: 0,
              interval_type: 1,
              interval: 150
            }
          ]
        }
      ]
    },
    %Workgroup{
      sort_order: 2,
      note: "multiple different rounds",
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
              exercise_id: 1,
              reps: 5,
              intensity: 160,
              intensity_type: 0,
              interval_type: 1,
              interval: 150
            },
            %Workset{
              sort_order: 3,
              exercise_id: 3,
              reps: 5,
              intensity: 135,
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
              intensity: 160,
              intensity_type: 0,
              interval_type: 1,
              interval: 150
            },
            %Workset{
              sort_order: 1,
              exercise_id: 2,
              reps: 5,
              intensity: 160,
              intensity_type: 0,
              interval_type: 1,
              interval: 150
            },
            %Workset{
              sort_order: 2,
              exercise_id: 1,
              reps: 5,
              intensity: 165,
              intensity_type: 0,
              interval_type: 1,
              interval: 150
            },
            %Workset{
              sort_order: 3,
              exercise_id: 3,
              reps: 5,
              intensity: 125,
              intensity_type: 0,
              interval_type: 1,
              interval: 150
            }
          ]
        }
      ]
    }
  ],
  training_sessions: [
    p1_c1_training_session_2,
    p1_c2_training_session_2,
    p2_c1_training_session_2,
    p2_c2_training_session_2,
  ]
})


p1_cycle_1 = Repo.insert!(%Cycle{
  name: "Cycle 1",
  sort_order: 0,
  training_sessions: [
    p1_c1_training_session_1,
    p1_c1_training_session_2,
    p1_c1_training_session_3,
  ]
})
p1_cycle_2 = Repo.insert!(%Cycle{
  name: "Cycle 2",
  sort_order: 0,
  training_sessions: [
    p1_c2_training_session_1,
    p1_c2_training_session_2,
    p1_c2_training_session_3,
  ]
})
p2_cycle_1 = Repo.insert!(%Cycle{
  name: "Cycle 1",
  sort_order: 0,
  training_sessions: [
    p2_c1_training_session_1,
    p2_c1_training_session_2,
    p2_c1_training_session_3,
  ]
})
p2_cycle_2 = Repo.insert!(%Cycle{
  name: "Cycle 2",
  sort_order: 0,
  training_sessions: [
    p2_c2_training_session_1,
    p2_c2_training_session_2,
    p2_c2_training_session_3,
  ]
})
phase_1 = Repo.insert!(%Phase{
  sort_order: 0,
  name: "Phase 1",
  description: "Initial strength-building",
  cycles: [
    p1_cycle_1,
    p1_cycle_2
  ]
})
phase_2 = Repo.insert!(%Phase{
  sort_order: 1,
  name: "Phase 2",
  description: "Continued strength-building",
  cycles: [
    p2_cycle_1,
    p2_cycle_2
  ]
})
deathstar_default_program = Repo.insert!(%Program{
  name: "Deathstar Program",
  description: "Main workout program",
  phases: [
    phase_1,
    phase_2
  ]
})
{:ok, ds_s1_start_date} = DateTime.from_naive(~N[2020-03-09 16:00:00], "Etc/UTC")
deathstar_schedule_1 = Repo.insert!(%Schedule{
  start_date: ds_s1_start_date,
  program: deathstar_default_program,
})
password_hash = Bcrypt.hash_pwd_salt("password")
Repo.insert!(%User{
  username: "DeathstarNovember", 
  password: "password", 
  password_hash: password_hash,
  workouts: [
    workout_1,
    workout_2
  ], 
  schedules: [
    deathstar_schedule_1
  ],
  programs: [
    deathstar_default_program,
  ],
})
Repo.insert!(%User{
  username: "FelixTheDestroyer", 
  password: "password",
  password_hash: password_hash,
})
Repo.insert!(%User{
  username: "MattTheProphit", 
  password: "password", 
  password_hash: password_hash,
})

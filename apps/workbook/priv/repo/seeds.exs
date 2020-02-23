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
alias Workbook.Workouts.Exercise

Repo.insert!(%User{username: "DeathstarNovember", password: "password"})
Repo.insert!(%User{username: "FelixTheDestroyer", password: "password"})
Repo.insert!(%User{username: "MattTheProphit", password: "password"})

Repo.insert!(%Exercise{name: "Barbell Bench Press", intensity_unit: 1})
Repo.insert!(%Exercise{name: "Barbell Back Squat", intensity_unit: 1})
Repo.insert!(%Exercise{name: "Barbell Overhead Press", intensity_unit: 1})
Repo.insert!(%Exercise{name: "Rower Erg", intensity_unit: 2})
Repo.insert!(%Exercise{name: "Walk", intensity_unit: 2})
Repo.insert!(%Exercise{name: "Run", intensity_unit: 2})
Repo.insert!(%Exercise{name: "Push Up", intensity_unit: 0})
Repo.insert!(%Exercise{name: "Pull Up", intensity_unit: 0})
Repo.insert!(%Exercise{name: "Air Squat", intensity_unit: 0})





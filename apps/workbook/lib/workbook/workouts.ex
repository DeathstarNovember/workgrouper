defmodule Workbook.Workouts do

  require Logger
  @moduledoc """
  The Workouts context.
  """

  import Ecto.Query, warn: false
  alias Workbook.Repo

  alias Workbook.Workouts.{Workout, Exercise, Workgroup, Round, Workset, Result}

  def list_workouts do
    Repo.all(Workout)
  end

  def list_exercises do
    Repo.all(Exercise)
  end

  def list_results do
    Repo.all(Result)
  end

  def get_workout!(id), do: Repo.get!(Workout, id)

  def get_exercise!(id), do: Repo.get!(Exercise, id)

  def get_workgroup!(id), do: Repo.get!(Workgroup, id)

  def get_round!(id), do: Repo.get!(Round, id)

  def get_workset!(id), do: Repo.get!(Workset, id)

  def create_workout(attrs \\ %{}) do
    %Workout{}
    |> Workout.changeset(attrs)
    |> Ecto.Changeset.cast_assoc(:workgroups)
    |> Repo.insert()
  end

  def create_result(attrs \\ %{}) do
    %Result{}
    |> Result.changeset(attrs)
    |> Ecto.Changeset.cast_assoc(:workgroups)
    |> Repo.insert()
  end

  def create_exercise(attrs \\ %{}) do
    %Exercise{}
    |> Exercise.changeset(attrs)
    |> Repo.insert()
  end

  def create_workgroup(attrs \\ %{} ) do
    %Workgroup{}
    |> Workgroup.changeset(attrs)
    |> Ecto.Changeset.cast_assoc(:rounds)
    |> Repo.insert()
  end

  def create_round(attrs \\ %{}) do
    %Round{}
    |> Round.changeset(attrs)
    |> Ecto.Changeset.cast_assoc(:worksets)
    |> Repo.insert()
  end

  def create_workset(attrs \\ %{}) do
    %Workset{}
    |> Workset.changeset(attrs)
    |> Repo.insert()
  end

  def update_workout(%Workout{} = workout, attrs) do
    workout
    |> Workout.changeset(attrs)
    |> Repo.update()
  end

  def update_result(%Result{} = result, attrs) do
    result
    |> Result.changeset(attrs)
    |> Repo.update()
  end

  def update_exercise(%Exercise{} = exercise, attrs) do
    exercise
    |> Exercise.changeset(attrs)
    |> Repo.update()
  end

  def update_workgroup(%Workgroup{} = workgroup, attrs) do
    workgroup
    |> Workgroup.changeset(attrs)
    |> Repo.update()
  end

  def update_round(%Round{} = round, attrs) do
    round
    |> Round.changeset(attrs)
    |> Repo.update()
  end

  def update_workset(%Workset{} = workset, attrs) do
    workset
    |> Workset.changeset(attrs)
    |> Repo.update()
  end
  
  def delete_workout(%Workout{} = workout) do
    Repo.delete(workout)
  end

  def delete_result(%Result{} = result) do
    Repo.delete(result)
  end

  def delete_exercise(%Exercise{} = exercise) do
    Repo.delete(exercise)
  end

  def delete_workgroup(%Workgroup{} = workgroup) do
    Repo.delete(workgroup)
  end

  def delete_round(%Round{} = round) do
    Repo.delete(round)
  end

  def delete_workset(%Workset{} = workset) do
    Repo.delete(workset)
  end

  def change_workout(%Workout{} = workout) do
    Workout.changeset(workout, %{})
  end

  def change_result(%Result{} = result) do
    Result.changeset(result, %{})
  end

  def change_exercise(%Exercise{} = exercise) do
    Exercise.changeset(exercise, %{})
  end

  def change_workgroup(%Workgroup{} = workgroup) do
    Workgroup.changeset(workgroup, %{})
  end

  def change_round(%Round{} = round) do
    Round.changeset(round, %{})
  end

  def change_workset(%Workset{} = workset) do
    Workset.changeset(workset, %{})
  end
  
end

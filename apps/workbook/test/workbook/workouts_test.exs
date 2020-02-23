defmodule Workbook.WorkoutsTest do
  use Workbook.DataCase

  alias Workbook.Workouts

  describe "workouts" do
    alias Workbook.Workouts.Workout

    @valid_attrs %{completed_at: "2010-04-17T14:00:00Z", description: "some description", name: "some name"}
    @update_attrs %{completed_at: "2011-05-18T15:01:01Z", description: "some updated description", name: "some updated name"}
    @invalid_attrs %{completed_at: nil, description: nil, name: nil}

    def workout_fixture(attrs \\ %{}) do
      {:ok, workout} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Workouts.create_workout()

      workout
    end

    test "list_workouts/0 returns all workouts" do
      workout = workout_fixture()
      assert Workouts.list_workouts() == [workout]
    end

    test "get_workout!/1 returns the workout with given id" do
      workout = workout_fixture()
      assert Workouts.get_workout!(workout.id) == workout
    end

    test "create_workout/1 with valid data creates a workout" do
      assert {:ok, %Workout{} = workout} = Workouts.create_workout(@valid_attrs)
      assert workout.completed_at == DateTime.from_naive!(~N[2010-04-17T14:00:00Z], "Etc/UTC")
      assert workout.description == "some description"
      assert workout.name == "some name"
    end

    test "create_workout/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Workouts.create_workout(@invalid_attrs)
    end

    test "update_workout/2 with valid data updates the workout" do
      workout = workout_fixture()
      assert {:ok, %Workout{} = workout} = Workouts.update_workout(workout, @update_attrs)
      assert workout.completed_at == DateTime.from_naive!(~N[2011-05-18T15:01:01Z], "Etc/UTC")
      assert workout.description == "some updated description"
      assert workout.name == "some updated name"
    end

    test "update_workout/2 with invalid data returns error changeset" do
      workout = workout_fixture()
      assert {:error, %Ecto.Changeset{}} = Workouts.update_workout(workout, @invalid_attrs)
      assert workout == Workouts.get_workout!(workout.id)
    end

    test "delete_workout/1 deletes the workout" do
      workout = workout_fixture()
      assert {:ok, %Workout{}} = Workouts.delete_workout(workout)
      assert_raise Ecto.NoResultsError, fn -> Workouts.get_workout!(workout.id) end
    end

    test "change_workout/1 returns a workout changeset" do
      workout = workout_fixture()
      assert %Ecto.Changeset{} = Workouts.change_workout(workout)
    end
  end
end

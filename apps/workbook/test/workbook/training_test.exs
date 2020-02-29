defmodule Workbook.TrainingTest do
  use Workbook.DataCase

  alias Workbook.Training

  describe "assignments" do
    alias Workbook.Training.Assignment

    @valid_attrs %{date: "2010-04-17T14:00:00Z", note: "some note"}
    @update_attrs %{date: "2011-05-18T15:01:01Z", note: "some updated note"}
    @invalid_attrs %{date: nil, note: nil}

    def assignment_fixture(attrs \\ %{}) do
      {:ok, assignment} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Training.create_assignment()

      assignment
    end

    test "list_assignments/0 returns all assignments" do
      assignment = assignment_fixture()
      assert Training.list_assignments() == [assignment]
    end

    test "get_assignment!/1 returns the assignment with given id" do
      assignment = assignment_fixture()
      assert Training.get_assignment!(assignment.id) == assignment
    end

    test "create_assignment/1 with valid data creates a assignment" do
      assert {:ok, %Assignment{} = assignment} = Training.create_assignment(@valid_attrs)
      assert assignment.date == DateTime.from_naive!(~N[2010-04-17T14:00:00Z], "Etc/UTC")
      assert assignment.note == "some note"
    end

    test "create_assignment/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Training.create_assignment(@invalid_attrs)
    end

    test "update_assignment/2 with valid data updates the assignment" do
      assignment = assignment_fixture()
      assert {:ok, %Assignment{} = assignment} = Training.update_assignment(assignment, @update_attrs)
      assert assignment.date == DateTime.from_naive!(~N[2011-05-18T15:01:01Z], "Etc/UTC")
      assert assignment.note == "some updated note"
    end

    test "update_assignment/2 with invalid data returns error changeset" do
      assignment = assignment_fixture()
      assert {:error, %Ecto.Changeset{}} = Training.update_assignment(assignment, @invalid_attrs)
      assert assignment == Training.get_assignment!(assignment.id)
    end

    test "delete_assignment/1 deletes the assignment" do
      assignment = assignment_fixture()
      assert {:ok, %Assignment{}} = Training.delete_assignment(assignment)
      assert_raise Ecto.NoResultsError, fn -> Training.get_assignment!(assignment.id) end
    end

    test "change_assignment/1 returns a assignment changeset" do
      assignment = assignment_fixture()
      assert %Ecto.Changeset{} = Training.change_assignment(assignment)
    end
  end
end

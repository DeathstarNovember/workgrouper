defmodule Workbook.Training do
  @moduledoc """
  The Training context.
  """

  import Ecto.Query, warn: false
  alias Workbook.Repo

  alias Workbook.Training.{Program, Schedule, Phase, Cycle, TrainingSession}

  def list_programs do
    Repo.all(Program)
  end

  def get_program!(id), do: Repo.get!(Program, id)
  def get_schedule!(id), do: Repo.get!(Schedule, id)
  def get_phase!(id), do: Repo.get!(Phase, id)
  def get_cycle!(id), do: Repo.get!(Cycle, id)
  def get_training_session!(id), do: Repo.get!(TrainingSession, id)

  def create_program(attrs \\ %{}) do
    %Program{}
    |> Program.changeset(attrs)
    |> Ecto.Changeset.cast_assoc(:phases)
    |> Repo.insert()
  end
  def create_schedule(attrs \\ %{}) do
    %Schedule{}
    |> Schedule.changeset(attrs)
    |> Repo.insert()
  end
  def create_phase(attrs \\ %{}) do
    %Phase{}
    |> Phase.changeset(attrs)
    |> Ecto.Changeset.cast_assoc(:cycles)
    |> Repo.insert()
  end
  def create_cycle(attrs \\ %{}) do
    %Cycle{}
    |> Cycle.changeset(attrs)
    |> Ecto.Changeset.cast_assoc(:training_sessions)
    |> Repo.insert()
  end
  def create_training_session(attrs \\ %{}) do
    %TrainingSession{}
    |> TrainingSession.changeset(attrs)
    |> Repo.insert()
  end

  def update_program(id, attrs) do
    get_program!(id)
    |> Program.changeset(attrs)
    |> Repo.update()
  end
  def update_schedule(id, attrs) do
    get_schedule!(id)
    |> Schedule.changeset(attrs)
    |> Repo.update()
  end
  def update_phase(id, attrs) do
    get_phase!(id)
    |> Phase.changeset(attrs)
    |> Repo.update()
  end
  def update_cycle(id, attrs) do
    get_cycle!(id)
    |> Cycle.changeset(attrs)
    |> Repo.update()
  end
  def update_training_session(id, attrs) do
    get_training_session!(id)
    |> TrainingSession.changeset(attrs)
    |> Repo.update()
  end

  def delete_program(%Program{} = program) do
    Repo.delete(program)
  end
  def delete_schedule(%Schedule{} = schedule) do
    Repo.delete(schedule)
  end
  def delete_phase(%Phase{} = phase) do
    Repo.delete(phase)
  end
  def delete_cycle(%Cycle{} = cycle) do
    Repo.delete(cycle)
  end
  def delete_training_session(%TrainingSession{} = training_session) do
    Repo.delete(training_session)
  end

  def change_program(%Program{} = program) do
    Program.changeset(program, %{})
  end
  def change_schedule(%Schedule{} = schedule) do
    Schedule.changeset(schedule, %{})
  end
  def change_phase(%Phase{} = phase) do
    Phase.changeset(phase, %{})
  end
  def change_cycle(%Cycle{} = cycle) do
    Cycle.changeset(cycle, %{})
  end
  def change_training_session(%TrainingSession{} = training_session) do
    TrainingSession.changeset(training_session, %{})
  end
end

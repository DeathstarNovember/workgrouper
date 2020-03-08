defmodule Workbook.Training do
  @moduledoc """
  The Training context.
  """

  import Ecto.Query, warn: false
  alias Workbook.Repo

  alias Workbook.Training.{Program, Schedule, Phase, Cycle, Session}

  def list_programs do
    Repo.all(Program)
  end

  def get_program!(id), do: Repo.get!(Program, id)
  def get_schedule!(id), do: Repo.get!(Schedule, id)
  def get_phase!(id), do: Repo.get!(Phase, id)
  def get_cycle!(id), do: Repo.get!(Cycle, id)
  def get_session!(id), do: Repo.get!(Session, id)

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
    |> Ecto.Changeset.cast_assoc(:sessions)
    |> Repo.insert()
  end
  def create_session(attrs \\ %{}) do
    %Session{}
    |> Session.changeset(attrs)
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
  def update_session(id, attrs) do
    get_session!(id)
    |> Session.changeset(attrs)
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
  def delete_session(%Session{} = session) do
    Repo.delete(session)
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
  def change_session(%Session{} = session) do
    Session.changeset(session, %{})
  end
end

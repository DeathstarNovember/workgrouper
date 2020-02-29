defmodule Workbook.Repo.Migrations.CreateAssignments do
  use Ecto.Migration

  def change do
    create table(:assignments) do
      add :note, :string
      add :date, :utc_datetime
      add :user_id, references(:users, on_delete: :nothing)
      add :workout_id, references(:workouts, on_delete: :nothing)
      add :result_id, references(:results, on_delete: :nothing)

      timestamps()
    end

    create index(:assignments, [:user_id])
    create index(:assignments, [:workout_id])
    create index(:assignments, [:result_id])
  end
end

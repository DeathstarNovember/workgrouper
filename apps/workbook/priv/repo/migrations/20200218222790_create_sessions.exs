defmodule Workbook.Repo.Migrations.CreateSessions do
  use Ecto.Migration

  def change do
    create table(:sessions) do
      add :name, :string
      add :description, :string
      add :sort_order, :integer
      add :cycle_id, references(:cycles, on_delete: :nothing)
      add :workout_id, references(:workouts, on_delete: :nothing)
      add :result_id, references(:results, on_delete: :nothing)

      timestamps()
    end

    create index(:sessions, [:cycle_id])
    create index(:sessions, [:workout_id])
    create index(:sessions, [:result_id])
  end
end

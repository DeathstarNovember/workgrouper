defmodule Workbook.Repo.Migrations.CreateTrainingSessions do
  use Ecto.Migration

  def change do
    create table(:training_sessions) do
      add :name, :string
      add :description, :string
      add :sort_order, :integer
      add :cycle_id, references(:cycles, on_delete: :delete_all)
      add :workout_id, references(:workouts, on_delete: :delete_all)
      add :result_id, references(:results, on_delete: :nothing)

      timestamps()
    end

    create index(:training_sessions, [:cycle_id])
    create index(:training_sessions, [:workout_id])
    create index(:training_sessions, [:result_id])
  end
end

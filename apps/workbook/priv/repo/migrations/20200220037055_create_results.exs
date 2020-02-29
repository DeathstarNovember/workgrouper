defmodule Workbook.Repo.Migrations.CreateResults do
  use Ecto.Migration

  def change do
    create table(:results) do
      add :name, :string
      add :description, :string
      add :completed_at, :utc_datetime
      add :user_id, references(:users, on_delete: :nothing)
      add :workout_id, references(:workouts, on_delete: :nothing)

      timestamps()
    end
    create index(:results, [:user_id])
    create index(:results, [:workout_id])
  end
end

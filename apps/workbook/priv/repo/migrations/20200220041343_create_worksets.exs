defmodule Workbook.Repo.Migrations.CreateWorksets do
  use Ecto.Migration

  def change do
    create table(:worksets) do
      add :sort_order, :integer
      add :reps, :integer
      add :intensity_type, :integer
      add :intensity, :integer
      add :interval_type, :integer
      add :interval, :integer
      add :round_id, references(:rounds, on_delete: :delete_all)
      add :exercise_id, references(:exercises, on_delete: :nothing)

      timestamps()
    end

    create index(:worksets, [:round_id])
    create index(:worksets, [:exercise_id])
  end
end

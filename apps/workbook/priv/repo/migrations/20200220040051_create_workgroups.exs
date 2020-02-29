defmodule Workbook.Repo.Migrations.CreateWorkgroups do
  use Ecto.Migration

  def change do
    create table(:workgroups) do
      add :sort_order, :integer
      add :note, :string
      add :workout_id, references(:workouts, on_delete: :delete_all)
      add :result_id, references(:results, on_delete: :delete_all)

      timestamps()
    end

    create index(:workgroups, [:workout_id])
    create index(:workgroups, [:result_id])

  end
end

defmodule Workbook.Repo.Migrations.CreateWorkgroups do
  use Ecto.Migration

  def change do
    create table(:workgroups) do
      add :sort_order, :integer
      add :note, :string
      add :workout_id, references(:workouts, on_delete: :delete_all)

      timestamps()
    end

    create index(:workgroups, [:workout_id])

  end
end

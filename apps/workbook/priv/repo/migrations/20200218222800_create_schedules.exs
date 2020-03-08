defmodule Workbook.Repo.Migrations.CreateSchedules do
  use Ecto.Migration

  def change do
    create table(:schedules) do
      add :start_date, :utc_datetime
      add :is_active, :boolean, default: true
      add :user_id, references(:users, on_delete: :nothing)
      add :program_id, references(:programs, on_delete: :nothing)

      timestamps()
    end

    create index(:schedules, [:user_id])
    create index(:schedules, [:program_id])
  end
end

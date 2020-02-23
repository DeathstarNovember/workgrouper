defmodule Workbook.Repo.Migrations.CreateRounds do
  use Ecto.Migration

  def change do
    create table(:rounds) do
      add :sort_order, :integer
      add :interval, :integer
      add :interval_type, :integer
      add :workgroup_id, references(:workgroups, on_delete: :delete_all)

      timestamps()
    end

    create index(:rounds, [:workgroup_id])
  end
end

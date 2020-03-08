defmodule Workbook.Repo.Migrations.CreateCycles do
  use Ecto.Migration

  def change do
    create table(:cycles) do
      add :sort_order, :integer
      add :name, :string
      add :description, :string
      add :phase_id, references(:phases, on_delete: :nothing)

      timestamps()
    end

    create index(:cycles, [:phase_id])
  end
end

defmodule Workbook.Repo.Migrations.CreatePhases do
  use Ecto.Migration

  def change do
    create table(:phases) do
      add :sort_order, :integer
      add :name, :string
      add :description, :string
      add :program_id, references(:programs, on_delete: :nothing)

      timestamps()
    end

    create index(:phases, [:program_id])
  end
end

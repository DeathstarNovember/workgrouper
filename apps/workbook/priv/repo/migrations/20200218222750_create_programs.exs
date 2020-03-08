defmodule Workbook.Repo.Migrations.CreatePrograms do
  use Ecto.Migration

  def change do
    create table(:programs) do
      add :name, :string
      add :description, :string
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:programs, [:user_id])
  end
end

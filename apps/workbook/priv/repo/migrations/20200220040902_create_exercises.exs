defmodule Workbook.Repo.Migrations.CreateExercises do
  use Ecto.Migration

  def change do
    create table(:exercises) do
      add :name, :string
      add :intensity_unit, :integer

      timestamps()
    end

  end
end

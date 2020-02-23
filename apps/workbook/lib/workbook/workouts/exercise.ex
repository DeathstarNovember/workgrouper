defmodule Workbook.Workouts.Exercise do
  use Ecto.Schema
  import Ecto.Changeset

  schema "exercises" do
    field :intensity_unit, :integer
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(exercise, attrs) do
    exercise
    |> cast(attrs, [:name, :intensity_unit])
    |> validate_required([:name, :intensity_unit])
  end
end

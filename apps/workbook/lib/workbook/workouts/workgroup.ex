defmodule Workbook.Workouts.Workgroup do
  use Ecto.Schema
  import Ecto.Changeset

  alias Workbook.Workouts.{Workout, Round, Result}

  schema "workgroups" do
    field :note, :string
    field :sort_order, :integer
    belongs_to :workout, Workout
    belongs_to :result, Result
    has_many :rounds, Round

    timestamps()
  end

  @doc false
  def changeset(workgroup, attrs) do
    workgroup
    |> cast(attrs, [:sort_order, :note, :workout_id, :result_id])
    |> cast_assoc(:rounds)
    |> validate_required([:sort_order])
  end
end

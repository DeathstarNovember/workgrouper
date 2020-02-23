defmodule Workbook.Workouts.Workset do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Workbook.Workouts.{Exercise, Round}

  schema "worksets" do
    field :intensity, :integer
    field :intensity_type, :integer
    field :interval, :integer
    field :interval_type, :integer
    field :reps, :integer
    field :sort_order, :integer
    belongs_to :round, Round
    belongs_to :exercise, Exercise

    timestamps()
  end

  @doc false
  def changeset(workset, attrs) do
    workset
    |> cast(attrs, [:sort_order, :reps, :intensity_type, :intensity, :interval_type, :interval, :round_id, :exercise_id])
    |> validate_required([:sort_order, :reps, :intensity_type, :intensity, :interval_type, :interval])
  end
end

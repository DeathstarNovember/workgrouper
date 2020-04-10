defmodule Workbook.Training.TrainingSession do
  use Ecto.Schema
  import Ecto.Changeset

  alias Workbook.Training.Cycle
  alias Workbook.Workouts.{Workout, Result}

  schema "training_sessions" do
    field :name, :string
    field :description, :string
    field :sort_order, :integer
    belongs_to :cycle, Cycle
    belongs_to :workout, Workout
    belongs_to :result, Result

    timestamps()
  end

  @doc false
  def changeset(training_session, attrs) do
    training_session
    |> cast(attrs, [:sort_order, :name, :description, :cycle_id, :workout_id, :result_id])
    |> validate_required([:sort_order, :name, :description, :cycle_id])
  end
end

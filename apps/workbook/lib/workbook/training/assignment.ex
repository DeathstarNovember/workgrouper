defmodule Workbook.Training.Assignment do
  use Ecto.Schema
  import Ecto.Changeset

  alias Workbook.Workouts.{Workout, Result}
  alias Workbook.Auth.User

  schema "assignments" do
    field :date, :utc_datetime
    field :note, :string
    belongs_to :user, User
    belongs_to :workout, Workout
    belongs_to :result, Result

    timestamps()
  end

  @doc false
  def changeset(assignment, attrs) do
    assignment
    |> cast(attrs, [:note, :date, :user_id, :workout_id])
    |> validate_required([:date, :user_id, :workout_id])
  end
end

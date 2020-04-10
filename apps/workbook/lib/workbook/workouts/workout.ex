defmodule Workbook.Workouts.Workout do
  use Ecto.Schema
  import Ecto.Changeset
  alias Workbook.Auth.User
  alias Workbook.Workouts.{Workgroup, Result}
  alias Workbook.Training.TrainingSession

  schema "workouts" do
    field :description, :string
    field :name, :string
    belongs_to :user, User
    has_many :workgroups, Workgroup
    has_many :results, Result
    has_many :training_sessions, TrainingSession

    timestamps()
  end

  @doc false
  def changeset(workout, attrs) do
    workout
    |> cast(attrs, [:name, :description, :user_id])
    |> cast_assoc(:workgroups)
    |> cast_assoc(:results)
    |> cast_assoc(:training_sessions)
    |> validate_required([:user_id])
  end
end

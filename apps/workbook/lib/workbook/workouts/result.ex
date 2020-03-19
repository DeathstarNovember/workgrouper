defmodule Workbook.Workouts.Result do
  require Logger
  use Ecto.Schema
  import Ecto.Changeset

  alias Workbook.Auth.User
  alias Workbook.Workouts.{Workout, Workgroup}
  alias Workbook.Training.Session

  schema "results" do
    field :completed_at, :utc_datetime
    field :description, :string
    field :name, :string
    belongs_to :user, User
    belongs_to :workout, Workout
    has_many :workgroups, Workgroup
    has_one :session, Session

    timestamps()
  end

  @doc false
  def changeset(result, attrs) do
    result
    |> cast(attrs, [:name, :description, :completed_at, :user_id, :workout_id])
    |> cast_assoc(:workgroups)
    |> cast_assoc(:session)
    |> validate_required([:name, :completed_at, :user_id, :workout_id])
  end
end

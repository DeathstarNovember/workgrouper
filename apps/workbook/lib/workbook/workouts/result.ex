defmodule Workbook.Workouts.Result do
  require Logger
  use Ecto.Schema
  import Ecto.Changeset

  alias Workbook.Auth.User
  alias Workbook.Workouts.{Workout, Workgroup}
  alias Workbook.Training.Assignment

  schema "results" do
    field :completed_at, :utc_datetime
    field :description, :string
    field :name, :string
    belongs_to :user, User
    belongs_to :workout, Workout
    has_many :workgroups, Workgroup
    has_one :assignment, Assignment

    timestamps()
  end

  @doc false
  def changeset(result, attrs) do
    result
    |> cast(attrs, [:name, :description, :completed_at])
    |> validate_required([:name, :completed_at])
  end
end

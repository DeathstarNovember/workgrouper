defmodule Workbook.Workouts.Workout do
  require Logger
  use Ecto.Schema
  import Ecto.Changeset
  alias Workbook.Auth.User
  alias Workbook.Workouts.{Workgroup, Result}
  alias Workbook.Training.Assignment

  schema "workouts" do
    field :description, :string
    field :name, :string
    belongs_to :user, User
    has_many :workgroups, Workgroup
    has_many :results, Result
    has_many :assignments, Assignment

    timestamps()
  end

  @doc false
  def changeset(workout, attrs) do
    workout
    |> cast(attrs, [:name, :description, :user_id])
    |> validate_required([:user_id])
  end
end

defmodule Workbook.Workouts.Workout do
  require Logger
  use Ecto.Schema
  import Ecto.Changeset

  alias Workbook.Repo
  alias Workbook.Auth.User
  alias Workbook.Workouts.Workgroup

  schema "workouts" do
    # field :completed_at, :utc_datetime
    field :description, :string
    field :name, :string
    belongs_to :user, User
    has_many :workgroups, Workgroup

    timestamps()
  end

  @doc false
  def changeset(workout, attrs) do
    workout
    |> cast(attrs, [:name, :description, :user_id])
    |> validate_required([:name, :description])
  end
end

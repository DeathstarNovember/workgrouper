defmodule Workbook.Auth.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Workbook.Workouts.{Workout, Result}
  alias Workbook.Training.{Program, Schedule}

  schema "users" do
    field :username, :string
    field :password, :string, virtual: true
    field :password_hash, :string
    has_many :programs, Program
    has_many :schedules, Schedule
    has_many :workouts, Workout
    has_many :results, Result

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :password])
    |> validate_required([:username, :password])
    |> unique_constraint(:username)
    |> put_password_hash()
  end
  defp put_password_hash(
    %Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset
  ) do
      change(changeset, Bcrypt.add_hash(password))
  end

  defp put_password_hash(changeset) do
    changeset
  end
end

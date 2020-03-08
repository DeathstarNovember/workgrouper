defmodule Workbook.Training.Program do
  use Ecto.Schema
  import Ecto.Changeset

  alias Workbook.Auth.User
  alias Workbook.Training.Phase

  schema "programs" do
    field :description, :string
    field :name, :string
    has_many :phases, Phase
    belongs_to :user, User

    timestamps()
  end

  @doc false
  def changeset(program, attrs) do
    program
    |> cast(attrs, [:name, :description, :user_id])
    |> validate_required([:name, :user_id])
  end
end

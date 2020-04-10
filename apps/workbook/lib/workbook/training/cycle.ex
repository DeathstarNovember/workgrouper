defmodule Workbook.Training.Cycle do
  use Ecto.Schema
  import Ecto.Changeset

  alias Workbook.Training.{Phase, TrainingSession}

  schema "cycles" do
    field :description, :string
    field :name, :string
    field :sort_order, :integer
    has_many :training_sessions, TrainingSession
    belongs_to :phase, Phase

    timestamps()
  end

  @doc false
  def changeset(cycle, attrs) do
    cycle
    |> cast(attrs, [:sort_order, :name, :description, :phase_id])
    |> validate_required([:sort_order, :phase_id])
  end
end

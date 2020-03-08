defmodule Workbook.Training.Phase do
  use Ecto.Schema
  import Ecto.Changeset

  alias Workbook.Training.{Program, Cycle}

  schema "phases" do
    field :sort_order, :integer
    field :name, :string
    field :description, :string
    has_many :cycles, Cycle
    belongs_to :program, Program

    timestamps()
  end

  @doc false
  def changeset(phase, attrs) do
    phase
    |> cast(attrs, [:sort_order, :name, :description, :program_id])
    |> validate_required([:sort_order, :program_id])
  end
end

defmodule Workbook.Workouts.Round do
  use Ecto.Schema
  import Ecto.Changeset

  alias Workbook.Workouts.{Workgroup, Workset}

  schema "rounds" do
    field :interval, :integer
    field :interval_type, :integer
    field :sort_order, :integer
    belongs_to :workgroup, Workgroup
    has_many :worksets, Workset

    timestamps()
  end

  @doc false
  def changeset(round, attrs) do
    round
    |> cast(attrs, [:sort_order, :interval, :interval_type, :workgroup_id])
    |> validate_required([:sort_order, :interval, :interval_type])
  end
end

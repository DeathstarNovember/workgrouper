defmodule Workbook.Training.Schedule do
  use Ecto.Schema
  import Ecto.Changeset
  alias Workbook.Auth.User
  alias Workbook.Training.Program

  schema "schedules" do
    field :start_date, :utc_datetime
    field :is_active, :boolean
    belongs_to :user, User
    belongs_to :program, Program

    timestamps()
  end

  @doc false
  def changeset(schedule, attrs) do
    schedule
    |> cast(attrs, [:start_date, :user_id, :program_id, :is_active])
    |> validate_required([:start_date, :user_id, :program_id, :is_active])
  end
end

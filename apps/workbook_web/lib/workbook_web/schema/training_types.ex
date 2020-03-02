defmodule WorkbookWeb.Schema.TrainingTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: Workbook.Repo

  object :assignment do
    field :id, :id
    field :note, non_null(:string)
    field :date, non_null(:datetime)
    field :user, non_null(:user), resolve: assoc(:user)
    field :workout, non_null(:workout), resolve: assoc(:workout)
    field :result, :result, resolve: assoc(:result)
  end

  input_object :assignment_input do
    field :date, non_null(:datetime)
    field :note, :string
    field :user_id, non_null(:id)
    field :workout_id, non_null(:id)
    field :result_id, :id
  end
end

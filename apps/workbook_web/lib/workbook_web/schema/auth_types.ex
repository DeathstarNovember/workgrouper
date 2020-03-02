defmodule WorkbookWeb.Schema.AuthTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: Workbook.Repo
  
  object :user do
    field :id, :id
    field :username, :string
    field :workouts, list_of(non_null(:workout)) do
      resolve(
        assoc(:workouts, fn workouts_query, _args, _context ->
          workouts_query
        end)
      )
    end
    field :assignments, list_of(non_null(:assignment)) do
      resolve(
        assoc(:assignments, fn assignments_query, _args, _context ->
          assignments_query
        end)
      )
    end 
    field :results, list_of(non_null(:result)) do
      resolve(
        assoc(:results, fn results_query, _args, _context ->
          results_query
        end)
      )
    end
  end

  input_object :user_input do
    field :username, non_null(:string)
    field :password, non_null(:string)
  end
end

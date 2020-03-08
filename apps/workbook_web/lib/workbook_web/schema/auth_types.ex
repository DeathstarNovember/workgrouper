defmodule WorkbookWeb.Schema.AuthTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: Workbook.Repo

  object :auth_queries do
    @desc "Get a list of users"
    field :users, list_of(:user) do
      resolve fn _parent, _args, _resolution ->
        {:ok, Workbook.Auth.list_users()}
      end
    end
  end

  object :auth_mutations do
    @desc "Create a user"
    field :create_user, :user do
      arg :user, non_null(:user_input)

      resolve(&WorkbookWeb.Resolvers.AuthResolver.create_user/3)
    end
  end
  
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
    field :results, list_of(non_null(:result)) do
      resolve(
        assoc(:results, fn results_query, _args, _context ->
          results_query
        end)
      )
    end
    field :schedules, list_of(non_null(:schedule)) do
      resolve(
        assoc(:schedules, fn schedules_query, _args, _context ->
          schedules_query
        end)
      )
    end
    field :programs, list_of(non_null(:program)) do
      resolve(
        assoc(:programs, fn programs_query, _args, _context ->
          programs_query
        end)
      )
    end
  end

  input_object :user_input do
    field :username, non_null(:string)
    field :password, non_null(:string)
  end
end

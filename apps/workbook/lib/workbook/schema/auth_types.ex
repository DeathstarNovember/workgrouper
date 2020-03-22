defmodule Workbook.Schema.AuthTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: Workbook.Repo

  object :auth_queries do
    @desc "Get a list of users"
    field :users, list_of(:user) do
      resolve fn _parent, _args, _resolution ->
        {:ok, Workbook.Auth.list_users()}
      end
    end

    @desc "Get a use by authorization token"
    field :authorized_user, :user do
      arg :token, non_null(:string)
      
      resolve(&Workbook.Resolvers.AuthResolver.get_authorized_user/3)
    end

    @desc "Log user in"
    field :login, type: :user_session do
      arg(:username, non_null(:string))
      arg(:password, non_null(:string))
    
      resolve(&Workbook.Resolvers.AuthResolver.login/3)
    end
  end

  object :auth_mutations do
    @desc "Create a user"
    field :create_user, :user do
      arg :user, non_null(:user_input)

      resolve(&Workbook.Resolvers.AuthResolver.create_user/3)
    end

    @desc "Log user out"
    field :sign_out, type: :user do
      arg(:id, non_null(:id))

      resolve(&Workbook.Resolvers.AuthResolver.logout/3)
     end
  end

  object :user_session do
    field :token, :string
  end
  
  object :user do
    field :id, :id
    field :username, :string
    field :token, :string
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

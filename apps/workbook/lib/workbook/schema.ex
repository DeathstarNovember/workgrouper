defmodule Workbook.Schema do
  use Absinthe.Schema

  import_types Workbook.Schema.DataTypes

  query do
    @desc "Get a list of users"
    field :users, list_of(:user) do
      resolve fn _parent, _args, _resolution ->
        {:ok, Workbook.Auth.list_users()}
      end
    end
  end
end

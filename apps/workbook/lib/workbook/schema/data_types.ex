defmodule Workbook.Schema.DataTypes do
  use Absinthe.Schema.Notation

  object :user do
    field :id, :id
    field :username, :string
  end
end

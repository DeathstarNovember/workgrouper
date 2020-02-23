defmodule WorkbookWeb.Schema.DataTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: Workbook.Repo

  object :user do
    field :id, :id
    field :username, :string
  end

  object :exercise do
    field :id, :id
    field :name, :string
    field :intensity_unit, :integer
  end

  object :workset do
    field :id, :id
    field :intensity, :integer
    field :intensity_type, :integer
    field :interval, :integer
    field :interval_type, :integer
    field :reps, :integer
    field :sort_order, :integer
    field :exercise, :exercise, resolve: assoc(:exercise)
  end

  object :round do
    field :id, :id
    field :sort_order, :integer
    field :interval_type, :integer
    field :interval, :integer
    field :worksets, list_of(:workset) do
      resolve(
        assoc(:worksets, fn worksets_query, _args, _context ->
          worksets_query
        end)
      )
    end
  end

  object :workgroup do
    field :id, :id
    field :sort_order, :integer
    field :note, :string
    field :rounds, list_of(:round) do
      resolve(
        assoc(:rounds, fn rounds_query, _args, _context ->
          rounds_query
        end)
      )
    end
  end

  object :workout do
    field :id, :id
    field :name, :string
    field :description, :string
    field :workgroups, list_of(:workgroup) do
      resolve(
        assoc(:workgroups, fn workgroups_query, _args, _context ->
          workgroups_query
        end)
      )
    end
  end
end

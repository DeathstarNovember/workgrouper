defmodule WorkbookWeb.Schema.WorkoutTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: Workbook.Repo

  object :result do
    field :id, :id
    field :name, :string
    field :completed_at, non_null(:datetime)
    field :description, :string
    field :workout, :workout, resolve: assoc(:workout)
    field :user, non_null(:user), resolve: assoc(:user)
    field :assignment, :assignment, resolve: assoc(:assignment)
    field :workgroups, list_of(non_null(:workgroup)) do
      resolve(
        assoc(:workgroups, fn workgroups_query, _args, _context ->
          workgroups_query
        end)
      )
    end
  end 

  object :workout do
    field :id, :id
    field :name, :string
    field :completed_at, :datetime
    field :description, :string
    field :workgroups, list_of(non_null(:workgroup)) do
      resolve(
        assoc(:workgroups, fn workgroups_query, _args, _context ->
          workgroups_query
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

  object :exercise do
    field :id, :id
    field :name, non_null(:string)
    field :intensity_unit, non_null(:integer)
  end

  object :workset do
    field :id, :id
    field :intensity, non_null(:integer)
    field :intensity_type, non_null(:integer)
    field :interval, non_null(:integer)
    field :interval_type, non_null(:integer)
    field :reps, non_null(:integer)
    field :sort_order, non_null(:integer)
    field :exercise, non_null(:exercise), resolve: assoc(:exercise)
  end

  object :round do
    field :id, :id
    field :sort_order, non_null(:integer)
    field :interval_type, :integer
    field :interval, :integer
    field :worksets, list_of(non_null(:workset)) do
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
    field :rounds, list_of(non_null(:round)) do
      resolve(
        assoc(:rounds, fn rounds_query, _args, _context ->
          rounds_query
        end)
      )
    end
  end

  input_object :exercise_input do
    field :name, non_null(:string)
    field :intensity_unit, non_null(:integer)
  end

  input_object :workset_input do
    field :intensity, non_null(:integer)
    field :intensity_type, non_null(:integer)
    field :interval, non_null(:integer)
    field :interval_type, non_null(:integer)
    field :reps, non_null(:integer)
    field :sort_order, non_null(:integer)
    field :exercise_id, non_null(:id)
    field :round_id, :id
  end

  input_object :round_input do
    field :sort_order, non_null(:integer)
    field :interval_type,  :integer
    field :interval, :integer
    field :workgroup_id, :id
    field :worksets, list_of(non_null(:workset_input))
  end

  input_object :workgroup_input do
    field :sort_order, non_null(:integer)
    field :note, :string
    field :workout_id, :id
    field :rounds, list_of(non_null(:round_input))
  end

  input_object :workout_input do
    field :name, non_null(:string)
    field :description, :string
    field :user_id, :id
    field :workgroups, list_of(non_null(:workgroup_input))
  end
  
  input_object :result_input do
    field :name, non_null(:string)
    field :description, :string
    fisld :completed_at, :utc_datetime
    field :user_id, :id
    field :workgroups, list_of(non_null(:workgroup_input))
  end
end

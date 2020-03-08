defmodule WorkbookWeb.Schema.WorkoutTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: Workbook.Repo

  object :workout_mutations do
    @desc "Create an exercise"
    field :create_exercise, :exercise do
      arg :exercise, non_null(:exercise_input)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.create_exercise/3)
    end
    @desc "Update an exercise"
    field :update_exercise, :exercise do
      arg :id, non_null(:id)
      arg :exercise, non_null(:exercise_input)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.update_exercise/3)
    end
    @desc "Delete an exercise"
    field :delete_exercise, :exercise do
      arg :id, non_null(:id)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.delete_exercise/3)
    end

    @desc "Create a workout"
    field :create_workout, :workout do
      arg :workout, non_null(:workout_input)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.create_workout/3)
    end
    @desc "Update a workout"
    field :update_workout, :workout do
      arg :id, non_null(:id)
      arg :workout, non_null(:workout_input)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.update_workout/3)
    end
    @desc "Delete a workout"
    field :delete_workout, :workout do
      arg :id, non_null(:id)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.delete_workout/3)
    end
    
    @desc "Create a result"
    field :create_result, :result do
      arg :result, non_null(:result_input)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.create_result/3)
    end
    @desc "Update a result"
    field :update_result, :result do
      arg :id, non_null(:id)
      arg :result, non_null(:result_input)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.update_result/3)
    end
    @desc "Delete a result"
    field :delete_result, :result do
      arg :id, non_null(:id)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.delete_result/3)
    end
    
    @desc "Create a workgroup"
    field :create_workgroup, :workgroup do
      arg :workgroup, non_null(:workgroup_input)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.create_workgroup/3)
    end
    @desc "Update a workgroup"
    field :update_workgroup, :workgroup do
      arg :id, non_null(:id)
      arg :workgroup, non_null(:workgroup_input)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.update_workgroup/3)
    end
    @desc "Delete a workgroup"
    field :delete_workgroup, :workgroup do
      arg :id, non_null(:id)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.delete_workgroup/3)
    end
    
    @desc "Create a round"
    field :create_round, :round do
      arg :round, non_null(:round_input)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.create_round/3)
    end
    @desc "Update a round"
    field :update_round, :round do
      arg :id, non_null(:id)
      arg :round, non_null(:round_input)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.update_round/3)
    end
    @desc "Delete a round"
    field :delete_round, :round do
      arg :id, non_null(:id)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.delete_round/3)
    end
    
    @desc "Create a workset"
    field :create_workset, :workset do
      arg :workset, non_null(:workset_input)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.create_workset/3)
    end
    @desc "Update a workset"
    field :update_workset, :workset do
      arg :id, non_null(:id)
      arg :workset, non_null(:workset_input)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.update_workset/3)
    end
    @desc "Delete a workset"
    field :delete_workset, :workset do
      arg :id, non_null(:id)
      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.delete_workset/3)
    end
  end

  object :workout_queries do
    @desc "Get a list of exercises"
    field :exercises, list_of(:exercise) do
      resolve fn _parent, _args, _resolution ->
        {:ok, Workbook.Workouts.list_exercises()}
      end
    end
    
    @desc "Get a list of workouts"
    field :workouts, list_of(:workout) do
      resolve fn _parent, _args, _resolution ->
        {:ok, Workbook.Workouts.list_workouts()}
      end
    end
    
    @desc "Get a list of results"
    field :results, list_of(:result) do
      resolve fn _parent, _args, _resolution ->
        {:ok, Workbook.Workouts.list_results()}
      end
    end
  end

  object :result do
    field :id, :id
    field :name, :string
    field :completed_at, non_null(:datetime)
    field :description, :string
    field :workout, :workout, resolve: assoc(:workout)
    field :user, non_null(:user), resolve: assoc(:user)
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

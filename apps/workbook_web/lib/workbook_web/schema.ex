defmodule WorkbookWeb.Schema do
  use Absinthe.Schema

  import_types WorkbookWeb.Schema.DataTypes

  input_object :user_input do
    field :username, non_null(:string)
    field :password, non_null(:string)
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

  query do
    @desc "Get a list of users"
    field :users, list_of(:user) do
      resolve fn _parent, _args, _resolution ->
        {:ok, Workbook.Auth.list_users()}
      end
    end
    
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
  end

  mutation do
    @desc "Create a user"
    field :create_user, :user do
      arg :user, non_null(:user_input)

      resolve(&WorkbookWeb.Resolvers.AuthResolver.create_user/3)
    end
    
    @desc "Create an exercise"
    field :create_exercise, :exercise do
      arg :exercise, non_null(:exercise_input)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.create_exercise/3)
    end

    @desc "Create a workout"
    field :create_workout, :workout do
      arg :workout, non_null(:workout_input)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.create_workout/3)
    end
    
    @desc "Create a workgroup"
    field :create_workgroup, :workgroup do
      arg :workgroup, non_null(:workgroup_input)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.create_workgroup/3)
    end
    
    @desc "Create a round"
    field :create_round, :round do
      arg :round, non_null(:round_input)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.create_round/3)
    end
    
    @desc "Create a workset"
    field :create_workset, :workset do
      arg :workset, non_null(:workset_input)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.create_workset/3)
    end
  end
end

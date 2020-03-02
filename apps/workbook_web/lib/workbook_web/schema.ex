defmodule WorkbookWeb.Schema do
  use Absinthe.Schema

  import_types Absinthe.Type.Custom
  import_types WorkbookWeb.Schema.TrainingTypes
  import_types WorkbookWeb.Schema.AuthTypes
  import_types WorkbookWeb.Schema.WorkoutTypes

  query do
    @desc "Get a list of assignments"
    field :assignments, list_of(:assignment) do
      resolve fn _parent, _args, _resolution ->
        {:ok, Workbook.Training.list_assignments()}
      end
    end

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
    
    @desc "Get a list of results"
    field :results, list_of(:result) do
      resolve fn _parent, _args, _resolution ->
        {:ok, Workbook.Workouts.list_results()}
      end
    end
  end

  mutation do
    @desc "Create an assignment"
    field :create_assignment, :assignment do
      arg :assignment, non_null(:assignment_input)

      resolve(&WorkbookWeb.Resolvers.TrainingResolver.create_assignment/3)
    end

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
    
    @desc "Create a result"
    field :create_result, :result do
      arg :result, non_null(:result_input)

      resolve(&WorkbookWeb.Resolvers.WorkoutsResolver.create_result/3)
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

defmodule WorkbookWeb.Schema.TrainingTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: Workbook.Repo

  object :training_mutations do
    @desc "Create a schedule"
    field :create_schedule, :schedule do
      arg :schedule, non_null(:schedule_input)

      resolve(&WorkbookWeb.Resolvers.TrainingResolver.create_schedule/3)
    end
    @desc "Update a schedule"
    field :update_schedule, :schedule do
      arg :id , non_null(:id)
      arg :schedule, non_null(:schedule_input)

      resolve(&WorkbookWeb.Resolvers.TrainingResolver.update_schedule/3)
    end
    @desc "Delete a schedule"
    field :delete_schedule, :schedule do
      arg :id, non_null(:id)

      resolve(&WorkbookWeb.Resolvers.TrainingResolver.delete_schedule/3)
    end
  end

  object :training_queries do
    @desc "Get a list of programs"
    field :programs, list_of(:program) do
      resolve fn _parent, _args, _resolution ->
        {:ok, Workbook.Training.list_programs()}
      end
    end
  end

  object :schedule do
    field :id, :id
    field :is_active, :boolean
    field :start_date, non_null(:datetime)
    field :user, non_null(:user), resolve: assoc(:user)
    field :program, non_null(:program), resolve: assoc(:program)
  end

  object :program do
    field :id, :id
    field :name, :string
    field :description, :string
    field :user, non_null(:user), resolve: assoc(:user)
    field :phases, list_of(non_null(:phase)) do
      resolve(
        assoc(:phases, fn phases_query, _args, _context ->
          phases_query
        end)
      )
    end
  end

  object :phase do
    field :id, :id
    field :name, :string
    field :description, :string
    field :program, non_null(:program), resolve: assoc(:program)
    field :cycles, list_of(non_null(:cycle)) do
      resolve(
        assoc(:cycles, fn cycles_query, _args, _context ->
          cycles_query
        end)
      )
    end
  end
  
  object :cycle do
    field :id, :id
    field :name, :string
    field :description, :string
    field :phase, non_null(:phase), resolve: assoc(:phase)
    field :sessions, list_of(non_null(:session)) do
      resolve(
        assoc(:sessions, fn sessions_query, _args, _context ->
          sessions_query
        end)
      )
    end
  end

  object :session do
    field :id, :id
    field :name, :string
    field :description, :string
    field :sort_order, :integer
    field :cycle, non_null(:cycle), resolve: assoc(:cycle)
    field :workout, :workout, resolve: assoc(:workout)
    field :result, :result, resolve: assoc(:result)
  end

  input_object :schedule_input do
    field :is_active, :boolean
    field :start_date, non_null(:datetime)
    field :user_id, non_null(:id)
    field :program_id, non_null(:id)
  end

  input_object :program_input do
    field :name, :string
    field :description, :string
    field :user_id, :id
    field :phases, list_of(non_null(:phase_input))
  end
  
  input_object :phase_input do
    field :name, :string
    field :description, :string
    field :sort_order, non_null(:integer)
    field :program_id, :id
    field :cycles, list_of(non_null(:cycle_input))
  end

  input_object :cycle_input do
    field :name, :string
    field :description, :string
    field :sort_order, non_null(:integer)
    field :phase_id, :id
    field :sessions, list_of(non_null(:session_input))
  end

  input_object :session_input do
    field :name, :string
    field :description, :string
    field :sort_order, non_null(:integer)
    field :cycle_id, :id
    field :workout_id, :integer
    field :result_id, :integer
  end
end

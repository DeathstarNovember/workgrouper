defmodule WorkbookWeb.Schema do
  use Absinthe.Schema
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: Workbook.Repo

  import_types Absinthe.Type.Custom
  import_types WorkbookWeb.Schema.TrainingTypes
  import_types WorkbookWeb.Schema.AuthTypes
  import_types WorkbookWeb.Schema.WorkoutTypes

  query do
    import_fields :workout_queries
    import_fields :auth_queries
    import_fields :training_queries
  end

  mutation do
    import_fields :auth_mutations
    import_fields :workout_mutations
    import_fields :training_mutations
  end
end

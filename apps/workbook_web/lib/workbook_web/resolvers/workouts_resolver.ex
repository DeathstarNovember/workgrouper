defmodule WorkbookWeb.Resolvers.WorkoutsResolver do
  require Logger
  alias Workbook.Workouts
  def create_exercise(_parent, args, _resolutions) do
    args.exercise
    |> Workouts.create_exercise()
    |> case do
      {:ok, exercise} ->
        {:ok, exercise}
      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end

  def update_exercise(_parent, args, _resolutions) do
    Workouts.get_exercise!(args.id)
    |> Workouts.update_exercise(args.exercise)
    |> case do
      {:ok, exercise} ->
        {:ok, exercise}
      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end

  def create_workout(_parent, args, _resolutions) do
    args.workout
    |> Workouts.create_workout()
    |> case do
      {:ok, created_workout} ->
                {:ok, created_workout}
      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end

  def update_workout(_parent, args, _resolutions) do
    args.id
    |> Workouts.update_workout(args.workout)
    |> case do
      {:ok, workout} ->
        {:ok, workout}
      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end

  def create_result(_parent, args, _resolutions) do
    result_input = %{
      name: args.result.name, 
      description: args.result.description, 
      completed_at: args.result.completed_at
    }
    Logger.info("Result input: #{inspect(result_input)}")
    Workouts.create_result(result_input)
    |> case do
      {:ok, created_result} ->
        {:ok, created_result}
      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end

  def update_result(_parent, args, _resolutions) do
    args.id
    |> Workouts.update_result(args.result)
    |> case do
      {:ok, result} ->
        {:ok, result}
      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end

  def create_workgroup(_parent, args, _resolutions) do
    args.workgroup
    |> Workouts.create_workgroup()
    |> case do
      {:ok, workgroup} ->
        {:ok, workgroup}
      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end
  def update_workgroup(_parent, args, _resolutions) do
    args.id
    |> Workouts.update_workgroup(args.workgroup)
    |> case do
      {:ok, workgroup} ->
        {:ok, workgroup}
      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end
  
  def create_round(_parent, args, _resolutions) do
    args.round
    |> Workouts.create_round()
    |> case do
      {:ok, round} ->
        {:ok, round}
      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end
  def update_round(_parent, args, _resolutions) do
    args.id
    |> Workouts.update_round(args.round)
    |> case do
      {:ok, round} ->
        {:ok, round}
      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end
  
  def create_workset(_parent, args, _resolutions) do
    args.workset
    |> Workouts.create_workset()
    |> case do
      {:ok, workset} ->
        {:ok, workset}
      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end
  def update_workset(_parent, args, _resolutions) do
    args.id
    |> Workouts.update_workset(args.workset)
    |> case do
      {:ok, workset} ->
        {:ok, workset}
      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end
  
  def delete_exercise(_parent, args, _resolutions) do
    Workouts.get_exercise!(args.id)
    |> Workouts.delete_exercise()
    |> case do
      {:ok, exercise} ->
        {:ok, exercise}
      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end
  def delete_workout(_parent, args, _resolutions) do
    args.workout
    |> Workouts.delete_workout()
    |> case do
      {:ok, workout} ->
        {:ok, workout}
      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end
  def delete_workgroup(_parent, args, _resolutions) do
    args.workout
    |> Workouts.delete_workgroup()
    |> case do
      {:ok, workgroup} ->
        {:ok, workgroup}
      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end
  def delete_round(_parent, args, _resolutions) do
    args.workout
    |> Workouts.delete_round()
    |> case do
      {:ok, round} ->
        {:ok, round}
      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end
  def delete_workset(_parent, args, _resolutions) do
    args.workout
    |> Workouts.delete_workset()
    |> case do
      {:ok, workset} ->
        {:ok, workset}
      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end
  def delete_result(_parent, args, _resolutions) do
    args.workout
    |> Workouts.delete_result()
    |> case do
      {:ok, result} ->
        {:ok, result}
      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end

  defp extract_error_msg(changeset) do
    changeset.errors
    |> Enum.map(fn {field, {error, _details}} ->
      [
        field: field,
        message: String.capitalize(error)
      ]
    end)
  end
end

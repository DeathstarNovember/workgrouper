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
        args.workout.workgroups
        |> Enum.with_index
        |> Enum.each(fn({workgroup_args, workgroup_sort_order}) ->
          workgroup_input = %{
            sort_order: workgroup_sort_order, 
            note: workgroup_args.note, 
            workout_id: created_workout.id}
          Workouts.create_workgroup(workgroup_input)
            |> case do
              {:ok, created_workgroup} ->
                workgroup_args.rounds
                |> Enum.with_index
                |> Enum.each(fn({round_args, round_sort_order}) ->
                  round_input = %{
                    sort_order: round_sort_order, 
                    workgroup_id: created_workgroup.id, 
                    interval: round_args.interval, 
                    interval_type: round_args.interval_type 
                  }
                  Workouts.create_round(round_input)
                  |> case do
                    {:ok, created_round} ->
                      round_args.worksets
                      |> Enum.with_index
                      |> Enum.each(fn({workset_args, workset_sort_order}) ->
                        %{
                          sort_order: workset_sort_order,
                          round_id: created_round.id,
                          reps: workset_args.reps,
                          intensity: workset_args.intensity,
                          intensity_type: workset_args.intensity_type,
                          interval: workset_args.interval,
                          interval_type: workset_args.interval_type,
                          exercise_id: workset_args.exercise_id
                        }
                        |> Workouts.create_workset()
                        |> case do                            
                          {:error, changeset} ->
                            {:error, extract_error_msg(changeset)}
                        end
                      end)
                    {:error, changeset} -> 
                      extract_error_msg(changeset)
                  end
                end)
              {:error, changeset} ->
                {:error, extract_error_msg(changeset)}
            end
          end)
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
        args.workout.workgroups
        |> Enum.with_index
        |> Enum.each(fn({workgroup_args, workgroup_sort_order}) ->
          workgroup_input = %{
            sort_order: workgroup_sort_order, 
            note: workgroup_args.note, 
            workout_id: created_result.id}
          Workouts.create_workgroup(workgroup_input)
            |> case do
              {:ok, created_workgroup} ->
                workgroup_args.rounds
                |> Enum.with_index
                |> Enum.each(fn({round_args, round_sort_order}) ->
                  round_input = %{
                    sort_order: round_sort_order, 
                    workgroup_id: created_workgroup.id, 
                    interval: round_args.interval, 
                    interval_type: round_args.interval_type 
                  }
                  Workouts.create_round(round_input)
                  |> case do
                    {:ok, created_round} ->
                      round_args.worksets
                      |> Enum.with_index
                      |> Enum.each(fn({workset_args, workset_sort_order}) ->
                        %{
                          sort_order: workset_sort_order,
                          round_id: created_round.id,
                          reps: workset_args.reps,
                          intensity: workset_args.intensity,
                          intensity_type: workset_args.intensity_type,
                          interval: workset_args.interval,
                          interval_type: workset_args.interval_type,
                          exercise_id: workset_args.exercise_id
                        }
                        |> Workouts.create_workset()
                        |> case do                            
                          {:error, changeset} ->
                            {:error, extract_error_msg(changeset)}
                        end
                      end)
                    {:error, changeset} -> 
                      extract_error_msg(changeset)
                  end
                end)
              {:error, changeset} ->
                {:error, extract_error_msg(changeset)}
            end
          end)
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
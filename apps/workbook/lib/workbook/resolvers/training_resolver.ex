defmodule Workbook.Resolvers.TrainingResolver do
  alias Workbook.Training


  def create_schedule(_parent, args, _resolutions) do
    args.schedule
    |> Training.create_schedule()
    |> case do
      {:ok, schedule} -> 
        {:ok, schedule}
      {:error, changeset} -> 
        {:error, extract_error_msg(changeset)}
    end
  end

  def create_program(_parent, args, _resolutions) do
    args.program
    |> Training.create_program()
    |> case do
      {:ok, program} -> 
        {:ok, program}
      {:error, changeset} -> 
        {:error, extract_error_msg(changeset)}
    end
  end
  
  def create_phase(_parent, args, _resolutions) do
    args.phase
    |> Training.create_phase()
    |> case do
      {:ok, phase} -> 
        {:ok, phase}
      {:error, changeset} -> 
        {:error, extract_error_msg(changeset)}
    end
  end
  
  def create_cycle(_parent, args, _resolutions) do
    args.cycle
    |> Training.create_cycle()
    |> case do
      {:ok, cycle} -> 
        {:ok, cycle}
      {:error, changeset} -> 
        {:error, extract_error_msg(changeset)}
    end
  end

  def create_training_session(_parent, args, _resolutions) do
    args.training_session
    |> Training.create_training_session()
    |> case do
      {:ok, training_session} -> 
        {:ok, training_session}
      {:error, changeset} -> 
        {:error, extract_error_msg(changeset)}
    end
  end

  def update_schedule(_parent, args, _resolutions) do
    (args.id)
    |> Training.update_schedule(args.schedule)
    |> case do
      {:ok, schedule} -> 
        {:ok, schedule}
      {:error, changeset} -> 
        {:error, extract_error_msg(changeset)}
    end
  end

  def update_program(_parent, args, _resolutions) do
    (args.id)
    |> Training.update_program(args.program)
    |> case do
      {:ok, program} -> 
        {:ok, program}
      {:error, changeset} -> 
        {:error, extract_error_msg(changeset)}
    end
  end
  def update_phase(_parent, args, _resolutions) do
    (args.id)
    |> Training.update_phase(args.phase)
    |> case do
      {:ok, phase} -> 
        {:ok, phase}
      {:error, changeset} -> 
        {:error, extract_error_msg(changeset)}
    end
  end
  def update_cycle(_parent, args, _resolutions) do
    (args.id)
    |> Training.update_cycle(args.cycle)
    |> case do
      {:ok, cycle} -> 
        {:ok, cycle}
      {:error, changeset} -> 
        {:error, extract_error_msg(changeset)}
    end
  end
  def update_training_session(_parent, args, _resolutions) do
    (args.id)
    |> Training.update_training_session(args.training_session)
    |> case do
      {:ok, training_session} -> 
        {:ok, training_session}
      {:error, changeset} -> 
        {:error, extract_error_msg(changeset)}
    end
  end
  def delete_schedule(_parent, args, _resolutions) do
    (args.id)
    |> Training.delete_schedule()
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

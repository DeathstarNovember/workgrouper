defmodule WorkbookWeb.Training.Assignment do
  require Logger
  alias Workbook.Training

  def create_assignment(_parent, args, _resolutions) do
    args.assignment
    |> Training.create_assignment()
    |> case do
      {:ok, assignment} -> 
        {:ok, assignment}
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

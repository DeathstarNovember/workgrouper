defmodule WorkbookWeb.Resolvers.AuthResolver do
  alias Workbook.Auth

  def create_user(_parent, args, _resolutions) do
    args
    |> Auth.create_user()
    |> case do
      {:ok, user} ->
        {:ok, user}
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

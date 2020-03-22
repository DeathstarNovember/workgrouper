defmodule Workbook.Resolvers.AuthResolver do
  alias Workbook.Auth
  alias Workbook.AuthHelper

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

  def login(_parent, args, _info) do
    with {:ok, user} <- AuthHelper.login_with_username_password(args.username, args.password),
      {:ok, jwt, _} <- Workbook.Guardian.encode_and_sign(user),
      {:ok, _ } <- Auth.store_token(user, jwt) do
      {:ok, %{token: jwt, current_user: user}}
    end
  end

  def logout(_args, %{context: %{current_user: current_user, token: _token}}) do
    Workbook.Auth.revoke_token(current_user, nil)
    {:ok, current_user}
  end
  
  def logout(_args, _info) do
    {:error, "Please log in first!"}
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

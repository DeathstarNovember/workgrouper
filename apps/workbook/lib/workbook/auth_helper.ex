defmodule Workbook.AuthHelper do
  @moduledoc false
  alias Workbook.Repo
  alias Workbook.Auth.User

  def login_with_username_password(username, given_pass) do
    user = Repo.get_by(User, username: username)
    cond do
      user ->
        Bcrypt.check_pass(user, given_pass)
        |> case do
          {:ok, response} ->
            {:ok, user}
          {:error, error} ->
            {:error, "Incorrect login credentials"}
        end
      true ->
        {:error, :"User not found"}
    end
  end
end

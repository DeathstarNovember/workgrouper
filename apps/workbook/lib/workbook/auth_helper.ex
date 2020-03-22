defmodule Workbook.AuthHelper do
  @moduledoc false

  import Bcrypt
  alias Workbook.Repo
  alias Workbook.Auth.User

  def login_with_username_password(username, given_pass) do
    user = Repo.get_by(User, username: username)

    cond do
      user && Bcrypt.check_pass(given_pass, user.password_hash) ->
        {:ok, user}

      user ->
        {:error, "Incorrect login credentials"}

      true ->
        {:error, :"User not found"}
    end
  end
end

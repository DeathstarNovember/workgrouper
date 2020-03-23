defmodule Workbook.Context do
  @behaviour Plug
  import Plug.Conn
  import Ecto.Query, only: [where: 2]

  alias Workbook.Repo
  alias Workbook.Auth.User

  def init(opts), do: opts

  def call(conn, _) do
    case build_context(conn) do
      {:ok, context} ->
        put_private(conn, :absinthe, %{context: context})
      _ ->
        conn
    end
  end

  defp build_context(conn) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
      {:ok, current_user} <- authorize(token) do
      {:ok, %{current_user: current_user, token: token}}
    end
  end

  defp authorize(token) do
    cond do
      String.length(String.trim token) == 0 -> {:error, "No token provided"}
      String.length(String.trim token) != 0 -> 
        User
        |> where(token: ^token)
        |> Repo.one()
        |> case do
          nil -> {:error, "Invalid authorization token"}
          user -> 
            {:ok, user}
        end
    end
  end
end

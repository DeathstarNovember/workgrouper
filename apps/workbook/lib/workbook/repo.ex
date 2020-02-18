defmodule Workbook.Repo do
  use Ecto.Repo,
    otp_app: :workbook,
    adapter: Ecto.Adapters.Postgres
end

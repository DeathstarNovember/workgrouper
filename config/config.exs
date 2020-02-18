# This file is responsible for configuring your umbrella
# and **all applications** and their dependencies with the
# help of Mix.Config.
#
# Note that all applications in your umbrella share the
# same configuration and dependencies, which is why they
# all use the same configuration file. If you want different
# configurations or dependencies per app, it is best to
# move said applications out of the umbrella.
use Mix.Config

# Configure Mix tasks and generators
config :workbook,
  ecto_repos: [Workbook.Repo]

config :workbook_web,
  ecto_repos: [Workbook.Repo],
  generators: [context_app: :workbook]

# Configures the endpoint
config :workbook_web, WorkbookWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "YtqyaHI4Smn7jgWlVaKQ7u6XYO7feo5cjM2hKOcmQ5jwoNcP0hx3r3qFe708IIRC",
  render_errors: [view: WorkbookWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: WorkbookWeb.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"

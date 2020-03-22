defmodule WorkbookWeb.Router do
  use WorkbookWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :context do
    plug Workbook.Context
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", WorkbookWeb do
    pipe_through :browser
    pipe_through :context

    get "/", PageController, :index
  end

  scope "/api" do
    pipe_through :api
    pipe_through :context
    forward "/graphiql", Absinthe.Plug.GraphiQL, schema: Workbook.Schema
    forward "/", Absinthe.Plug,
      schema: Workbook .Schema
  end
end

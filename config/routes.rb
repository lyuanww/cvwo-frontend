Rails.application.routes.draw do
  resources :posts
  namespace :api do
    namespace :v1 do
      resources :users
      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"
      get "/logged_in", to: "sessions#is_logged_in?"
    end
  end
end

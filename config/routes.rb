Rails.application.routes.draw do
  resources :comments
  resources :posts
  namespace :api do
    namespace :v1 do
      resources :users
      resources :posts do
        collection do
          get "/users/current", to: "posts#showByUser"
        end
      end

      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"
      get "/logged_in", to: "sessions#is_logged_in?"
    end
  end
end

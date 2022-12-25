Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :tags
      resources :comments
      resources :posts
      resources :users
      resources :posts do
        collection do
          get "/current_user", to: "posts#showByCurrentUser"
          get "/tags/:id", to: "posts#showByTag"
        end
      end

      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"
      get "/logged_in", to: "sessions#is_logged_in?"
    end
  end
end

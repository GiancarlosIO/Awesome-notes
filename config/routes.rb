Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    scope :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', skip: [:omniauth_callbacks]
    end
    namespace :v1 do
      resources :notes
    end
  end
  get '*path', to: 'application#index'
  get '/' => 'application#index'
end

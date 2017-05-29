Rails.application.routes.draw do
  root to: 'books#index'
  post	'/pagination' => 'books#pagination'
  post '/library' => 'books#library'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

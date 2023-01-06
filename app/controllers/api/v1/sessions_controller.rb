class Api::V1::SessionsController < ApplicationController

=begin
  Implementations of sessions are referenced from 
  https://medium.com/@altanner/react-user-authentication-with-rails-sessions-and-redux-194b5d31fe5a
=end
  def create
    user = User.find_by(username: session_params[:username])
    if user && user.authenticate(session_params[:password])
      session[:user_id] = user.id
      render json: {
               user: UserSerializer.new(user),
             }
    else
      render json: {

               error: "Could not authenticate your account",
               status: 400,
             }, status: 400
    end
  end

  def is_logged_in?
    current_user = User.find(session[:user_id]) if session[:user_id]
    if current_user
      render json: {
               logged_in: true,
               user: UserSerializer.new(current_user),
             }
    else
      render json: {
               logged_in: false,
             }
    end
  end

  def destroy
    session.delete :user_id
    render json: {
             status: 200,
             logged_out: true,
           }
  end

  private

  def session_params
    params.require(:session).permit(:username, :password)
  end
end

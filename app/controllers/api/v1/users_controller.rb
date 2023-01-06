class Api::V1::UsersController < ApplicationController
  def index
    @users = User.all

    render json: @users
  end

  # GET /posts/1
  def show
    @user = User.find(params[:id])
    render json: @user
  end
=begin
  Implementations of sessions are referenced from 
  https://medium.com/@altanner/react-user-authentication-with-rails-sessions-and-redux-194b5d31fe5a
=end
  def create
    user = User.new(user_params)
    user.avatar = nil
    if user.save
      session[:user_id] = user.id
      render json: {
        user: UserSerializer.new(user),
      }
    else
      render json: {
        error: "Duplicate username. Please enter another username",
        status: 400,
      }, status: 400
    end
  end

  def add_profile_pic
    @user = User.find_by(username: user_params[:username])
    @user.update(avatar: user_params[:avatar])
  end

  private

  def user_params
    params.require(:user).permit(:id, :username, :first_name, :last_name, :email, :password, :avatar)
  end
end

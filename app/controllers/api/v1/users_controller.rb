class Api::V1::UsersController < ApplicationController
  def index
    @users = User.all

    render json: @users
  end

  # GET /posts/1
  def show
    render json: @user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      render json: {
        status: :created,
        user: @user,
      }
    else
      @user.save
      render json: {
        status: 500,
        error: @user.errors.full_messages,
      }
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :first_name, :last_name, :email, :password)
  end
end

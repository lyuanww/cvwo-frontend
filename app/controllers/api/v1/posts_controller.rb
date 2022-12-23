class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    @posts = Post.all
    render json: @posts
  end

  # GET /posts/1
  def show
    @post = Post.find(params[:id])
    render json: @post
  end

  def showByUser
    @posts = Post.where(user_id: session[:user_id]).all
    render json: @posts
  end

  # POST /posts
  def create
    post = self.current_user.posts.build(post_params)
    if post.save
      render json: {
        post: PostSerializer.new(post),
      }
    else
      render json: {
        status: 500,
        error: post.errors.full_messages,
      }
    end
  end

  # PATCH/PUT /posts/1
  def update
    if post.update(post_params)
      render json: {
        post: PostSerializer.new(post),
      }
    else
      render json: {
        status: 500,
        error: post.errors.full_messages,
      }
    end
  end

  # DELETE /posts/1
  def destroy
    unless @post.user == self.current_user
      render json: {
        status: 500,
        error: post.errors.full_messages,
      }
    end

    @post.destroy
    render json: @post
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:title, :body, :likes, :user_id)
  end
end

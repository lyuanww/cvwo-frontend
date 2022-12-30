class Post < ApplicationRecord
  belongs_to :user, class_name: "User", foreign_key: "user_id"
  has_many :comments, dependent: :destroy
=begin
  Implementation of tags is referenced from 
  https://www.youtube.com/watch?v=03enr4NNgLI
=end
  has_many :taggables, dependent: :destroy
  has_many :tags, through: :taggables
end

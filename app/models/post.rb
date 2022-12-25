class Post < ApplicationRecord
  belongs_to :user, class_name: "User", foreign_key: "user_id"
  has_many :taggables, dependent: :destroy
  has_many :tags, through: :taggables
end

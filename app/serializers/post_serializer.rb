class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :likes
  belongs_to :user
  has_many :tags
  has_many :comments
end

class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :likes
  has_one :user
end

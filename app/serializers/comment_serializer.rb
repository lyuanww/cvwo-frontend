class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body
  has_one :user
  has_one :post
  has_one :comment
end

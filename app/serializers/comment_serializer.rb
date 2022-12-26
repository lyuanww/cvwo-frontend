class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :user
  belongs_to :user
  belongs_to :post
end

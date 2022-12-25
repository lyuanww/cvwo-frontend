class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post, class_name: "Post", foreign_key: "post_id"
  belongs_to :comment
end

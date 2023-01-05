class User < ApplicationRecord
  has_one_attached :avatar do |attachable|
    attachable.variant :thumb, resize_to_limit: [100, 100]
  end
  has_many :posts
  has_many :comments
  has_secure_password
  validates :username, presence: true, uniqueness: { case_sensitive: false }

  def image_url
    Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
  end
end

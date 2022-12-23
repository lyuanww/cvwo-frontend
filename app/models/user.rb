class User < ApplicationRecord
  has_one_attached :avatar
  has_many :posts
  has_secure_password
  validates :username, presence: true, uniqueness: { case_sensitive: false }
end

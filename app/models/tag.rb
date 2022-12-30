class Tag < ApplicationRecord
=begin
  Implementation of tags is referenced from 
  https://www.youtube.com/watch?v=03enr4NNgLI
=end
  has_many :taggables, dependent: :destroy
  has_many :posts, through: :taggables
end

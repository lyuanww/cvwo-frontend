class Taggable < ApplicationRecord
=begin
  Implementation of tags is referenced from 
  https://www.youtube.com/watch?v=03enr4NNgLI
=end
  belongs_to :post
  belongs_to :tag
end
